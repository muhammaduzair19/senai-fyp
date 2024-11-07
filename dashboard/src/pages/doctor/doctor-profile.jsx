import React, { useEffect, useState } from "react";
import { useDoctorContext } from "../../context/doctor-context";
import { useAppContext } from "../../context/context";
import axios from "axios";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const DoctorProfile = () => {
    const [isEdit, setIsEdit] = useState(false);
    const { dtoken, getProfileData, backendUrl, setProfileData, profileData } =
        useDoctorContext();
    const { currency } = useAppContext();

    const updateProfile = async () => {
        try {
            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                available: profileData.available,
            };

            const { data } = await axios.post(
                backendUrl + "/doctor/update",
                updateData,
                { headers: { dtoken } }
            );
            if (data.success) {
                toast.success(data.message);
                setIsEdit(false);
                getProfileData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred. Please try again.");
        }
    };

    useEffect(() => {
        if (dtoken) {
            getProfileData();
        }
    }, [dtoken]);

    if (!profileData) return null;

    return (
        <div className="p-6 bg-green-50">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-green-800">
                        Doctor Profile
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-1/3">
                            <img
                                className="w-full rounded-lg object-cover"
                                src={profileData.image}
                                alt={profileData.name}
                            />
                        </div>
                        <div className="w-full md:w-2/3 space-y-4">
                            <h2 className="text-2xl font-bold text-green-700">
                                {profileData.name}
                            </h2>
                            <p className="text-green-600">
                                {profileData.degree} -{" "}
                                {profileData.speciality.split("-").join(" ")}
                            </p>
                            <p className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full inline-block">
                                {profileData.experience}
                            </p>
                            <div>
                                <h3 className="text-lg font-semibold text-green-700">
                                    About:
                                </h3>
                                <p className="text-green-600">
                                    {profileData.about}
                                </p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="fees">
                                    Appointment Fee ({currency})
                                </Label>
                                {isEdit ? (
                                    <Input
                                        id="fees"
                                        type="number"
                                        value={profileData.fees}
                                        onChange={(e) =>
                                            setProfileData((prev) => ({
                                                ...prev,
                                                fees: e.target.value,
                                            }))
                                        }
                                    />
                                ) : (
                                    <p className="text-green-700 font-semibold">
                                        {profileData.fees}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                {isEdit ? (
                                    <Textarea
                                        id="address"
                                        value={profileData.address}
                                        onChange={(e) =>
                                            setProfileData((prev) => ({
                                                ...prev,
                                                address: e.target.value,
                                            }))
                                        }
                                    />
                                ) : (
                                    <p className="text-green-600">
                                        {profileData.address}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="available"
                                    checked={profileData.available}
                                    onCheckedChange={(checked) =>
                                        isEdit &&
                                        setProfileData((prev) => ({
                                            ...prev,
                                            available: checked,
                                        }))
                                    }
                                    disabled={!isEdit}
                                    className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-200"
                                />
                                <Label htmlFor="available">Available</Label>
                            </div>
                            {isEdit ? (
                                <Button onClick={updateProfile}>Save</Button>
                            ) : (
                                <Button onClick={() => setIsEdit(true)}>
                                    Edit
                                </Button>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default DoctorProfile;
