import { createContext, useContext } from "react";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
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
    const currency = "$";
    const slotDateFormat = (date) => {
        const newDate = date.split("_");

        return `${newDate[0]}-${months[Number(newDate[1]) - 1]}-${newDate[2]}`;
    };
    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);

        let age = today.getFullYear() - birthDate.getFullYear();
        return age;
    };
    const value = { calculateAge, slotDateFormat, currency };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);

export default AppContextProvider;
