import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        userData: { type: Object, required: true },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        content: {
            type: String,
            min: 1,
        },
    },
    {
        timestamps: true,
    }
);

export const Comment =
    mongoose.models.Comment || mongoose.model("Comment", commentSchema);
