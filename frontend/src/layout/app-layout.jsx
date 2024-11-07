import { Outlet } from "react-router-dom";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { useAppContext } from "@/context/context";
import clsx from "clsx";

export default function AppLayout() {
    const { sidebarOpen } = useAppContext();

    return (
        <div className="flex h-screen bg-gradient-to-br from-green-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-700">
            {/* Sidebar */}
            <Sidebar />
            {/* Main content */}
            <div className={clsx("flex w-full flex-col flex-1 overflow-hidden", sidebarOpen ? "md:pl-64" : "md:pl-16")}>
                {/* Navbar */}

                <Navbar />
                {/* Page content */}
                <main className="flex-1 overflow-auto  p-4 ">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
