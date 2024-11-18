import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "@/context/context";
import { toast } from "react-toastify";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { token, setToken, backendUrl, getUserData } = useAppContext();
    const validateForm = () => {
        let errors = {};
        if (!email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email is invalid";
        }
        if (!password) {
            errors.password = "Password is required";
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        setErrors({});

        try {
            // Example API call
            const { data } = await axios.post(backendUrl + "/user/login", {
                email,
                password,
            });

            if (data.success) {
                localStorage.setItem("userToken", data.token);
                setToken(data.token);
                getUserData();
                toast.success("Register Successfully");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(
                "Sign in failed:",
                error.response?.data || error.message
            );
            toast.error("Invalid email or password. Please try again.");
            setErrors({ form: "Invalid email or password" });
            // Handle signin error (e.g., show error message to user)
        }
    };

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token]);

    return (
        <div className="font-poppins min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-zinc-800 dark:to-zinc-600 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8 bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <Heart className="mx-auto h-12 w-12 text-green-500 dark:text-green-600" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-gray-200">
                        Welcome
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-50">
                        Your journey to mental wellness continues here
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <Label htmlFor="email-address" className="sr-only">
                                Email address
                            </Label>
                            <Input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="auth-input"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                        <div className="relative">
                            <Label htmlFor="password" className="sr-only">
                                Password
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                className="auth-input pr-10"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <Eye
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                    />
                                )}
                            </button>
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        <Button type="submit" className="group auth-button">
                            Sign in
                        </Button>
                    </div>
                </form>
                <div className="text-center">
                    <Link
                        to="/"
                        className="font-medium text-green-600 hover:text-green-500"
                    >
                        Proceed without Login
                    </Link>
                </div>
                <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link
                        to="/signup"
                        className="font-medium text-green-600 hover:text-green-500"
                    >
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
