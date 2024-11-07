import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AppContext from "./context/context.jsx";
import { Toaster } from "./components/ui/toaster.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AppContext>
            {" "}
            <Toaster />
            <App />
        </AppContext>
    </StrictMode>
);
