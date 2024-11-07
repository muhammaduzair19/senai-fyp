import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [dashboardData, setDashboardData] = useState(false);
    const [atoken, setAtoken] = useState(() => {
        try {
            const token = localStorage.getItem("atoken");
            return token ? token : "";
        } catch (error) {
            console.log(error);
            return "";
        }
    });
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(
                backendUrl + "/admin/all-doctors",
                {},
                { headers: { atoken } }
            );
            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(
                backendUrl + "/admin/change-availability",
                { docId },
                { headers: { atoken } }
            );
            if (data.success) {
                toast.success(data.message);
                getAllDoctors();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(
                backendUrl + "/admin/all-appointments",
                { headers: { atoken } }
            );
            if (data.success) {
                setAppointments(data.appointments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + "/admin/cancel-appointment",
                { appointmentId },
                { headers: { atoken } }
            );
            console.log(data);

            if (data.success) {
                toast.success("Appointment Cancelled");
                getAllAppointments();
                getDashboardData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const getDashboardData = async (req, res) => {
        try {
            const { data } = await axios.get(backendUrl + "/admin/dashboard", {
                headers: { atoken },
            });

            if (data.success) {
                setDashboardData(data.dashData);
                console.log(data.dashData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const value = {
        atoken,
        setAtoken,
        backendUrl,
        doctors,
        appointments,
        setAppointments,
        getAllAppointments,
        getAllDoctors,
        cancelAppointment,
        changeAvailability,
        getDashboardData,
        dashboardData,
        setDashboardData,
    };

    return (
        <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
    );
};

export const useAdminContext = () => useContext(AdminContext);

export default AdminContextProvider;
