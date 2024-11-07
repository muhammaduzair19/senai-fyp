import axios from "axios";
import { createContext, useEffect,useContext, useState } from "react";
import { toast } from "react-toastify";

const MyContext = createContext();

const AppContext = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const [userData, setUserData] = useState(false);
    const [token, setToken] = useState(() => {
        try {
            const token = localStorage.getItem("userToken");
            console.log(token);

            return token ? token : "";
        } catch (error) {
            console.log(error);
            return "";
        }
    });
    const currencySymbol = "Rs.";

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/doctor/list");
            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    const getUserData = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/user/get-profile", {
                headers: { token },
            });
            if (data.success) {
                setUserData(data.user);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getDoctorsData();
    }, []);

    useEffect(() => {
        if (token) {
            getUserData();
        } else {
            setUserData(false);
        }
    }, [token]);

    const value = {
        currencySymbol,
        doctors,
        token,
        setToken,
        backendUrl,
        getDoctorsData,
        userData,
        setUserData,
        getUserData,
        sidebarOpen,
        months,
        setSidebarOpen,
    };

    return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export const useAppContext = () => useContext(MyContext);

export default AppContext;
