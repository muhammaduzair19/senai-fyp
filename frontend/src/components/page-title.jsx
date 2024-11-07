import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const PageTitle = ({ title }) => {
    const { speciality } = useParams();
    const location = useLocation();

    useEffect(() => {
        if (speciality) {
            document.title = speciality.split("")[0].toUpperCase() + speciality.slice(1) + " " + "| Senai";
        } else {
            document.title = title;
        }
    }, [location, title]);

    return null;
};

export default PageTitle;
