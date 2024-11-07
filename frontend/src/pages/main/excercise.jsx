import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayCircle, Book, Clock } from "lucide-react";

const exercises = [
    {
        id: 1,
        title: "5-Minute Mindfulness Meditation",
        description: "A quick meditation to center yourself and reduce stress.",
        duration: "5 minutes",
        type: "video",
        url: "https://www.youtube.com/embed/inpok4MKVLM",
    },
    {
        id: 2,
        title: "Progressive Muscle Relaxation",
        description: "Relieve tension by systematically tensing and relaxing muscle groups.",
        duration: "10 minutes",
        type: "text",
        content: `
      1. Start by tensing the muscles in your feet. Hold for 5 seconds, then release.
      2. Move to your calves. Tense for 5 seconds, then relax.
      3. Continue this process, moving upwards through your body: thighs, buttocks, abdomen, chest, arms, hands, neck, and face.
      4. Focus on the sensation of relaxation as you release each muscle group.
      5. Once you've reached your face, take a few deep breaths and notice how your body feels.
    `,
    },
    {
        id: 3,
        title: "Guided Visualization for Anxiety",
        description: "Use your imagination to create a calm, peaceful scene.",
        duration: "15 minutes",
        type: "audio",
        url: "https://example.com/guided-visualization.mp3",
    },
    {
        id: 4,
        title: "Deep Breathing Exercise for Stress Relief",
        description: "Calm your mind with focused, deep breathing.",
        duration: "7 minutes",
        type: "audio",
        url: "https://example.com/deep-breathing.mp3",
    },
    {
        id: 5,
        title: "Body Scan Meditation for Relaxation",
        description: "Gently guide your awareness through your body to relieve tension and stress.",
        duration: "12 minutes",
        type: "audio",
        url: "https://example.com/body-scan.mp3",
    },
    {
        id: 6,
        title: "Affirmations for Positive Thinking",
        description: "Boost your mindset with these calming, positive affirmations.",
        duration: "5 minutes",
        type: "audio",
        url: "https://example.com/affirmations.mp3",
    },
    {
        id: 7,
        title: "Yoga Flow for Mental Clarity",
        description: "A simple yoga flow designed to clear the mind and increase focus.",
        duration: "10 minutes",
        type: "video",
        url: "https://www.youtube.com/embed/v7AYKMP6rOE",
    },
    {
        id: 8,
        title: "Stress Relief Breathing Techniques",
        description: "Learn essential breathing techniques to reduce stress and increase relaxation.",
        duration: "8 minutes",
        type: "video",
        url: "https://www.youtube.com/embed/tv8aa32g7lE",
    },
    {
        id: 9,
        title: "Mindful Stretching Routine",
        description: "A short series of mindful stretches to ease tension in the body.",
        duration: "6 minutes",
        type: "video",
        url: "https://www.youtube.com/embed/Jyy0ra2WcQQ",
    },
    {
        id: 10,
        title: "Grounding Techniques to Manage Anxiety",
        description: "A written guide on grounding techniques to help manage anxiety.",
        duration: "5 minutes",
        type: "text",
        content: `
      1. Focus on your five senses. Start by noticing what you can see around you.
      2. Move to your sense of touch. Feel the texture of the object you're holding or your surroundings.
      3. Next, pay attention to sounds. Identify three things you can hear in your environment.
      4. Continue with smell, identifying any scents in the air.
      5. Finally, focus on taste by taking a sip of water or noticing the taste in your mouth.
      6. This exercise helps ground your mind by bringing attention to the present moment.
    `,
    },
    {
        id: 11,
        title: "Journaling for Emotional Clarity",
        description: "A simple journaling exercise to clear your mind and process emotions.",
        duration: "10 minutes",
        type: "text",
        content: `
      1. Start by setting a timer for 10 minutes.
      2. Write down whatever comes to mind, without filtering or judging your thoughts.
      3. If you're stuck, consider prompts such as: "What am I feeling right now?" or "What do I need at this moment?"
      4. Once the timer ends, read over what you've written, and reflect on any insights or recurring themes.
    `,
    },
    {
        id: 12,
        title: "Gratitude Writing Exercise",
        description: "Cultivate a positive mindset with this daily gratitude exercise.",
        duration: "5 minutes",
        type: "text",
        content: `
      1. Each morning or evening, take 5 minutes to write down three things you are grateful for.
      2. Focus on specific moments or experiences, rather than general statements.
      3. Reflect on how these things made you feel and why they are meaningful to you.
      4. This simple practice can boost your mood and help develop a habit of positive thinking.
    `,
    },
];

const Exercise = () => {
    const [activeTab, setActiveTab] = useState("all");

    const filteredExercises = activeTab === "all" ? exercises : exercises.filter((ex) => ex.type === activeTab);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold  mb-6 gradient-title">Mental Wellness Exercises</h1>
            <p className="text-lg text-gray-600 dark:text-gray-200/80 mb-8">
                Explore our collection of exercises designed to improve your mental well-being.
            </p>

            <Tabs defaultValue="all" className="mb-8">
                <TabsList>
                    <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
                        All Exercises
                    </TabsTrigger>
                    <TabsTrigger value="video" onClick={() => setActiveTab("video")}>
                        Video
                    </TabsTrigger>
                    <TabsTrigger value="audio" onClick={() => setActiveTab("audio")}>
                        Audio
                    </TabsTrigger>
                    <TabsTrigger value="text" onClick={() => setActiveTab("text")}>
                        Text
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExercises.map((exercise) => (
                    <Card key={exercise.id} className="dark:bg-zinc-950/80 col-span-1 row-span-2">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200">
                                {exercise.title}
                            </CardTitle>
                            <CardDescription className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                                <Clock className="mr-1 h-4 w-4" /> {exercise.duration}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">{exercise.description}</p>
                            {exercise.type === "video" && (
                                <div className="aspect-w-16 aspect-h-9 mb-4">
                                    <iframe
                                        src={exercise.url}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full rounded-md"
                                    ></iframe>
                                </div>
                            )}
                            {exercise.type === "audio" && (
                                <audio controls className="w-full mb-4">
                                    <source src={exercise.url} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                            )}
                            {exercise.type === "text" && (
                                <div className="bg-gray-100 p-4 rounded-md mb-4">
                                    <pre className="whitespace-pre-wrap text-sm text-gray-700">{exercise.content}</pre>
                                </div>
                            )}
                            <Button className="w-full bg-green-600 text-white hover:bg-green-700">
                                {exercise.type === "video" ? (
                                    <>
                                        <PlayCircle className="mr-2 h-4 w-4" /> Watch Exercise
                                    </>
                                ) : exercise.type === "audio" ? (
                                    <>
                                        <PlayCircle className="mr-2 h-4 w-4" /> Listen to Exercise
                                    </>
                                ) : (
                                    <>
                                        <Book className="mr-2 h-4 w-4" /> Read Exercise
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Exercise;
