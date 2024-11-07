import React, { useEffect } from "react";
import { useAdminContext } from "../../context/admin-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";

const DoctorsList = () => {
    const { getAllDoctors, atoken, doctors, changeAvailability } =
        useAdminContext();

    useEffect(() => {
        if (atoken) {
            getAllDoctors();
        }
    }, [atoken]);

    return (
        <ScrollArea className="h-[calc(100vh-4rem)] px-4 py-6">
            <h1 className="text-2xl font-semibold text-green-800 mb-6">
                All Doctors
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors?.map((doctor) => (
                    <Card
                        key={doctor._id}
                        className="overflow-hidden transition-shadow hover:shadow-lg"
                    >
                        <CardHeader className="p-0">
                            <div className="relative h-48 bg-green-100">
                                <Avatar className="w-full h-full rounded-none">
                                    <AvatarImage
                                        src={doctor.image}
                                        alt={doctor.name}
                                        className="object-cover"
                                    />
                                    <AvatarFallback className="text-4xl">
                                        {doctor.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4">
                            <CardTitle className="text-lg font-semibold text-green-700 mb-2">
                                {doctor.name}
                            </CardTitle>
                            <p className="text-sm text-green-600 capitalize mb-4">
                                {doctor.speciality.split("-").join(" ")}
                            </p>
                            <div className="flex items-center justify-between">
                                <span
                                    className={`text-sm font-medium ${
                                        doctor.available
                                            ? "text-green-600"
                                            : "text-red-500"
                                    }`}
                                >
                                    {doctor.available
                                        ? "Available"
                                        : "Not Available"}
                                </span>
                                <Switch
                                    checked={doctor.available}
                                    onCheckedChange={() =>
                                        changeAvailability(doctor._id)
                                    }
                                    className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-200"
                                />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </ScrollArea>
    );
};

export default DoctorsList;
