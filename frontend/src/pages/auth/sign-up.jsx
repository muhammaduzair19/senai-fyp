import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "@/context/context";
import { toast } from "react-toastify";

export default function SignUp() {
    const { token, setToken, backendUrl } = useAppContext();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        let errors = {};
        if (!name.trim()) errors.name = "Name is required";
        if (!email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email is invalid";
        }
        if (!password) {
            errors.password = "Password is required";
        } else if (password.length < 8) {
            errors.password = "Password must be at least 8 characters";
        }
        return errors;
    };

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        setErrors({});

        try {
            const { data } = await axios.post(backendUrl + "/user/register", {
                name,
                email,
                password,
            });

            if (data.success) {
                localStorage.setItem("userToken", data.token);
                setToken(data.token);
                toast.success("Register Successfully");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(
                "Sign up failed:",
                error.response?.data || error.message
            );
            toast.error(error.message);
        }
    };

    return (
        <div className="font-poppins min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-zinc-800 dark:to-zinc-600 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8 bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <Leaf className="mx-auto h-12 w-12 text-green-500 dark:text-green-600" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-gray-200">
                        Create your account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-50">
                        Start your journey to better mental health
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <Label htmlFor="name" className="sr-only">
                                Full Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                className="auth-input"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.name}
                                </p>
                            )}
                        </div>
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
                                autoComplete="new-password"
                                required
                                className="auth-input pr-10"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 pb-5 flex items-center text-gray-400 hover:text-gray-500"
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
                            Sign up
                        </Button>
                    </div>
                </form>
                <div className="text-center">
                    <Link
                        to="/"
                        className="font-medium text-green-600 hover:text-green-500"
                    >
                        Proceed without Register
                    </Link>
                </div>
                <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link
                        to="/signin"
                        className="font-medium text-green-600 hover:text-green-500"
                    >
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}
