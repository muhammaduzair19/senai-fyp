import validator from "validator";
import { Doctor } from "../models/doctorSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Appointment } from "../models/appointmentModel.js";

export const changeAvailabilty = async (req, res) => {
    try {
        const { docId } = req.body;
        const doctorData = await Doctor.findById(docId);
        doctorData.available = !doctorData.available;
        await doctorData.save();

        res.json({ success: true, message: "Availability changed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
export const doctorsList = async (req, res) => {
    try {
        const doctors = await Doctor.find({}).select(["-password", "-email"]);

        res.json({ success: true, doctors });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
export const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({
                success: false,
                message: "Email and password required.",
            });
        }

        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Invalid email, enter a valid email",
            });
        }

        const doctor = await Doctor.findOne({ email });
        if (!doctor) {
            return res.json({
                success: false,
                message: "Doctor doesnt exist with this email",
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            doctor.password
        );

        if (!isPasswordCorrect) {
            return res.json({
                success: false,
                message: "Invalid Credentials",
            });
        }

        const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);

        res.json({ success: true, token, message: "Login Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
// appointment Docotr api
export const appointmentsDoctor = async (req, res) => {
    try {
        const { docId } = req.body;
        const appointments = await Appointment.find({ docId });
        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export const completeAppointment = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;

        const appointmentData = await Appointment.findById(appointmentId);
        if (appointmentData && appointmentData.docId === docId) {
            await Appointment.findByIdAndUpdate(appointmentData, {
                isCompleted: true,
            });
            return res.json({
                success: true,
                message: "Appointment Completed",
            });
        } else {
            return res.json({
                success: true,
                message: "Mark Failed",
            });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export const cancelAppointment = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;

        const appointmentData = await Appointment.findById(appointmentId);
        if (appointmentData && appointmentData.docId === docId) {
            await Appointment.findByIdAndUpdate(appointmentData, {
                cancelled: true,
            });
            return res.json({
                success: true,
                message: "Appointment cancelled",
            });
        } else {
            return res.json({
                success: true,
                message: "Cancellation failed",
            });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export const doctorDashboard = async (req, res) => {
    try {
        const { docId } = req.body;

        const appointments = await Appointment.find({ docId });
        let earnings = 0;

        appointments.map((appointment) => {
            if (appointment.isCompleted || appointment.payment) {
                earnings += appointment.amount;
            }
        });

        let patients = [];
        appointments?.map((appointment) => {
            if (!patients.includes(appointment.docId)) {
                patients.push(appointment.docId);
            }
        });

        const dashboardData = {
            earnings,
            patients: patients.length,
            appointments: appointments.length,
            latestAppointments: appointments.reverse().slice(0, 5),
        };

        res.json({ success: true, dashboardData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export const doctorProfile = async (req, res) => {
    try {
        const { docId } = req.body;

        const doctorData = await Doctor.findById(docId).select("-password");

        res.json({ success: true, doctorData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export const updateDoctorProfile = async (req, res) => {
    try {
        const { docId, address, fees, available } = req.body;

        await Doctor.findByIdAndUpdate(docId, {
            address,
            fees,
            available,
        });

        res.json({ success: true, message: "Profile Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
