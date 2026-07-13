import Notice from "../models/Notice.js";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import transporter from "../config/mail.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createNotice = asyncHandler(async (req, res) => {
    const { title, description, isImportant } = req.body;

    if (!title || !description) {
        throw new ApiError(400, "Title and description are required");
    }

    let photoUrl = null;
    if (req.file) {
        const uploadedPhoto = await uploadOnCloudinary(req.file.buffer);
        if (uploadedPhoto) {
            photoUrl = uploadedPhoto.secure_url;
        }
    }

    const notice = await Notice.create({
        title,
        description,
        isImportant: isImportant === 'true' || isImportant === true,
        createdBy: req.user._id,
        photo: photoUrl
    });

    if (notice.isImportant) {
        // Send email to all residents asynchronously
        User.find({ role: "resident" }).then(users => {
            users.forEach(user => {
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: user.email,
                    subject: `IMPORTANT NOTICE: ${title}`,
                    text: `Hello ${user.name},\n\nAn important notice has been posted on the board:\n\n${description}\n\nThank you,\nSociety Admin`
                };
                transporter.sendMail(mailOptions).catch(console.error);
            });
        });
    }

    return res.status(201).json(
        new ApiResponse(201, "Notice created successfully", notice)
    );
});

const getAllNotices = asyncHandler(async (req, res) => {
    const notices = await Notice.find({ status: 'active' })
        .populate("createdBy", "name")
        .sort({ isImportant: -1, createdAt: -1 }); // Important first

    return res.status(200).json(
        new ApiResponse(200, "Notices fetched successfully", notices)
    );
});

export { createNotice, getAllNotices };
