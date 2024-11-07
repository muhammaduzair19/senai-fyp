import { Button } from "./ui/button";
import { LogOut, Menu } from "lucide-react";
import { useAppContext } from "@/context/context";
import DarkModeSwitcher from "./mode-switcher";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";

const Navbar = () => {
    const { sidebarOpen, setSidebarOpen, userData, token } = useAppContext();
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("userToken");
    };
    return (
        <header className="bg-white shadow-sm dark:bg-zinc-900 dark:text-white dark:border-b  dark:border-zinc-600">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="mr-4"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <Menu className="h-6 w-6" />

                        <span className="sr-only">
                            {sidebarOpen ? "Close sidebar" : "Open sidebar"}
                        </span>
                    </Button>
                    <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                        Senai
                    </h1>
                </div>
                <div className="flex items-center mx-6 gap-6 ">
                    <DarkModeSwitcher />
                    {token && userData ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="relative h-8 w-8 rounded-full"
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage
                                            src={userData.image}
                                            alt={userData.name}
                                        />
                                        <AvatarFallback className="uppercase bg-green-700 font-bold text-white">
                                            {userData.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-56"
                                align="end"
                                forceMount
                            >
                                <DropdownMenuItem
                                    onClick={() => navigate("/profile")}
                                >
                                    My Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => navigate("/my-appointments")}
                                >
                                    My Appointments
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={logout}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button
                            onClick={() => navigate("/signin")}
                            className="bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                        >
                            Create account
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
