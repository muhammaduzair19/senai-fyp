import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { PenTool, Calendar as CalendarIcon, Save, List } from "lucide-react";

const DailyJournal = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [gratitude, setGratitude] = useState("");
    const [challenges, setChallenges] = useState("");
    const [improvements, setImprovements] = useState("");
    const [journalEntries, setJournalEntries] = useState([]);

    useEffect(() => {
        const storedEntries = localStorage.getItem("journalEntries");
        if (storedEntries) {
            setJournalEntries(JSON.parse(storedEntries));
        }
    }, []);

    useEffect(() => {
        const formattedDate = format(selectedDate, "yyyy-MM-dd");
        const existingEntry = journalEntries.find((entry) => entry.date === formattedDate);
        if (existingEntry) {
            setGratitude(existingEntry.gratitude);
            setChallenges(existingEntry.challenges);
            setImprovements(existingEntry.improvements);
        } else {
            setGratitude("");
            setChallenges("");
            setImprovements("");
        }
    }, [selectedDate, journalEntries]);

    const handleSaveEntry = () => {
        const formattedDate = format(selectedDate, "yyyy-MM-dd");
        const newEntry = {
            date: formattedDate,
            gratitude,
            challenges,
            improvements,
        };

        const updatedEntries = journalEntries.filter((entry) => entry.date !== formattedDate);
        updatedEntries.push(newEntry);
        setJournalEntries(updatedEntries);

        localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold gradient-title mb-6">Daily Reflection Journal</h1>
            <p className="text-lg text-gray-600 dark:text-gray-200/80 mb-8">
                Take a moment to reflect on your day and practice mindfulness.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="md:col-span-2 dark:bg-zinc-950/80">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <PenTool className="mr-2 h-5 w-5" />
                            Today&apos;s Reflection
                        </CardTitle>
                        <CardDescription>
                            Record your thoughts and feelings for {format(selectedDate, "MMMM d, yyyy")}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300/90 mb-1">
                                    What are you grateful for today?
                                </label>
                                <Textarea
                                    placeholder="I'm grateful for..."
                                    value={gratitude}
                                    onChange={(e) => setGratitude(e.target.value)}
                                    className="w-full auth-input"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300/90 mb-1">
                                    What challenges did you face?
                                </label>
                                <Textarea
                                    placeholder="Today's challenges were..."
                                    value={challenges}
                                    onChange={(e) => setChallenges(e.target.value)}
                                    className="w-full auth-input"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300/90 mb-1">
                                    How can you improve tomorrow?
                                </label>
                                <Textarea
                                    placeholder="Tomorrow, I will..."
                                    value={improvements}
                                    onChange={(e) => setImprovements(e.target.value)}
                                    className="w-full auth-input"
                                />
                            </div>
                            <Button
                                onClick={handleSaveEntry}
                                className="w-full bg-green-600 text-white hover:bg-green-700"
                            >
                                <Save className="mr-2 h-4 w-4" /> Save Entry
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="dark:bg-zinc-950/80">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <CalendarIcon className="mr-2 h-5 w-5" />
                            Select Date
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={(date) => date && setSelectedDate(date)}
                            className="rounded-md border"
                        />
                    </CardContent>
                </Card>
            </div>

            <Card className="mt-8 dark:bg-zinc-950/80">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <List className="mr-2 h-5 w-5" />
                        Recent Entries
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {journalEntries
                            .slice(-5)
                            .reverse()
                            .map((entry) => (
                                <li key={entry.date} className="flex justify-between items-center">
                                    <span>{format(new Date(entry.date), "MMMM d, yyyy")}</span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setSelectedDate(new Date(entry.date))}
                                    >
                                        View
                                    </Button>
                                </li>
                            ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
};

export default DailyJournal;
