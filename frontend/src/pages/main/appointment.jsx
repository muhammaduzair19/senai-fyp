import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Calendar,
    Clock,
    Info,
    Check,
    ArrowLeft,
    ArrowLeftCircle,
} from "lucide-react";
import { useAppContext } from "@/context/context";

const Appointment = () => {
    const { docId } = useParams();
    const {
        doctors,
        backendUrl,
        currencySymbol,
        months,
        token,
        getDoctorsData,
    } = useAppContext();
    const [docInfo, setDocInfo] = useState({});
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState("");
    const navigate = useNavigate();
    const daysOfWeek = ["SUN", "MON", "TUES", "WED", "THURS", "FRI", "SAT"];

    const getDocInfo = () => {
        const filteredDocInfo = doctors?.find((doc) => doc._id === docId);
        setDocInfo(filteredDocInfo);
    };

    const getAvailableSlots = async () => {
        setDocSlots([]);

        // getting current date
        let today = new Date();

        for (let i = 0; i < 7; i++) {
            // getting date with index
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            //setting time of the date with index
            let endTime = new Date();
            endTime.setDate(today.getDate() + i);
            endTime.setHours(18, 0, 0, 0);

            //setting hours
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(
                    currentDate.getHours() > 10
                        ? currentDate.getHours() + 1
                        : 10
                );
                currentDate.setMinutes(currentDate.getDate() > 30 ? 30 : 0);
            } else {
                currentDate.setHours(10);
                currentDate.setMinutes(0);
            }

            let timeSlots = [];
            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                });

                let day = currentDate.getDate();
                let month = currentDate.getMonth() + 1;
                let year = currentDate.getFullYear();

                const slotDate = day + "_" + month + "_" + year;

                const slotTime = formattedTime;

                const isSlotAvailable =
                    docInfo?.slots_booked[slotDate] &&
                    docInfo?.slots_booked[slotDate].includes(slotTime)
                        ? false
                        : true;

                if (isSlotAvailable) {
                    timeSlots.push({
                        date: new Date(currentDate),
                        time: formattedTime,
                    });
                }

                //increase time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 60);
            }

            setDocSlots((p) => [...p, timeSlots]);
        }
    };

    useEffect(() => {
        getDocInfo();
    }, [docId, doctors]);

    useEffect(() => {
        getAvailableSlots();
    }, [docInfo]);

    const bookAppointment = async () => {
        if (!token) {
            toast.warn("Login to book appointment");
            localStorage.removeItem("token");
            return navigate("/signin");
        }
        try {
            const date = docSlots[slotIndex][0].date;
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            const slotDate = day + "_" + month + "_" + year;
            const { data } = await axios.post(
                backendUrl + "/user/book-appointment",
                { docId, slotDate, slotTime },
                { headers: { token } }
            );

            if (data.success) {
                toast.success(data.message);
                getDoctorsData();
                navigate("/my-appointments");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        docInfo && (
            <div className="container mx-auto p-4 ">
                <Button
                    onClick={() => navigate("/doctors")}
                    className="bg-zinc-950/80 text-gray-100 mb-4 ml-0.5 hover:text-black hover:bg-white transition-all duration-300"
                >
                    <ArrowLeftCircle strokeWidth={1} className="mr-2" />
                    All Doctors
                </Button>
                <Card className="mb-6 dark:bg-zinc-950/80">
                    <CardContent className="flex flex-col md:flex-row gap-6 p-6">
                        <Avatar className="w-full h-64 md:w-72 md:h-72">
                            <AvatarImage
                                src={docInfo.image}
                                alt={docInfo.name}
                                className="object-cover"
                            />
                            <AvatarFallback>
                                {docInfo.name?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <CardTitle className="text-3xl max-md:text-2xl font-bold text-black dark:text-gray-100 mb-2 flex items-center gap-2">
                                {docInfo.name}
                                <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </CardTitle>
                            <div className="flex items-center gap-2 text-sm mb-4">
                                <Badge
                                    variant="outline"
                                    className="text-gray-600 dark:text-gray-300 capitalize px-2    py-0.5"
                                >
                                    {docInfo.degree} - {docInfo.speciality}
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="text-gray-600 dark:text-gray-300 px-2    py-0.5"
                                >
                                    {docInfo.experience}
                                </Badge>
                            </div>
                            <p className="text-gray-700 dark:text-gray-200 mb-4 flex items-center">
                                <Info className="inline mr-2 w-4 h-4" />
                                About
                            </p>
                            <p className="text-gray-600 md:text-lg dark:text-gray-100 mb-4">
                                {docInfo.about}
                            </p>
                            <p className="text-gray-700 dark:text-gray-200">
                                Appointment fee:{" "}
                                <span className="font-bold text-zinc-900 dark:text-gray-100 ">
                                    {docInfo.fees}
                                    {currencySymbol}
                                </span>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="mb-6 dark:bg-zinc-950/80">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-green-800 dark:text-green-100">
                            Booking Slots
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="w-full whitespace-nowrap rounded-md border border-gray-300 dark:border-gray-600">
                            <div className="flex p-4">
                                {docSlots.map((slot, idx) => (
                                    <Button
                                        key={idx}
                                        variant={
                                            slotIndex === idx
                                                ? "default"
                                                : "outline"
                                        }
                                        className="mx-1 flex-shrink-0"
                                        onClick={() => setSlotIndex(idx)}
                                    >
                                        <div className="text-center flex items-center gap-2">
                                            <Calendar className="w-4 h-4 mb-1" />
                                            <p>
                                                {slot[0] &&
                                                    daysOfWeek[
                                                        slot[0].date.getDay()
                                                    ]}
                                            </p>
                                            <p>
                                                {slot[0] &&
                                                    slot[0].date.getDate()}
                                            </p>
                                            <p>
                                                {slot[0] &&
                                                    months[
                                                        slot[0].date.getMonth()
                                                    ]}
                                            </p>
                                        </div>
                                    </Button>
                                ))}
                            </div>
                        </ScrollArea>

                        <ScrollArea className="w-full whitespace-nowrap rounded-md border border-gray-300 dark:border-gray-600  mt-4">
                            <div className="flex p-4">
                                {docSlots[slotIndex]?.map((time, idx) => (
                                    <Button
                                        key={idx}
                                        variant={
                                            time.time === slotTime
                                                ? "default"
                                                : "outline"
                                        }
                                        className="mx-1 flex-shrink-0"
                                        onClick={() => setSlotTime(time.time)}
                                    >
                                        <Clock className="w-4 h-4 mr-2" />
                                        {time.time.toLowerCase()}
                                    </Button>
                                ))}
                            </div>
                        </ScrollArea>

                        <Button
                            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white"
                            onClick={bookAppointment}
                        >
                            Book an Appointment
                        </Button>
                    </CardContent>
                </Card>

                {/* You can add the RelatedDoctors component here */}
            </div>
        )
    );
};

export default Appointment;
