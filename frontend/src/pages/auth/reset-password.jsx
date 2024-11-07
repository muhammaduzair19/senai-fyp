import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";

export default function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        // Handle password reset logic here
        console.log("Password reset attempted");
    };

    return (
        <div className=" font-poppins min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-zinc-800 dark:to-zinc-600 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8 bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <Lock className="mx-auto h-12 w-12 text-green-500 dark:text-green-600" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-gray-200">
                        Reset your password
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-50">Enter your new password below</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <Label htmlFor="new-password" className="sr-only">
                                New Password
                            </Label>
                            <Input
                                id="new-password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="auth-input"
                                placeholder="New Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="confirm-password" className="sr-only">
                                Confirm New Password
                            </Label>
                            <Input
                                id="confirm-password"
                                name="confirm-password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="auth-input"
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <Button type="submit" className="group auth-button">
                            Reset Password
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
