import Complaint from "../models/Complaint.js";
import ComplaintHistory from "../models/ComplaintHistory.js";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { COMPLAINT_STATUS, OVERDUE_THRESHOLD_DAYS } from "../utils/constants.js";
import transporter from "../config/mail.js";

// Helper to send email
const sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        });
    } catch (error) {
        console.error("Email sending failed:", error);
    }
};

const updateOverdueComplaints = async () => {
    const thresholdDate = new Date();
    thresholdDate.setDate(thresholdDate.getDate() - OVERDUE_THRESHOLD_DAYS);

    await Complaint.updateMany(
        { 
            status: { $ne: COMPLAINT_STATUS.RESOLVED },
            createdAt: { $lt: thresholdDate },
            isOverdue: false
        },
        { $set: { isOverdue: true } }
    );
};

const getAllComplaints = asyncHandler(async (req, res) => {
    await updateOverdueComplaints();

    const { status, category, priority, isOverdue, startDate, endDate } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (category) filter.category = category;
    if (priority) filter.priority = priority;
    if (isOverdue !== undefined) filter.isOverdue = isOverdue === 'true';
    
    if (startDate || endDate) {
        filter.createdAt = {};
        if (startDate) filter.createdAt.$gte = new Date(startDate);
        if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const complaints = await Complaint.find(filter)
        .populate("userId", "name email flatNo")
        .sort({ isOverdue: -1, createdAt: -1 }) // Overdue on top
        .lean();

    const complaintsWithHistory = await Promise.all(
        complaints.map(async (complaint) => {
            const history = await ComplaintHistory.find({ complaintId: complaint._id }).sort({ createdAt: -1 });
            return { ...complaint, history };
        })
    );

    return res.status(200).json(
        new ApiResponse(200, "All complaints fetched successfully", complaintsWithHistory)
    );
});

const updateComplaintStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status, priority, remark } = req.body;

    const complaint = await Complaint.findById(id).populate("userId", "name email");
    if (!complaint) {
        throw new ApiError(404, "Complaint not found");
    }

    if (status) complaint.status = status;
    if (priority) complaint.priority = priority;
    if (status === COMPLAINT_STATUS.RESOLVED) {
        complaint.isOverdue = false; // resolved is not overdue
    }
    
    await complaint.save();

    const history = await ComplaintHistory.create({
        complaintId: complaint._id,
        changedBy: req.user._id,
        status: complaint.status,
        remark: remark || "Status updated by admin",
        isOverdue: complaint.isOverdue,
        resolvedAt: status === COMPLAINT_STATUS.RESOLVED ? new Date() : null
    });

    // Notify user via email
    if (status) {
        const text = `Hello ${complaint.userId.name},\n\nYour complaint "${complaint.title}" has been updated. The new status is: ${status}.\n\nRemark: ${remark || "None"}\n\nThank you,\nSociety Admin`;
        await sendEmail(complaint.userId.email, `Complaint Update: ${complaint.title}`, text);
    }

    return res.status(200).json(
        new ApiResponse(200, "Complaint updated successfully", { complaint, history })
    );
});

const getDashboardStats = asyncHandler(async (req, res) => {
    await updateOverdueComplaints();

    const totalComplaints = await Complaint.countDocuments();
    const overdueComplaints = await Complaint.countDocuments({ isOverdue: true, status: { $ne: COMPLAINT_STATUS.RESOLVED } });
    
    const byStatus = await Complaint.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);
    
    const byCategory = await Complaint.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    return res.status(200).json(
        new ApiResponse(200, "Dashboard stats fetched successfully", {
            totalComplaints,
            overdueComplaints,
            byStatus,
            byCategory
        })
    );
});

export { getAllComplaints, updateComplaintStatus, getDashboardStats };
