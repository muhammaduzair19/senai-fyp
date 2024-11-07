import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./pages/auth/sign-in";
import SignUp from "./pages/auth/sign-up";
import ForgotPassword from "./pages/auth/forgot-password";
import ResetPasswordPage from "./pages/auth/reset-password";
import AppLayout from "./layout/app-layout";
import Dashboard from "./pages/main/dashboard";
import Blogs from "./pages/main/blogs";
import PageTitle from "./components/page-title";
import Exercise from "./pages/main/excercise";
import DailyReflectionJournal from "./pages/main/daily";
import CopingSkillsToolbox from "./pages/main/coping-skills";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import useLocalStorage from "./hooks/use-local-storage";
import SingleBlogPost from "./pages/main/single-blog";
import Doctors from "./pages/main/doctors";
import Appointment from "./pages/main/appointment";
import { ToastContainer } from "react-toastify";
import MyAppointment from "./pages/main/my-appointments";
import Profile from "./pages/main/profile";

const App = () => {
    const [colorMode, setColorMode] = useLocalStorage("color-theme", "light");

    useEffect(() => {
        const className = "dark";
        const bodyClass = window.document.body.classList;

        colorMode === "dark"
            ? bodyClass.add(className)
            : bodyClass.remove(className);
    }, [colorMode]);

    return (
        <BrowserRouter>
            <ToastContainer />
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="*" element={<Navigate to="/" />} />
                    <Route
                        path="/"
                        index
                        element={
                            <>
                                <PageTitle title={"Dashboard | Senai"} />
                                <Dashboard />
                            </>
                        }
                    />
                    <Route
                        path="/blogs"
                        element={
                            <>
                                <PageTitle title={"Blogs | Senai"} />
                                <Blogs />
                            </>
                        }
                    />
                    <Route
                        path="/excercises"
                        element={
                            <>
                                <PageTitle title={"Excercise | Senai"} />
                                <Exercise />
                            </>
                        }
                    />
                    <Route
                        path="/daily-journal"
                        element={
                            <>
                                <PageTitle title={"Daily Reflection | Senai"} />
                                <DailyReflectionJournal />
                            </>
                        }
                    />
                    <Route
                        path="/doctors"
                        element={
                            <>
                                <PageTitle title={"Doctors | Senai"} />
                                <Doctors />
                            </>
                        }
                    />
                    <Route
                        path="/doctors/:speciality"
                        element={
                            <>
                                <PageTitle title={""} />
                                <Doctors />
                            </>
                        }
                    />
                    <Route
                        path="/appointment/:docId"
                        element={
                            <>
                                <PageTitle
                                    title={"Book an Appointment | Senai"}
                                />
                                <Appointment />
                            </>
                        }
                    />
                    <Route
                        path="/blog/:id"
                        element={
                            <>
                                <PageTitle title={"Read this blog | Senai"} />
                                <SingleBlogPost />
                            </>
                        }
                    />
                    <Route
                        path="/coping-skills"
                        element={
                            <>
                                <PageTitle title={"Coping Skills | Senai"} />
                                <CopingSkillsToolbox />
                            </>
                        }
                    />
                    <Route
                        path="/my-appointments"
                        element={
                            <>
                                <PageTitle title={"My Appointments | Senai"} />
                                <MyAppointment />
                            </>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <>
                                <PageTitle title={"My Appointments | Senai"} />
                                <Profile />
                            </>
                        }
                    />
                </Route>
                <Route index element={<Navigate to="/" />} />
                <Route
                    path="/signin"
                    element={
                        <>
                            <PageTitle title={"SignIn | Senai"} />
                            <SignIn />
                        </>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <>
                            <PageTitle title={"Create your account | Senai"} />
                            <SignUp />
                        </>
                    }
                />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                    path="/reset-password/:link"
                    element={<ResetPasswordPage />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
