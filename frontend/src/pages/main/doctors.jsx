import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "@/context/context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Doctors = () => {
    const { doctors } = useAppContext();
    const navigate = useNavigate();
    const { speciality } = useParams();

    const [filteredDoc, setFilteredDoc] = useState([]);
    const [showFilter, setShowFilters] = useState(false);

    const getFilteredDoctors = (doctors) => {
        if (speciality) {
            const filtered = doctors?.filter(
                (doctor) => doctor.speciality === speciality
            );
            setFilteredDoc(filtered);
        } else {
            setFilteredDoc(doctors);
        }
    };

    useEffect(() => {
        getFilteredDoctors(doctors);
    }, [speciality, doctors]);

    const specialities = [
        "general-physician",
        "gynecologist",
        "dermatologist",
        "pediatricians",
        "neurologist",
        "gastroenterologist",
    ];

    return (
        <div className="container mx-auto p-4 ">
            <h1 className="gradient-title font-bold text-green-800 dark:text-green-100 mb-4">
                Find a Doctor
            </h1>
            <p className=" text-gray-600 dark:text-gray-200/80 text-lg mb-6">
                Browse through our specialist doctors
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-full sm:w-1/4">
                    <Button
                        onClick={() => setShowFilters((prev) => !prev)}
                        className="w-full mb-4 sm:hidden bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                    >
                        {showFilter ? "Hide Filters" : "Show Filters"}
                    </Button>
                    <Card
                        className={`${
                            showFilter ? "block" : "hidden"
                        } sm:block dark:bg-zinc-950/80`}
                    >
                        <CardHeader>
                            <CardTitle className="text-green-800 dark:text-green-100">
                                Specialities
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[300px] w-full">
                                {specialities?.map((s) => (
                                    <Button
                                        key={s}
                                        variant="ghost"
                                        className={`w-full justify-start capitalize mb-2 ${
                                            speciality === s
                                                ? "bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100"
                                                : "text-green-600 dark:text-green-300"
                                        }`}
                                        onClick={() => {
                                            speciality === s
                                                ? navigate("/doctors")
                                                : navigate(`/doctors/${s}`);
                                        }}
                                    >
                                        {s.split("-").join(" ")}
                                    </Button>
                                ))}
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
                <div className="w-full sm:w-3/4">
                    {filteredDoc.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredDoc.map((doctor) => (
                                <Card
                                    key={doctor._id}
                                    className="cursor-pointer hover:shadow-lg transition-shadow dark:bg-zinc-950/80"
                                    onClick={() =>
                                        navigate(`/appointment/${doctor._id}`)
                                    }
                                >
                                    <CardHeader>
                                        <Avatar className="w-full h-48">
                                            <AvatarImage
                                                src={doctor.image}
                                                alt={doctor.name}
                                                className="object-cover"
                                            />
                                            <AvatarFallback>
                                                {doctor.name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </CardHeader>
                                    <CardContent>
                                        <Badge
                                            variant={
                                                doctor.available
                                                    ? "default"
                                                    : "secondary"
                                            }
                                            className="mb-2"
                                        >
                                            {doctor.available
                                                ? "Available"
                                                : "Not Available"}
                                        </Badge>
                                        <CardTitle className="text-lg text-zinc-800 dark:text-gray-100 mb-2">
                                            {doctor.name}
                                        </CardTitle>
                                        <p className="text-green-600 dark:text-green-300 text-sm capitalize">
                                            {doctor.speciality
                                                .split("-")
                                                .join(" ")}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card className="dark:bg-green-800">
                            <CardContent className="text-center p-6">
                                <p className="text-red-600 dark:text-red-100">
                                    No doctors available with this speciality
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Doctors;
