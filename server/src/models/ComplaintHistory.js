import mongoose from "mongoose";
import { COMPLAINT_STATUS } from "../utils/constants.js";

const ComplaintHistory = new mongoose.Schema({
    complaintId: {
        type: mongoose.Types.ObjectId,
        ref: 'Complaint',
        required: true
    },
    changedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: Object.values(COMPLAINT_STATUS),
        required: true
    },
    isOverdue: {
        type: Boolean,
        default: false
    },
    remark: {
        type: String,
    },
    resolvedAt: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('ComplaintHistory', ComplaintHistory)

