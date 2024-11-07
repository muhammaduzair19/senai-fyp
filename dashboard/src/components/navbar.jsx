import React from "react";
import { useAdminContext } from "../context/admin-context";
import { useDoctorContext } from "../context/doctor-context";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut } from "lucide-react";

const Navbar = () => {
    const { atoken, setAtoken } = useAdminContext();
    const { dtoken, setDtoken } = useDoctorContext();
    const navigate = useNavigate();

    const logoutHandler = () => {
        navigate("/");
        if (atoken) {
            setAtoken("");
            localStorage.removeItem("atoken");
        }
        if (dtoken) {
            setDtoken("");
            localStorage.removeItem("dtoken");
        }
    };

    return (
        <nav className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-green-50">
            <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-green-700">
                    Senai - {atoken ? "Admin" : "Doctor"} Panel
                </h1>
                <Badge
                    variant="outline"
                    className="text-green-600 border-green-300"
                >
                    {atoken ? "Admin" : "Doctor"}
                </Badge>
            </div>
            <Button
                onClick={logoutHandler}
                variant="outline"
                className="bg-green-600 text-white hover:bg-green-700 hover:text-white"
            >
                <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
        </nav>
    );
};

export default Navbar;
