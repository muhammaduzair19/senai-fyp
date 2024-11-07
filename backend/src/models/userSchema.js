import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "",
    },
    address: { type: String, default: "" },
    gender: {
        type: String,
        default: "Not Selected",
    },
    dateOfBirth: { type: String, default: "Not Selected" },
    phone: { type: String, default: "000000000" },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
