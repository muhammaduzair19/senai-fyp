import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        userData: { type: Object, required: true },
        postId: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Comment =
    mongoose.models.Comment || mongoose.model("Comment", commentSchema);
