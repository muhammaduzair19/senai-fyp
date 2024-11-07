import React from "react";
import { useAdminContext } from "../context/admin-context";
import { useDoctorContext } from "../context/doctor-context";
import { NavLink } from "react-router-dom";
import { Home, Calendar, UserPlus, Users, User } from "lucide-react";

const Sidebar = () => {
    const { atoken } = useAdminContext();
    const { dtoken } = useDoctorContext();

    const NavItem = ({ to, icon: Icon, children }) => (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-6 cursor-pointer transition-colors duration-200
                ${
                    isActive
                        ? "bg-green-100 text-green-800 border-r-4 border-green-600"
                        : "text-green-700 hover:bg-green-50"
                }`
            }
        >
            <Icon className="h-5 w-5" />
            <span className="max-md:hidden">{children}</span>
        </NavLink>
    );

    return (
        <div className="min-h-screen bg-white border-r shadow-lg">
            {atoken && (
                <ul className="mt-5">
                    <NavItem to="/admin-dashboard" icon={Home}>
                        Dashboard
                    </NavItem>
                    <NavItem to="/all-appointments" icon={Calendar}>
                        Appointments
                    </NavItem>
                    <NavItem to="/add-doctor" icon={UserPlus}>
                        Add Doctor
                    </NavItem>
                    <NavItem to="/doctors-list" icon={Users}>
                        Doctors List
                    </NavItem>
                </ul>
            )}
            {dtoken && (
                <ul className="mt-5">
                    <NavItem to="/doctor-dashboard" icon={Home}>
                        Dashboard
                    </NavItem>
                    <NavItem to="/doctor-appointments" icon={Calendar}>
                        Appointments
                    </NavItem>
                    <NavItem to="/doctor-profile" icon={User}>
                        Profile
                    </NavItem>
                </ul>
            )}
        </div>
    );
};

export default Sidebar;
