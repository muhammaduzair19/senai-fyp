import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const blogPosts = [
    {
        id: 1,
        title: "Understanding Anxiety: Causes, Symptoms, and Coping Strategies",
        excerpt:
            "Anxiety is a common mental health concern. Learn about its causes, how to recognize symptoms, and effective strategies for managing anxiety in daily life.",
        author: "Dr. Emma Thompson",
        date: "2024-03-15",
        readTime: "5 min read",
        content: `
            <p className="font-bold text-gray-800 dark:text-gray-300 mb-4">Anxiety is a common mental health concern that affects millions of people worldwide. It's characterized by feelings of worry, nervousness, or unease about an imminent event or something with an uncertain outcome. While it's normal to feel anxious from time to time, persistent anxiety can interfere with daily life and overall well-being.</p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-4">Causes of Anxiety</h2>
            <p className="text-gray-800 dark:text-gray-300 mb-4">Anxiety can be caused by a variety of factors, including:</p>
            <ul className="list-disc ml-5 mb-6 text-gray-800 dark:text-gray-300">
                <li>Genetic predisposition</li>
                <li>Brain chemistry imbalances</li>
                <li>Environmental factors</li>
                <li>Traumatic experiences</li>
                <li>Chronic stress</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-4">Recognizing Symptoms</h2>
            <p className="text-gray-800 dark:text-gray-300 mb-4">Anxiety can manifest in various ways, including:</p>
            <ul className="list-disc ml-5 mb-6 text-gray-800 dark:text-gray-300">
                <li>Excessive worry or fear</li>
                <li>Restlessness or feeling on edge</li>
                <li>Difficulty concentrating</li>
                <li>Sleep disturbances</li>
                <li>Physical symptoms like rapid heartbeat, sweating, or trembling</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-4">Coping Strategies</h2>
            <p className="text-gray-800 dark:text-gray-300 mb-4">While anxiety can be challenging, there are several effective strategies for managing it:</p>
            <ol className="list-decimal ml-5 mb-6 text-gray-800 dark:text-gray-300">
                <li>Practice mindfulness and meditation</li>
                <li>Engage in regular physical exercise</li>
                <li>Maintain a healthy sleep schedule</li>
                <li>Limit caffeine and alcohol intake</li>
                <li>Seek support from friends, family, or a mental health professional</li>
            </ol>

            <p className="text-gray-800 dark:text-gray-300 mb-4">Remember, it's okay to ask for help. If anxiety is significantly impacting your life, consider reaching out to a mental health professional for additional support and guidance.</p>
        `,
    },
    {
        id: 2,
        title: "The Power of Mindfulness in Stress Reduction",
        excerpt:
            "Discover how mindfulness practices can significantly reduce stress levels and improve overall mental well-being. Learn simple techniques to incorporate mindfulness into your daily routine.",
        author: "Mark Johnson, Mindfulness Coach",
        date: "2024-03-10",
        readTime: "7 min read",
        content: `
            <p className="font-bold text-gray-800 dark:text-gray-300 mb-4">Stress has become an unavoidable part of modern life, but mindfulness offers a way to regain control and reduce the impact of stress on your body and mind. By focusing on the present moment and embracing a non-judgmental awareness, mindfulness can help you break free from the cycle of stress and anxiety.</p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-4">What is Mindfulness?</h2>
            <p className="text-gray-800 dark:text-gray-300 mb-4">Mindfulness is the practice of paying attention to the present moment without judgment. It involves being fully aware of your thoughts, emotions, and surroundings, allowing you to respond to situations with clarity rather than reacting automatically.</p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-4">Benefits of Mindfulness</h2>
            <p className="text-gray-800 dark:text-gray-300 mb-4">Practicing mindfulness regularly can lead to several benefits, including:</p>
            <ul className="list-disc ml-5 mb-6 text-gray-800 dark:text-gray-300">
                <li>Reduced stress levels</li>
                <li>Improved focus and concentration</li>
                <li>Enhanced emotional regulation</li>
                <li>Greater self-awareness</li>
                <li>Better sleep quality</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-4">How to Practice Mindfulness</h2>
            <p className="text-gray-800 dark:text-gray-300 mb-4">Here are some simple mindfulness techniques you can incorporate into your daily routine:</p>
            <ol className="list-decimal ml-5 mb-6 text-gray-800 dark:text-gray-300">
                <li>Start with mindful breathing. Focus on your breath as it enters and leaves your body.</li>
                <li>Engage in body scan meditation, where you bring attention to different parts of your body.</li>
                <li>Practice mindful walking by paying attention to each step and the sensations in your feet.</li>
                <li>Set aside time for mindful eating, fully savoring each bite of food.</li>
            </ol>

            <p className="text-gray-800 dark:text-gray-300 mb-4">By practicing mindfulness, you can build resilience against stress and enhance your overall well-being. Start small, and gradually integrate mindfulness into your daily routine for lasting results.</p>
        `,
    },
];

const Blogs = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold gradient-title mb-6">
                Mental Health Blog
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-200/80 mb-8">
                Explore our latest articles on mental health, wellness, and
                personal growth.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((post) => (
                    <Card
                        key={post.id}
                        className="flex flex-col dark:bg-zinc-950/80"
                    >
                        <CardHeader>
                            <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200">
                                {post.title}
                            </CardTitle>
                            <CardDescription className="text-sm text-gray-500 flex items-center mt-2">
                                <User className="mr-1 h-4 w-4" /> {post.author}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-400/90">
                                {post.excerpt}
                            </p>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center mt-auto">
                            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                                <Clock className="mr-1 h-4 w-4" />{" "}
                                {post.readTime}
                            </div>
                            <Link to={`/blog/${post.id}`}>
                                <Button className="bg-green-600 text-white hover:bg-green-700">
                                    Read More{" "}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Blogs;
