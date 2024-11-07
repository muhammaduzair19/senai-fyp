import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";
import { Doctor } from "../models/doctorSchema.js";
import { Appointment } from "../models/appointmentModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// api register user
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Values" });
        }

        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Invalid email, enter a valid email",
            });
        }

        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Enter a strong password",
            });
        }

        //hashin password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword,
        };

        const newUser = new User(userData);
        const user = await newUser.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "Missing values" });
        }

        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Invalid email, enter a valid email",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: "User doesnt exist with this email",
            });
        }
        //hashin password

        const isCorrect = await bcrypt.compare(password, user.password);

        if (!isCorrect) {
            return res.json({
                success: false,
                message: "Incorrect Credentials",
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ success: true, token, message: "Login Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
// API GET USER DATA
export const getUserData = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId).select("-password");
        res.json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
// Update user data
export const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dateOfBirth, gender } =
            req.body;
        const imageFile = req.file;

        if (!name || !phone || !dateOfBirth || !gender) {
            return res.json({ success: true, message: "data missing" });
        }
        const user = await User.findByIdAndUpdate(userId, {
            name,
            phone,
            dateOfBirth,
            address: JSON.parse(address),
            gender,
        });

        if (imageFile) {
            const imageUpload = await uploadOnCloudinary(imageFile.path);
            const imageURL = imageUpload.secure_url;
            await User.findByIdAndUpdate(userId, { image: imageURL });
        }
        res.json({ success: true, user, message: "Profile Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// book appointment
export const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotTime, slotDate } = req.body;

        const docData = await Doctor.findById(docId).select("-password");
        if (!docData.available) {
            return res.json({
                success: false,
                message: "Doctor not available",
            });
        }

        // Initialize slots_booked as a Map if it's not already
        let slots_booked = docData.slots_booked || new Map();

        // Retrieve the slots for the given date
        let dateSlots = slots_booked.get(slotDate) || [];

        // Check if the slot time is already booked
        if (dateSlots.includes(slotTime)) {
            return res.json({
                success: false,
                message: "Slot not available",
            });
        }

        // Add the slot time to the date slots
        dateSlots.push(slotTime);

        // Update the Map with the new slot time for the specified date
        slots_booked.set(slotDate, dateSlots);

        // Save the updated slots_booked Map back to the doctor document
        await Doctor.findByIdAndUpdate(docId, { slots_booked });

        // Retrieve the user data for booking info (optional)
        const userData = await User.findById(userId).select("-password");

        // Create the appointment data and save
        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now(),
        };
        const newAppointment = new Appointment(appointmentData);
        await newAppointment.save();

        res.json({ success: true, message: "Appointment Booked" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// api to get all appointment that we booked
export const listAppointment = async (req, res) => {
    try {
        const { userId } = req.body;

        const appointments = await Appointment.find({ userId });
        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body;

        const appointmentData = await Appointment.findById(appointmentId);
        if (appointmentData.userId != userId) {
            return res.json({ success: false, message: "Unauthorized action" });
        }

        await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true });

        const { docId, slotDate, slotTime } = appointmentData;

        const docData = await Doctor.findById(docId);

        // Initialize slots_booked as a Map if it's not already
        let slots_booked = docData.slots_booked || new Map();

        // Retrieve the slots for the given date
        let dateSlots = slots_booked.get(slotDate) || [];

        dateSlots = dateSlots?.filter((e) => e !== slotTime);

        slots_booked.set(slotDate, dateSlots);

        await Doctor.findByIdAndUpdate(docId, { slots_booked });

        res.json({ success: true, message: "Appointment Cancelled" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export const stripeRedirect = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body;

        if (!appointmentId) {
            return res.json({
                success: false,
                message: "Invalid appointment Id",
            });
        }

        const appointmentData = await Appointment.findById(appointmentId);

        if (appointmentData.userId != userId) {
            return res.json({ success: false, message: "Unauthorized action" });
        }        

        if (appointmentData.payment) {
            return res.json({ success: false, message: "Already Paid" });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "pkr",
                        product_data: {
                            name: `Appointment ID: ${appointmentId}`,
                        },
                        unit_amount: appointmentData.amount * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/payment-sucessfull/${appointmentId}?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
            client_reference_id: appointmentId,
        });

        return res.status(200).json({
            success: true,
            data: { sessionId: session.id, sessionUrl: session.url },
            message: "checkout session succesful",
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export const savePayment = async (req, res) => {
    try {
        const { appointmentId, sessionId } = req.body;
        if (!appointmentId || !sessionId) {
            return res.json({
                success: false,
                message: "Appointment Id and Session Id required",
            });
        }

        const appointmentData = await Appointment.findById(appointmentId);

        if (!appointmentData) {
            return res.json({ success: false, message: "No such appointment" });
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (
            session.payment_status !== "paid" &&
            session.status !== "complete"
        ) {
            return res.json({
                success: false,
                data: { cancel_url: session.cancel_url },
                message: "Payment not successfull",
            });
        }

        await Appointment.findByIdAndUpdate(appointmentId, { payment: true });

        res.json({ success: true, message: "Payment Done" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
