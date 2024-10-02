import express from "express";
import { editProfile, followOrUnfollow, getProfile, getSuggestedUsers, login, logout, register } from "../controllers/user.controller.js";
import Authenticated from "../middlewares/Authenticated.js";
import upload from "../middlewares/multer.js";


const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/:id/profile').get(Authenticated, getProfile);
router.route('/profile/edit').post(Authenticated, upload.single('profilePicture'), editProfile);
router.route('/suggested').get(Authenticated, getSuggestedUsers);
router.route('/followorunfollow/:id').post(Authenticated, followOrUnfollow);
router.route('/logout').get(logout);

export default router;