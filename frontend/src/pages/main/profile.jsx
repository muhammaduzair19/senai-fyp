import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Pencil,
    Upload,
    Mail,
    Phone,
    MapPin,
    User,
    Calendar,
} from "lucide-react";
import { useAppContext } from "@/context/context";

const Profile = () => {
    const { userData, setUserData, token, backendUrl, getUserData } =
        useAppContext();
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(null);

    const updateUserProfileData = async () => {
        try {
            const formData = new FormData();
            formData.append("name", userData.name);
            formData.append("phone", userData.phone);
            formData.append("address", JSON.stringify(userData.address));
            formData.append("gender", userData.gender);
            formData.append("dateOfBirth", userData.dateOfBirth);

            if (image) formData.append("image", image);

            const { data } = await axios.post(
                `${backendUrl}/user/update-profile`,
                formData,
                { headers: { token } }
            );
            if (data.success) {
                toast.success(data.message);
                getUserData();
                setIsEdit(false);
                setImage(null);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    if (!userData) return null;

    return (
        <div className="container mx-auto p-4 bg-green-50 dark:bg-green-900">
            <Card className="max-w-2xl mx-auto dark:bg-green-800">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-green-800 dark:text-green-100">
                        User Profile
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <Avatar className="w-24 h-24">
                                <AvatarImage
                                    src={
                                        image
                                            ? URL.createObjectURL(image)
                                            : userData.image
                                    }
                                />
                                <AvatarFallback>
                                    {userData.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            {isEdit && (
                                <Label
                                    htmlFor="image"
                                    className="cursor-pointer"
                                >
                                    <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                                        <Upload className="w-4 h-4" />
                                        <span>Upload new image</span>
                                    </div>
                                    <Input
                                        id="image"
                                        type="file"
                                        className="hidden"
                                        onChange={(e) =>
                                            setImage(
                                                e.target.files?.[0] || null
                                            )
                                        }
                                    />
                                </Label>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={userData.name}
                                    onChange={(e) =>
                                        setUserData((prev) => ({
                                            ...prev,
                                            name: e.target.value,
                                        }))
                                    }
                                    disabled={!isEdit}
                                />
                            </div>

                            <div>
                                <Label htmlFor="email">Email</Label>
                                <div className="flex items-center space-x-2">
                                    <Mail className="w-4 h-4 text-green-600 dark:text-green-400" />
                                    <Input
                                        id="email"
                                        value={userData.email}
                                        disabled
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="phone">Phone</Label>
                                <div className="flex items-center space-x-2">
                                    <Phone className="w-4 h-4 text-green-600 dark:text-green-400" />
                                    <Input
                                        id="phone"
                                        value={userData.phone}
                                        onChange={(e) =>
                                            setUserData((prev) => ({
                                                ...prev,
                                                phone: e.target.value,
                                            }))
                                        }
                                        disabled={!isEdit}
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="address">Address</Label>
                                <div className="flex items-center space-x-2">
                                    <MapPin className="w-4 h-4 text-green-600 dark:text-green-400" />
                                    <Input
                                        id="address"
                                        value={userData.address}
                                        onChange={(e) =>
                                            setUserData((prev) => ({
                                                ...prev,
                                                address: e.target.value,
                                            }))
                                        }
                                        disabled={!isEdit}
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="gender">Gender</Label>
                                <div className="flex items-center space-x-2">
                                    <User className="w-4 h-4 text-green-600 dark:text-green-400" />
                                    {isEdit ? (
                                        <Select
                                            value={userData.gender}
                                            onValueChange={(value) =>
                                                setUserData((prev) => ({
                                                    ...prev,
                                                    gender: value,
                                                }))
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select gender" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Male">
                                                    Male
                                                </SelectItem>
                                                <SelectItem value="Female">
                                                    Female
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <Input
                                            id="gender"
                                            value={userData.gender}
                                            disabled
                                        />
                                    )}
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="dateOfBirth">
                                    Date of Birth
                                </Label>
                                <div className="flex items-center space-x-2">
                                    <Calendar className="w-4 h-4 text-green-600 dark:text-green-400" />
                                    <Input
                                        id="dateOfBirth"
                                        type="date"
                                        value={userData.dateOfBirth}
                                        onChange={(e) =>
                                            setUserData((prev) => ({
                                                ...prev,
                                                dateOfBirth: e.target.value,
                                            }))
                                        }
                                        disabled={!isEdit}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            {isEdit ? (
                                <Button
                                    onClick={updateUserProfileData}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                                >
                                    Save Information
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => setIsEdit(true)}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                                >
                                    <Pencil className="w-4 h-4 mr-2" />
                                    Edit Profile
                                </Button>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Profile;
