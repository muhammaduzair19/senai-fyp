import React, { useEffect } from "react";
import { useAdminContext } from "../../context/admin-context";
import { useAppContext } from "../../context/context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, UserCheck, List, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
    const { atoken, getDashboardData, dashboardData, cancelAppointment } =
        useAdminContext();
    const { slotDateFormat } = useAppContext();

    useEffect(() => {
        if (atoken) {
            getDashboardData();
        }
    }, [atoken]);

    if (!dashboardData) return null;

    return (
        <div className="p-6 bg-green-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <DashboardCard
                    icon={Users}
                    title="Doctors"
                    value={dashboardData.doctors}
                />
                <DashboardCard
                    icon={Calendar}
                    title="Appointments"
                    value={dashboardData.appointments}
                />
                <DashboardCard
                    icon={UserCheck}
                    title="Patients"
                    value={dashboardData.patients}
                />
            </div>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-2xl font-bold">
                        Latest Bookings
                    </CardTitle>
                    <List className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                    {dashboardData.latestAppointments?.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center space-x-4 rounded-md border p-4 mb-2"
                        >
                            <Avatar>
                                <AvatarImage src={item.docData.image} />
                                <AvatarFallback>
                                    {item.docData.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {item.docData.name}
                                </p>
                                <p className="text-sm text-green-600">
                                    {slotDateFormat(item.slotDate)}
                                </p>
                            </div>
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
                                    onClick={() => cancelAppointment(item._id)}
                                >
                                    <X className="h-4 w-4 text-red-500" />
                                </Button>
                            )}
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
};

const DashboardCard = ({ icon: Icon, title, value }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
        </CardContent>
    </Card>
);

export default Dashboard;
