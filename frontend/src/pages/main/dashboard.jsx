import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Book,
    Brain,
    Heart,
    Lightbulb,
    MessageCircle,
    Smile,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const mentalHealthTips = [
    {
        icon: Brain,
        title: "Mindfulness",
        description: "Practice mindfulness for 10 minutes daily",
    },
    {
        icon: Heart,
        title: "Self-Care",
        description: "Engage in activities you enjoy regularly",
    },
    {
        icon: Smile,
        title: "Positivity",
        description: "Focus on three positive things each day",
    },
    {
        icon: Lightbulb,
        title: "Learn",
        description: "Challenge your mind with new skills or hobbies",
    },
];
const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold gradient-title mb-6">
                Welcome to Your Mental Wellness Dashboard
            </h1>

            {/* Banner for Questions */}
            <Card className="mb-6 bg-gradient-to-r from-green-400 dark:from-blue-950 dark:to-green-950 to-blue-500 transition-colors duration-300">
                <CardContent className="flex items-center justify-between p-6">
                    <div>
                        <CardTitle className="text-2xl font-bold text-white mb-2">
                            Need therapist to book an appointment with?
                        </CardTitle>
                        <CardDescription className="text-white text-lg">
                            Our mental health professionals are here to help.
                        </CardDescription>
                    </div>
                    <Button
                        onClick={() => navigate("/doctors")}
                        className="bg-white text-green-600 hover:bg-green-100"
                    >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Book Appointment
                    </Button>
                </CardContent>
            </Card>

            {/* Blog Section */}
            <Card className="mb-6 dark:bg-zinc-950/80">
                <CardContent className="flex items-center justify-between p-6">
                    <div>
                        <CardTitle className="text-xl font-bold text-gray-800  dark:text-gray-200 mb-2">
                            Explore Our Mental Health Blog
                        </CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                            Discover articles, tips, and stories to support your
                            mental wellness journey.
                        </CardDescription>
                    </div>
                    <Link to="/blogs">
                        <Button className="bg-green-600 text-white hover:bg-green-700">
                            <Book className="mr-2 h-4 w-4" />
                            Go to Blog
                        </Button>
                    </Link>
                </CardContent>
            </Card>

            {/* Mental Health Tips Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mentalHealthTips.map((tip, index) => (
                    <Card key={index} className="dark:bg-zinc-950/80">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {tip.title}
                            </CardTitle>
                            <tip.icon className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                {tip.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Additional Resources */}
            <Card className="mt-6 dark:bg-zinc-950/80">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200">
                        Additional Resources
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="justify-start">
                        <Book className="mr-2 h-4 w-4" /> Self-Help Library
                    </Button>
                    <Button variant="outline" className="justify-start">
                        <MessageCircle className="mr-2 h-4 w-4" /> Support
                        Groups
                    </Button>
                    <Button variant="outline" className="justify-start">
                        <Lightbulb className="mr-2 h-4 w-4" /> Wellness
                        Workshops
                    </Button>
                    <Button variant="outline" className="justify-start">
                        <Heart className="mr-2 h-4 w-4" /> Crisis Hotlines
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default Dashboard;
