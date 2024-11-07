import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const PageTitle = ({ title }) => {
    const location = useLocation();

    useEffect(() => {
        document.title = title;
    }, [location, title]);

    return null;
};

export default PageTitle;
