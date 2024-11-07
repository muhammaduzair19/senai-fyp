import React, { useEffect } from "react"
import { useDoctorContext } from "../../context/doctor-context"
import { useAppContext } from "../../context/context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Check, X } from "lucide-react"

const DoctorAppointment = () => {
    const { dtoken, appointments, cancelAppointment, completeAppointment, getAppointments } = useDoctorContext()
    const { calculateAge, slotDateFormat, currency } = useAppContext()

    useEffect(() => {
        if (dtoken) {
            getAppointments()
        }
    }, [dtoken])

    return (
        <div className="p-6 bg-green-50">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-green-800">All Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[70vh]">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50px]">#</TableHead>
                                    <TableHead>Patient</TableHead>
                                    <TableHead>Payment</TableHead>
                                    <TableHead>Age</TableHead>
                                    <TableHead>Date & Time</TableHead>
                                    <TableHead>Fees</TableHead>
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
                                                    <AvatarImage src={item.userData.image} alt={item.userData.name} />
                                                    <AvatarFallback>{item.userData.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <span>{item.userData.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                                {item.payment ? "Online" : "Cash"}
                                            </span>
                                        </TableCell>
                                        <TableCell>{calculateAge(item.userData.dateOfBirth)}</TableCell>
                                        <TableCell>{slotDateFormat(item.slotDate)}, {item.slotTime}</TableCell>
                                        <TableCell>{currency}{item.amount}</TableCell>
                                        <TableCell>
                                            {item.isCompleted ? (
                                                <span className="text-green-600 font-medium">Completed</span>
                                            ) : item.cancelled ? (
                                                <span className="text-red-600 font-medium">Cancelled</span>
                                            ) : (
                                                <div className="flex space-x-2">
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => cancelAppointment(item._id)}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="default"
                                                        onClick={() => completeAppointment(item._id)}
                                                    >
                                                        <Check className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    )
}

export default DoctorAppointment