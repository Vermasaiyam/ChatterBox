import express from "express";
import { addComment, addNewPost, bookmarkPost, deletePost, dislikePost, getAllPost, getCommentsOfPost, getUserPost, likePost } from "../controllers/post.controller.js";
import Authenticated from "../middlewares/Authenticated.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.route("/addpost").post(Authenticated, upload.single('image'), addNewPost);
router.route("/all").get(Authenticated,getAllPost);
router.route("/userpost/all").get(Authenticated, getUserPost);
router.route("/:id/like").get(Authenticated, likePost);
router.route("/:id/dislike").get(Authenticated, dislikePost);
router.route("/:id/comment").post(Authenticated, addComment); 
router.route("/:id/comment/all").post(Authenticated, getCommentsOfPost);
router.route("/delete/:id").delete(Authenticated, deletePost);
router.route("/:id/bookmark").post(Authenticated, bookmarkPost);

export default router;