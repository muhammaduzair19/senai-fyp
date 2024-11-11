import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
    },
    {
        timestamps: true, // To store when each like was added
    }
);

export const Like = mongoose.models.Like || mongoose.model("Like", likeSchema);
