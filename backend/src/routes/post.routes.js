import express from "express";
import upload from "../middlewares/multer.js";
import authUser from "../middlewares/authUser.js";
import {
    addComment,
    addPost,
    addRemoveLike,
    deleteComment,
    deletePost,
    getAllPosts,
    updatePost,
} from "../controllers/post.controller.js";

const postRouter = express.Router();

postRouter.get("/all", getAllPosts);
postRouter.post("/add-post", upload.single("coverImage"), authUser, addPost);
postRouter.put("/:postId", authUser, updatePost);
postRouter.delete("/:postId", authUser, deletePost);
postRouter.post("/:postId/like", authUser, addRemoveLike);
postRouter.post("/:postId/comment", authUser, addComment);
postRouter.delete("/:postId/comment", authUser, deleteComment);

export default postRouter;
