import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MailCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle forgot password logic here
        console.log("Password reset requested for:", email);
    };

    return (
        <div className=" font-poppins min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-zinc-800 dark:to-zinc-600 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8 bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <MailCheck className="mx-auto h-12 w-12 text-green-500 dark:text-green-600" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-gray-200">
                        Forgot your password?
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-50">
                        No worries, we&apos;ll send you reset instructions
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm">
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
                        </div>
                    </div>

                    <div>
                        <Button type="submit" className="group auth-button">
                            Verify Email
                        </Button>
                    </div>
                </form>
                <div className="text-center text-sm">
                    Remember your password?{" "}
                    <Link
                        to={"/signin"}
                        className="font-medium text-green-600 hover:text-green-500"
                    >
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}
