import React, { useEffect } from "react";
import { useDoctorContext } from "../../context/doctor-context";
import { useAppContext } from "../../context/context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, X, DollarSign, Calendar, Users } from "lucide-react";

const DoctorDashboard = () => {
    const {
        getDashboardData,
        dtoken,
        dashboardData,
        completeAppointment,
        cancelAppointment,
    } = useDoctorContext();
    const { slotDateFormat, currency } = useAppContext();

    useEffect(() => {
        if (dtoken) {
            getDashboardData();
        }
    }, [dtoken]);

    if (!dashboardData) return null;

    return (
        <div className="p-6 bg-green-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <DashboardCard
                    icon={DollarSign}
                    title="Earnings"
                    value={`${dashboardData.earnings}${currency}`}
                />
                <DashboardCard
                    icon={Calendar}
                    title="Appointments"
                    value={dashboardData.appointments}
                />
                <DashboardCard
                    icon={Users}
                    title="Patients"
                    value={dashboardData.patients}
                />
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-green-800">
                        Latest Bookings
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[50vh]">
                        {dashboardData.latestAppointments?.map(
                            (item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center space-x-4 py-4 border-b last:border-b-0"
                                >
                                    <Avatar>
                                        <AvatarImage
                                            src={item.userData.image}
                                            alt={item.userData.name}
                                        />
                                        <AvatarFallback>
                                            {item.userData.name[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-green-700">
                                            {item.userData.name}
                                        </p>
                                        <p className="text-sm text-green-600">
                                            {slotDateFormat(item.slotDate)}
                                        </p>
                                    </div>
                                    {item.isCompleted ? (
                                        <span className="text-green-600 text-sm font-medium">
                                            Completed
                                        </span>
                                    ) : item.cancelled ? (
                                        <span className="text-red-600 text-sm font-medium">
                                            Cancelled
                                        </span>
                                    ) : (
                                        <div className="flex space-x-2">
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() =>
                                                    cancelAppointment(item._id)
                                                }
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="default"
                                                onClick={() =>
                                                    completeAppointment(
                                                        item._id
                                                    )
                                                }
                                            >
                                                <Check className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )
                        )}
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
};

const DashboardCard = ({ icon: Icon, title, value }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">
                {title}
            </CardTitle>
            <Icon className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold text-green-800">{value}</div>
        </CardContent>
    </Card>
);

export default DoctorDashboard;
