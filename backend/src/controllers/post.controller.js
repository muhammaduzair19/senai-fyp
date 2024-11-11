import { uploadOnCloudinary } from "../config/cloudinary.js";
import { Like } from "../models/likeModel.js";
import { Post } from "../models/postModel.js";
import { User } from "../models/userSchema.js";

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
        return res.json({
            success: true,
            posts,
            message: "Posts Fetched",
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export const addPost = async (req, res) => {
    try {
        const { userId, title, content } = req.body;
        const imageFile = req.file;

        if (!title) {
            return res.json({ success: false, message: "Title recording" });
        }
        const userData = await User.findById(userId).select("-password");

        const postData = {
            title,
            content,
            userId,
            userData,
        };

        if (!imageFile) {
            const newPost = new Post(postData);
            await newPost.save();
            return res.json({
                success: true,
                post: newPost,
                message: "Posted",
            });
        }

        const imageUpload = await uploadOnCloudinary(imageFile.path);
        const coverImage = imageUpload.secure_url;
        const newPost = new Post({ ...postData, coverImage });
        await newPost.save();

        res.json({
            success: true,
            post: newPost,
            message: "Posted",
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { userId, postId, title, content } = req.body;

        if (!postId) {
            return res.json({ success: false, message: "Post Id Requried" });
        }
        const postData = await Post.findById(postId);

        if (!postData) {
            return res.json({
                success: false,
                message: "Post is not available",
            });
        }

        if (userId !== postData.userId) {
            return res.json({
                success: false,
                message: "Post Id doesnt match with user",
            });
        }

        await Post.findByIdAndUpdate(postId, { title, content });

        res.json({
            success: true,
            message: "Updated",
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { userId, postId } = req.body;

        if (!postId) {
            return res.json({ success: false, message: "Post Id Requried" });
        }
        const postData = await Post.findById(postId);

        if (!postData) {
            return res.json({
                success: false,
                message: "Post is not available",
            });
        }

        if (userId !== postData.userId) {
            return res.json({
                success: false,
                message: "Post Id doesnt match with user",
            });
        }

        await Post.findByIdAndDelete(postId);

        res.json({
            success: true,
            message: "Deleted",
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export const addRemoveLike = async (req, res) => {
    try {
        const { userId, postId } = req.body;

        if (!postId) {
            return res.json({ success: false, message: "Post Id Requried" });
        }

        const like = await Like.findOneAndDelete({
            postId: postId,
            userId: userId,
        });

        if (like) {

            await Post.findByIdAndUpdate(like.postId, {
                $pull: { likes: like._id },
            });
            return res.json({
                success: true,
                message: "Unliked",
            });
        }
        const newLike = await Like.create({ postId, userId });

        // Update the Post document to include this like
        await Post.findByIdAndUpdate(postId, { $push: { likes: newLike._id } });

        res.json({
            success: true,
            message: "Like added",
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
