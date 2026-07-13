import Complaint from "../models/Complaint.js";
import ComplaintHistory from "../models/ComplaintHistory.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { COMPLAINT_STATUS } from "../utils/constants.js";

const createComplaint = asyncHandler(async (req, res) => {
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
        throw new ApiError(400, "All fields (title, description, category) are required");
    }

    const photoUrls = [];

    // Upload photos if any
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        for (const file of req.files) {
            const uploadedPhoto = await uploadOnCloudinary(file.buffer);
            if (uploadedPhoto) {
                photoUrls.push(uploadedPhoto.secure_url);
            }
        }
    }

    const complaint = await Complaint.create({
        title,
        description,
        category,
        userId: req.user._id,
        flatNo: req.user.flatNo || "N/A",
        photo: photoUrls,
        status: COMPLAINT_STATUS.OPEN
    });

    if (!complaint) {
        throw new ApiError(500, "Failed to create complaint");
    }

    // Create initial history record
    await ComplaintHistory.create({
        complaintId: complaint._id,
        changedBy: req.user._id,
        status: COMPLAINT_STATUS.OPEN,
        remark: "Complaint created"
    });

    return res.status(201).json(
        new ApiResponse(201, "Complaint registered successfully", complaint)
    );
});

const getUserComplaints = asyncHandler(async (req, res) => {
    const complaints = await Complaint.find({ userId: req.user._id })
        .sort({ createdAt: -1 })
        .lean();

    // Fetch history for each complaint
    const complaintsWithHistory = await Promise.all(
        complaints.map(async (complaint) => {
            const history = await ComplaintHistory.find({ complaintId: complaint._id }).sort({ createdAt: -1 });
            return {
                ...complaint,
                history
            };
        })
    );

    return res.status(200).json(
        new ApiResponse(200, "User complaints fetched successfully", complaintsWithHistory)
    );
});

export {
    createComplaint,
    getUserComplaints
};
