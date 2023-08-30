import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    plan: {
        type: String,
        required: true,
    },
    customerId: {
        type: String,
        required: true,
    },
    subscriptionId: {
        type: String,
        required: true
    }
}, { timestamps: true })


export default mongoose.model("User", UserSchema)