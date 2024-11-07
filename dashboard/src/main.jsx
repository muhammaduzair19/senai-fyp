import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AdminContextProvider from "./context/admin-context";
import DoctorContextProvider from "./context/doctor-context";
import AppContextProvider from "./context/context";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <AdminContextProvider>
            <DoctorContextProvider>
                <AppContextProvider>
                    <App />
                </AppContextProvider>
            </DoctorContextProvider>
        </AdminContextProvider>
    </BrowserRouter>
);
