import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: "user"
    },
    otp:{
       type: String, 
       default: null
    }, 
    otpExpiry: {
        type: Date,
        default: null
    }
},
    { timestamps: true }
);

export default mongoose.models.User ||
    mongoose.model("User", authSchema);