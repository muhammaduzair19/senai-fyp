import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAdminContext } from "./context/admin-context";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { useDoctorContext } from "./context/doctor-context";
import AllAppointments from "./pages/admin/all-appointments";
import DoctorDashboard from "./pages/doctor/doctor-dashboard";
import DoctorProfile from "./pages/doctor/doctor-profile";
import DoctorAppointment from "./pages/doctor/doctor-appointment";
import Login from "./pages/login";
import Dashboard from "./pages/admin/dashboard";
import AddDoctor from "./pages/admin/add-doctor";
import DoctorsList from "./pages/admin/doctors-list";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import PageTitle from "./components/page-title";

const AdminLayout = () => {
    const { atoken } = useAdminContext();
    const { dtoken } = useDoctorContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!atoken) {
            if (dtoken) {
                navigate("/doctor-dashboard");
            }
        }
    }, [atoken, dtoken]);

    return (
        <>
            <Navbar />
            <div className="flex items-start">
                <Sidebar />
                <main className="w-full h-full">
                    <Outlet />
                </main>
            </div>
        </>
    );
};
const DoctorLayout = () => {
    const { atoken } = useAdminContext();
    const { dtoken } = useDoctorContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!dtoken) {
            if (atoken) {
                navigate("/admin-dashboard");
            }
        }
    }, [atoken, dtoken]);

    return (
        <>
            <Navbar />
            <div className="flex items-start">
                <Sidebar />
                <main className="w-full h-full">
                    <Outlet />
                </main>
            </div>
        </>
    );
};

const App = () => {
    const { atoken } = useAdminContext();
    const { dtoken } = useDoctorContext();
    return dtoken || atoken ? (
        <div className="bg-[#f8f9fd]">
            <ToastContainer />
            <Routes>
                <Route element={<AdminLayout />}>
                    <Route path="/" element={<></>} />
                    <Route
                        path="/admin-dashboard"
                        element={
                            <>
                                <PageTitle
                                    title={"Admin - Dashboard | Senai"}
                                />
                                <Dashboard />
                            </>
                        }
                    />
                    <Route
                        path="/all-appointments"
                        element={
                            <>
                                <PageTitle title={"All Appointments | Senai"} />
                                <AllAppointments />
                            </>
                        }
                    />
                    <Route
                        path="/add-doctor"
                        element={
                            <>
                                <PageTitle title={"Add new Doctor | Senai"} />
                                <AddDoctor />
                            </>
                        }
                    />
                    <Route
                        path="/doctors-list"
                        element={
                            <>
                                <PageTitle title={"Doctors | Senai"} />
                                <DoctorsList />
                            </>
                        }
                    />
                </Route>
                <Route element={<DoctorLayout />}>
                    <Route
                        path="*"
                        element={<Navigate to={"/doctor-dashboard"} />}
                    />
                    <Route
                        path="/doctor-dashboard"
                        element={
                            <>
                                <PageTitle
                                    title={"Doctor - Dashboard | Senai"}
                                />
                                <DoctorDashboard />
                            </>
                        }
                    />
                    <Route
                        path="/doctor-profile"
                        element={
                            <>
                                <PageTitle title={"Profile | Senai"} />
                                <DoctorProfile />
                            </>
                        }
                    />
                    <Route
                        path="/doctor-appointments"
                        element={
                            <>
                                <PageTitle title={"Appointment | Senai"} />
                                <DoctorAppointment />
                            </>
                        }
                    />
                </Route>
            </Routes>
        </div>
    ) : (
        <>
            <ToastContainer />
            <Routes>
                <Route path="/*" element={<Navigate to={"/login"} />} />
                <Route
                    path="/login"
                    element={
                        <>
                            <PageTitle   title={"Login | Senai"} />
                            <Login />
                        </>
                    }
                />
            </Routes>
        </>
    );
};

export default App;
