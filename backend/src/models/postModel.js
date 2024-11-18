import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        coverImage: {
            type: String,
        },
        content: {
            type: String,
        },
        userData: {
            type: Object,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
