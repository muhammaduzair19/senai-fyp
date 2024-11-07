import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
    {
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
        },
        speciality: {
            type: String,
            required: true,
        },
        degree: {
            type: String,
            required: true,
        },
        experience: { type: String, required: true },
        about: { type: String, required: true },
        available: { type: Boolean, default: true },
        fees: { type: Number, required: true },
        address: { type: String, required: true },
        slots_booked: { type: Map, default: {} },
    },
    { timestamps: true },
    { minimize: false }
);

export const Doctor =
    mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);
