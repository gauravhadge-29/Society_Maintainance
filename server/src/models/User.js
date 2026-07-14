import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const User = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique: true
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
        required : true,
        enum: ['resident', 'admin']
    }
}, { timestamps: true });

User.pre('save', async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

User.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

User.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET || 'secret123',
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1d'
        }
    );
};

export default mongoose.model('User', User);