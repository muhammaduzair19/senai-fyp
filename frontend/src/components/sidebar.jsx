import { useAppContext } from "@/context/context";
import clsx from "clsx";
import {
    Home,
    Menu,
    Library,
    Activity,
    NotebookPen,
    ScrollText,
    BookHeart,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

const Sidebar = () => {
    const { sidebarOpen, setSidebarOpen } = useAppContext();
    const location = useLocation();

    const navItems = [
        { icon: Home, label: "Home", path: "/" },
        { icon: Library, label: "Blogs", path: "/blogs" },
        { icon: Activity, label: "Excercises", path: "/excercises" },
        { icon: NotebookPen, label: "Daily Journal", path: "/daily-journal" },
        { icon: ScrollText, label: "Coping Skills", path: "/coping-skills" },
        { icon: BookHeart, label: "Therapist", path: "/doctors" },
    ];

    return (
        <aside
            className={`${
                sidebarOpen ? "w-72 md:w-64" : "w-0 md:w-16 overflow-hidden"
            } fixed inset-y-0 left-0 z-50 bg-white dark:bg-zinc-900 dark:text-white dark:border-r  dark:border-zinc-600 shadow-lg transition-all duration-500 ease-in-out `}
        >
            <div className="flex h-full flex-col">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-2">
                        <img
                            className={clsx(
                                "w-7 h-7 rounded-full object-contain",
                                sidebarOpen ? "block" : "hidden md:block"
                            )}
                            src="/images/title.png"
                            alt=""
                        />
                        <h2
                            className={clsx(
                                "text-xl font-semibold text-green-600 dark:text-green-400",
                                sidebarOpen ? "block" : "hidden"
                            )}
                        >
                            Senai
                        </h2>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={clsx(
                            sidebarOpen ? "block md:hidden" : "hidden"
                        )}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">
                            {sidebarOpen ? "Close sidebar" : "Open sidebar"}
                        </span>
                    </Button>
                </div>
                <nav className="flex-1 space-y-3 p-2">
                    {navItems.map((item) => (
                        <Link
                            title={item.label}
                            key={item.path}
                            to={item.path}
                            className={clsx(
                                "flex items-center rounded-lg px-4 py-2 text-sm font-semibold",
                                location.pathname === item.path
                                    ? "bg-green-100 dark:bg-green-50 text-green-700"
                                    : "text-gray-600 dark:text-gray-200 dark:hover:bg-green-600 hover:bg-green-50"
                            )}
                        >
                            <item.icon
                                className={clsx("w-5 h-5 mr-2 flex-shrink-0")}
                            />
                            <p className="ml-3"> {item.label}</p>
                        </Link>
                    ))}
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
