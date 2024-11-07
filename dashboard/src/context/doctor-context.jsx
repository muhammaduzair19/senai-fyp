import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
    const [appointments, setAppointments] = useState();
    const [dashboardData, setDashboardData] = useState(false);
    const [profileData, setProfileData] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [dtoken, setDtoken] = useState(() => {
        try {
            const token = localStorage.getItem("dtoken");
            return token ? token : "";
        } catch (error) {
            console.log(error);
            return "";
        }
    });

    const getAppointments = async () => {
        try {
            const { data } = await axios.get(
                backendUrl + "/doctor/appointments",
                { headers: { dtoken } }
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
                backendUrl + "/doctor/cancel-appointment",
                { appointmentId },
                { headers: { dtoken } }
            );

            if (data.success) {
                toast.success(data.message);
                getAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + "/doctor/complete-appointment",
                { appointmentId },
                { headers: { dtoken } }
            );

            if (data.success) {
                toast.success(data.message);
                getAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const getDashboardData = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/doctor/dashboard", {
                headers: { dtoken },
            });

            if (data.success) {
                setDashboardData(data.dashboardData);
                console.log(data.dashboardData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const getProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/doctor/profile", {
                headers: { dtoken },
            });

            if (data.success) {
                setProfileData(data.doctorData);
                console.log(data.doctorData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const value = {
        dtoken,
        setDtoken,
        appointments,
        setAppointments,
        backendUrl,
        getAppointments,
        cancelAppointment,
        completeAppointment,
        getDashboardData,
        dashboardData,
        getProfileData,
        setProfileData,
        profileData,
    };

    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    );
};

export const useDoctorContext = () => useContext(DoctorContext);

export default DoctorContextProvider;
