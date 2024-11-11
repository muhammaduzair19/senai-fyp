import express from "express";
import upload from "../middlewares/multer.js";
import authUser from "../middlewares/authUser.js";
import {
    addPost,
    addRemoveLike,
    deletePost,
    getAllPosts,
    updatePost,
} from "../controllers/post.controller.js";

const postRouter = express.Router();

postRouter.post("/add-post", upload.single("coverImage"), authUser, addPost);
postRouter.post("/edit-post", authUser, updatePost);
postRouter.get("/all", getAllPosts);
postRouter.post("/delete", authUser, deletePost);
postRouter.post("/like", authUser, addRemoveLike);

export default postRouter;
