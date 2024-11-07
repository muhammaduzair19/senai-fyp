import express from "express";
import {
    appointmentsDoctor,
    cancelAppointment,
    completeAppointment,
    doctorDashboard,
    doctorProfile,
    doctorsList,
    loginDoctor,
    updateDoctorProfile,
} from "../controllers/doctor.controller.js";
import authDoctor from "../middlewares/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorsList);
doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor);
doctorRouter.post("/cancel-appointment", authDoctor, cancelAppointment);
doctorRouter.post("/complete-appointment", authDoctor, completeAppointment);
doctorRouter.get("/dashboard", authDoctor, doctorDashboard);
doctorRouter.get("/profile", authDoctor, doctorProfile);
doctorRouter.post("/update", authDoctor, updateDoctorProfile);

export default doctorRouter;
