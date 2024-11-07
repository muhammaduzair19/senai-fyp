import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Clock, MapPin, DollarSign } from "lucide-react";
import { useAppContext } from "@/context/context";
import { useNavigate } from "react-router-dom";

const MyAppointment = () => {
    const { backendUrl, token, getDoctorsData } = useAppContext();
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const slotDateFormat = (date) => {
        const newDate = date.split("_");
        return `${newDate[0]} - ${months[Number(newDate[1]) - 1]} - ${
            newDate[2]
        }`;
    };

    const getAppointments = async () => {
        try {
            const { data } = await axios.get(
                backendUrl + "/user/appointments",
                { headers: { token } }
            );
            if (data.success) {
                setAppointments(data.appointments.reverse());
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const cancelAppointment = async (appId) => {
        try {
            const { data } = await axios.post(
                backendUrl + "/user/cancel-appointment",
                { appointmentId: appId },
                { headers: { token } }
            );

            if (data.success) {
                toast.success(data.message);
                getAppointments();
                getDoctorsData();
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const onlinePayment = async (appId) => {
        try {
            const { data } = await axios.post(
                backendUrl + "/user/payment",
                { appointmentId: appId },
                { headers: { token } }
            );

            if (data.success) {
                console.log(data.sessionUrl);
                window.open(data.data.sessionUrl);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getAppointments();
    }, [token]);

    return (
        <div className="container mx-auto p-4 ">
            <h1 className="text-2xl gradient-title font-bold text-gray-800 dark:text-gray-100 mb-6">
                My Appointments
            </h1>
            <ScrollArea className="h-[calc(100vh-200px)] pt-2">
                {appointments.length > 0 ? (
                    <>
                        {appointments.map((doc) => (
                            <Card
                                key={doc._id}
                                className="mb-6 dark:bg-zinc-950/80"
                            >
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <Avatar className="w-32 h-32 rounded-lg">
                                            <AvatarImage
                                                src={doc?.docData.image}
                                                alt={doc.docData.name}
                                            />
                                            <AvatarFallback>
                                                {doc.docData.name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <CardTitle className="text-xl md:text-2xl font-bold text-green-800 dark:text-green-100 mb-2">
                                                {doc.docData.name}
                                            </CardTitle>
                                            <Badge
                                                variant="outline"
                                                className="mb-2"
                                            >
                                                {doc.docData.speciality
                                                    .split("-")
                                                    .join(" ")}
                                            </Badge>
                                            <p className="text-zinc-900 dark:text-gray-300 mb-2 flex items-center">
                                                <MapPin className="w-4 h-4 mr-2" />
                                                {doc.docData.address}
                                            </p>
                                            <p className="text-zinc-900 dark:text-gray-300 mb-2 flex items-center">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                {slotDateFormat(doc.slotDate)}
                                            </p>
                                            <p className="text-zinc-900 dark:text-gray-300 mb-4 flex items-center">
                                                <Clock className="w-4 h-4 mr-2" />
                                                {doc.slotTime}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {!doc.cancelled &&
                                                    !doc.isCompleted &&
                                                    doc.payment && (
                                                        <Badge variant="success">
                                                            Paid
                                                        </Badge>
                                                    )}
                                                {!doc.payment &&
                                                    !doc.isCompleted &&
                                                    !doc.cancelled && (
                                                        <Button
                                                            onClick={() =>
                                                                onlinePayment(
                                                                    doc._id
                                                                )
                                                            }
                                                            variant="outline"
                                                            className="bg-green-600 text-white hover:bg-green-700"
                                                        >
                                                            <DollarSign className="w-4 h-4 mr-2" />
                                                            Pay
                                                        </Button>
                                                    )}
                                                {!doc.isCompleted &&
                                                    !doc.cancelled && (
                                                        <Button
                                                            onClick={() =>
                                                                cancelAppointment(
                                                                    doc._id
                                                                )
                                                            }
                                                            variant="destructive"
                                                        >
                                                            Cancel Appointment
                                                        </Button>
                                                    )}
                                                {doc.cancelled && (
                                                    <Badge variant="destructive">
                                                        Appointment cancelled
                                                    </Badge>
                                                )}
                                                {doc.isCompleted && (
                                                    <Badge
                                                        variant="success"
                                                        className={
                                                            "bg-green-900"
                                                        }
                                                    >
                                                        Completed
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </>
                ) : (
                    <div className="w-full  flex  flex-col gap-6 items-start">
                        <p className="text-xl max-md:text-center text-red-600">
                            No Appointments Availabe
                        </p>
                        <Button
                            onClick={() => navigate("/doctors")}
                            className="bg-green-600 text-white  dark:bg-zinc-950/80"
                        >
                            Book an Appointment
                        </Button>
                    </div>
                )}
            </ScrollArea>
        </div>
    );
};

export default MyAppointment;
