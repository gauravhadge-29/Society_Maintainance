import mongoose from "mongoose";
import { CATEGORIES, COMPLAINT_STATUS, PRIORITY } from "../utils/constants.js";

const Complaint = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    userId : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : true
    },
    category : {
        type : String,
        enum : CATEGORIES,
        required : true
    },
    photo : [
        {
            type : String,
        }
    ],
    priority : {
        type : String,
        enum : Object.values(PRIORITY),
        required : true
    },
    status : {
        type : String,
        enum : Object.values(COMPLAINT_STATUS),
        default : COMPLAINT_STATUS.OPEN
    },
    isOverdue : {
        type : Boolean,
        default : false
    },
    flatNo : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    updatedAt : {
        type : Date,
        default : Date.now
    }
})

export default mongoose.model('Complaint', Complaint)