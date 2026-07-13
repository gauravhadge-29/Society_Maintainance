import mongoose from 'mongoose'

const User = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    flatNo : {
        type : String,
    },
    role : {
        type : String,
        default : 'resident',
        required : true
    }
})

export default mongoose.model('User', User)