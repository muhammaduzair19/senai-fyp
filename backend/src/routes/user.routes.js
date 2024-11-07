import express from "express";
import {
    bookAppointment,
    cancelAppointment,
    getUserData,
    listAppointment,
    loginUser,
    registerUser,
    savePayment,
    stripeRedirect,
    updateProfile,
} from "../controllers/user.controller.js";
import authUser from "../middlewares/authUser.js";

import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.get("/get-profile", authUser, getUserData);

userRouter.post(
    "/update-profile",
    upload.single("image"),
    authUser,
    updateProfile
);
userRouter.post("/book-appointment", authUser, bookAppointment);

userRouter.get("/appointments", authUser, listAppointment);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);
userRouter.post("/payment", authUser, stripeRedirect);
userRouter.post("/save-payment", authUser, savePayment);

export default userRouter;
