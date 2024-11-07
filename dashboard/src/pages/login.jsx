import React, { useState } from "react";
import { useAdminContext } from "../context/admin-context";
import { useDoctorContext } from "../context/doctor-context";
import axios from "axios";
import { toast } from "react-toastify";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const Login = () => {
    const [state, setState] = useState("admin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const { setAtoken, backendUrl } = useAdminContext();
    const { setDtoken } = useDoctorContext();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            if (state === "admin") {
                const { data } = await axios.post(backendUrl + "/admin/login", {
                    email,
                    password,
                });
                if (data.success) {
                    localStorage.setItem("atoken", data.token);
                    setAtoken(data.token);
                    toast.success("Admin login successful");
                } else {
                    toast.error(data.message);
                }
            } else if (state === "doctor") {
                const { data } = await axios.post(
                    backendUrl + "/doctor/login",
                    {
                        email,
                        password,
                    }
                );
                if (data.success) {
                    localStorage.setItem("dtoken", data.token);
                    setDtoken(data.token);
                    toast.success("Doctor login successful");
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-center">
                        <span className="capitalize text-green-700">
                            {state}{" "}
                        </span>
                        Login
                    </CardTitle>
                    <CardDescription className="text-center text-green-600">
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmitHandler} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-700"
                                >
                                    {showPassword ? (
                                        <EyeOffIcon className="h-5 w-5" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                        >
                            Login
                        </Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-green-600 text-center w-full">
                        {state === "admin" ? "Doctor Login?" : "Admin Login?"}
                        <button
                            type="button"
                            className="ml-1 text-green-700 font-medium underline hover:text-green-800"
                            onClick={() =>
                                setState(state === "admin" ? "doctor" : "admin")
                            }
                        >
                            Click here
                        </button>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Login;
