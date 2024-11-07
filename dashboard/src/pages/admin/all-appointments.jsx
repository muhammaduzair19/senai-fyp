import React, { useEffect } from "react";
import { useAdminContext } from "../../context/admin-context";
import { useAppContext } from "../../context/context";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const AllAppointments = () => {
    const { appointments, getAllAppointments, atoken, cancelAppointment } =
        useAdminContext();
    const { calculateAge, slotDateFormat, currency } = useAppContext();

    useEffect(() => {
        if (atoken) {
            getAllAppointments();
        }
    }, [atoken]);

    return (
        <div className="p-6 bg-green-50">
            <Card>
                <CardHeader>
                    <CardTitle>All Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">#</TableHead>
                                <TableHead>Patient</TableHead>
                                <TableHead>Age</TableHead>
                                <TableHead>Date & Time</TableHead>
                                <TableHead>Dr.</TableHead>
                                <TableHead>Fee</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {appointments?.reverse()?.map((item, index) => (
                                <TableRow key={item._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <Avatar>
                                                <AvatarImage
                                                    src={item.userData?.image}
                                                />
                                                <AvatarFallback>
                                                    {item.userData?.name.charAt(
                                                        0
                                                    )}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span>{item.userData?.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {calculateAge(
                                            item.userData.dateOfBirth
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {slotDateFormat(item.slotDate)},{" "}
                                        {item.slotTime}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <Avatar>
                                                <AvatarImage
                                                    src={item.docData?.image}
                                                />
                                                <AvatarFallback>
                                                    {item.docData?.name.charAt(
                                                        0
                                                    )}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span>{item.docData?.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <span>
                                                {currency} {item.amount}
                                            </span>
                                            {item.payment && (
                                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                                    Paid
                                                </span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {item.cancelled ? (
                                            <span className="text-red-500 text-sm">
                                                Cancelled
                                            </span>
                                        ) : item.isCompleted ? (
                                            <span className="text-green-600 text-sm">
                                                Completed
                                            </span>
                                        ) : (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    cancelAppointment(item._id)
                                                }
                                            >
                                                <X className="h-4 w-4 text-red-500" />
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default AllAppointments;
