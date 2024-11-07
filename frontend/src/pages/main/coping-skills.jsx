import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smile, Frown, Meh, Star, Plus, X } from "lucide-react";
import clsx from "clsx";

const initialCopingSkills = [
    { id: "1", text: "Take 10 deep breaths", category: "anxious" },
    { id: "2", text: "Go for a short walk", category: "stressed" },
    { id: "3", text: "Listen to upbeat music", category: "sad" },
    { id: "4", text: "Practice gratitude", category: "happy" },
    { id: "5", text: "Count to 10 slowly", category: "angry" },
];

const CopingSkills = () => {
    const [copingSkills, setCopingSkills] = useState(initialCopingSkills);
    const [newSkill, setNewSkill] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("happy");

    const addCopingSkill = () => {
        if (newSkill.trim() !== "") {
            const newSkillObject = {
                id: Date.now().toString(),
                text: newSkill.trim(),
                category: selectedCategory,
            };
            setCopingSkills([...copingSkills, newSkillObject]);
            setNewSkill("");
        }
    };

    const removeCopingSkill = (id) => {
        setCopingSkills(copingSkills.filter((skill) => skill.id !== id));
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case "happy":
                return <Smile className="h-5 w-5 text-yellow-500" />;
            case "sad":
                return <Frown className="h-5 w-5 text-blue-500" />;
            case "anxious":
                return <Meh className="h-5 w-5 text-purple-500" />;
            case "angry":
                return <Frown className="h-5 w-5 text-red-500" />;
            case "stressed":
                return <Meh className="h-5 w-5 text-orange-500" />;
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold  gradient-title mb-6">Coping Skills Toolbox</h1>
            <p className="text-lg text-gray-600 dark:text-gray-200/80 mb-8">
                Build your personal collection of coping strategies for different emotions and situations.
            </p>

            <Card className="mb-8  dark:bg-zinc-950/80">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Star className="mr-2 h-5 w-5 text-yellow-500" />
                        Add New Coping Skill
                    </CardTitle>
                    <CardDescription>Enter a new coping skill and select its category</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex space-x-2">
                        <Input
                            type="text"
                            placeholder="Enter a new coping skill"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            className="flex-grow auth-input"
                        />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="border rounded-md px-3 py-2 dark:bg-zinc-900"
                        >
                            <option value="happy">Happy</option>
                            <option value="sad">Sad</option>
                            <option value="anxious">Anxious</option>
                            <option value="angry">Angry</option>
                            <option value="stressed">Stressed</option>
                        </select>
                        <Button onClick={addCopingSkill} className="bg-green-600 text-white hover:bg-green-700">
                            <Plus className="mr-2 h-4 w-4" /> Add
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Tabs defaultValue="all">
                <TabsList className="mb-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="happy">Happy</TabsTrigger>
                    <TabsTrigger value="sad">Sad</TabsTrigger>
                    <TabsTrigger value="anxious">Anxious</TabsTrigger>
                    <TabsTrigger value="angry">Angry</TabsTrigger>
                    <TabsTrigger value="stressed">Stressed</TabsTrigger>
                </TabsList>
                {["all", "happy", "sad", "anxious", "angry", "stressed"].map((category) => (
                    <TabsContent key={category} value={category}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {copingSkills
                                .filter((skill) => category === "all" || skill.category === category)
                                .map((skill) => (
                                    <Card className=" dark:bg-zinc-950/80" key={skill.id}>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 mb-3">
                                            <CardTitle className="text-sm font-medium flex items-center">
                                                {getCategoryIcon(skill.category)}
                                                <span className="ml-2">{skill.text}</span>
                                            </CardTitle>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeCopingSkill(skill.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </CardHeader>
                                    </Card>
                                ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};

export default CopingSkills;
