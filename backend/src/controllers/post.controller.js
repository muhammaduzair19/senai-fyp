import { uploadOnCloudinary } from "../config/cloudinary.js";
import { Comment } from "../models/commentModel.js";
import { Like } from "../models/likeModel.js";
import { Post } from "../models/postModel.js";
import { User } from "../models/userSchema.js";

const getCommentsAndLikes = async (post) => {
    const comments = await Comment.find({ postId: post._id });
    const likes = await Like.find({ postId: post._id });
    return { ...post._doc, comments, likesCount: likes.length, likes };
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({});

        const allPosts = await Promise.all(
            posts.map(async (post) => await getCommentsAndLikes(post))
        );

        return res.json({
            success: true,
            posts: allPosts,
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
        const userData = await User.findById(userId).select("name image");

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
        const { userId, title, content } = req.body;
        const { postId } = req.params;

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

        if (userId !== postData.userId.toString()) {
            return res.json({
                success: false,
                message: "Post Id doesnt match with user",
            });
        }

        await Post.findByIdAndUpdate(postId, { title, content });
        const post = await Post.findById(postId);
        res.json({
            success: true,
            post,
            message: "Updated",
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { userId } = req.body;
        const { postId } = req.params;

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
        const { userId } = req.body;
        const { postId } = req.params;

        if (!postId) {
            return res.json({ success: false, message: "Post Id Requried" });
        }

        const like = await Like.findOneAndDelete({
            postId: postId,
            userId: userId,
        });

        if (like) {
            let post = await Post.findById(like.postId);
            post = await getCommentsAndLikes(post);

            return res.json({
                success: true,
                post,
                message: "Unliked",
            });
        }
        const newLike = await Like.create({ postId, userId });
        let post = await Post.findById(newLike.postId);
        post = await getCommentsAndLikes(post);
        res.json({
            success: true,
            post,
            message: "Liked",
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export const addComment = async (req, res) => {
    try {
        const { userId, content } = req.body;
        const { postId } = req.params;

        if (!postId) {
            return res.json({ success: false, message: "Post Id Requried" });
        }

        const userData = await User.findById(userId).select("name image");

        await Comment.create({
            userId,
            postId,
            userData,
            content,
        });
        let post = await Post.findById(postId);
        post = await getCommentsAndLikes(post);

        res.json({ success: true, post, message: "done" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { userId } = req.body;
        const { postId } = req.params;

        if (!postId) {
            return res.json({ success: false, message: "Post Id Requried" });
        }

        const comment = await Comment.findOneAndDelete({
            postId: postId,
            userId: userId,
        });

        let post = await Post.findById(comment.postId);
        post = await getCommentsAndLikes(post);
        res.json({ success: true, post, message: "Comment Deleted" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
