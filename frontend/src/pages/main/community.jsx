import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageCircle, Edit, Trash2, Send, Plus } from "lucide-react";
import { useAppContext } from "@/context/context";

const Community = () => {
    const {
        backendUrl,
        token,
        userData,
        fetchPosts,
        posts,
        setPosts,
        getUserData,
    } = useAppContext();
    const [newPost, setNewPost] = useState({ title: "", content: "" });
    const [editingPost, setEditingPost] = useState(null);
    const [commentContent, setCommentContent] = useState("");

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleCreatePost = async () => {
        try {
            const response = await axios.post(
                `${backendUrl}/post/add-post`,
                newPost,
                {
                    headers: { token },
                }
            );
            setPosts([response.data.post, ...posts]);
            setNewPost({ title: "", content: "" });
            toast.success("Post created successfully");
        } catch (error) {
            toast.error("Failed to create post");
        }
    };

    const handleUpdatePost = async () => {
        if (!editingPost) return;
        try {
            const response = await axios.put(
                `${backendUrl}/posts/${editingPost._id}`,
                editingPost,
                { headers: { token } }
            );
            setPosts(
                posts.map((post) =>
                    post._id === editingPost._id ? response.data.post : post
                )
            );
            setEditingPost(null);
            toast.success("Post updated successfully");
        } catch (error) {
            toast.error("Failed to update post");
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            await axios.delete(`${backendUrl}/posts/${postId}`, {
                headers: { token },
            });
            setPosts(posts.filter((post) => post._id !== postId));
            toast.success("Post deleted successfully");
        } catch (error) {
            toast.error("Failed to delete post");
        }
    };

    const handleLike = async (postId) => {
        try {
            const response = await axios.post(
                `${backendUrl}/posts/${postId}/like`,
                {},
                { headers: { token } }
            );
            setPosts(
                posts.map((post) =>
                    post._id === postId ? response.data.post : post
                )
            );
        } catch (error) {
            toast.error("Failed to like post");
        }
    };

    const handleComment = async (postId) => {
        try {
            const response = await axios.post(
                `${backendUrl}/posts/${postId}/comment`,
                { content: commentContent },
                { headers: { token } }
            );
            setPosts(
                posts.map((post) =>
                    post._id === postId ? response.data.post : post
                )
            );
            setCommentContent("");
            toast.success("Comment added successfully");
        } catch (error) {
            toast.error("Failed to add comment");
        }
    };

    const renderPost = (post) => (
        <Card key={post._id} className="mb-6 dark:bg-green-800">
            <CardHeader>
                <div className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarImage src={post.userData?.image} />
                        <AvatarFallback>
                            {post.userData?.name[0]}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-lg font-semibold text-green-700 dark:text-green-200">
                            {post.title}
                        </CardTitle>
                        <p className="text-sm text-green-600 dark:text-green-300">
                            {post.userData?.name} •{" "}
                            {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-green-800 dark:text-green-100">
                    {post.content}
                </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <div className="flex space-x-4">
                    <Button
                        variant="ghost"
                        onClick={() => handleLike(post._id)}
                        className="text-green-600 dark:text-green-300"
                    >
                        <Heart
                            className={`mr-2 h-4 w-4 ${
                                post.likes.includes(userData._id)
                                    ? "fill-current"
                                    : ""
                            }`}
                        />
                        {post.likes.length}
                    </Button>
                    <Button
                        variant="ghost"
                        className="text-green-600 dark:text-green-300"
                    >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        {post.comments.length}
                    </Button>
                </div>
                {post.userId === "currentUser" && (
                    <div className="flex space-x-2">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="text-green-600 dark:text-green-300"
                                >
                                    <Edit className="h-4 w-4" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="dark:bg-green-800">
                                <DialogHeader>
                                    <DialogTitle className="text-green-700 dark:text-green-200">
                                        Edit Post
                                    </DialogTitle>
                                </DialogHeader>
                                <Input
                                    value={editingPost?.title || ""}
                                    onChange={(e) =>
                                        setEditingPost({
                                            ...editingPost,
                                            title: e.target.value,
                                        })
                                    }
                                    className="mb-4"
                                />
                                <Textarea
                                    value={editingPost?.content || ""}
                                    onChange={(e) =>
                                        setEditingPost({
                                            ...editingPost,
                                            content: e.target.value,
                                        })
                                    }
                                    className="mb-4"
                                />
                                <Button
                                    onClick={handleUpdatePost}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                    Update
                                </Button>
                            </DialogContent>
                        </Dialog>
                        <Button
                            variant="ghost"
                            onClick={() => handleDeletePost(post._id)}
                            className="text-red-600 dark:text-red-400"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </CardFooter>
            <CardContent>
                <div className="mt-4 space-y-4">
                    {post.comments.map((comment) => (
                        <div
                            key={comment._id}
                            className="flex items-start space-x-4"
                        >
                            <Avatar>
                                <AvatarImage src={comment.user.image} />
                                <AvatarFallback>
                                    {comment.user.name[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-medium text-green-700 dark:text-green-200">
                                    {comment.user.name}
                                </p>
                                <p className="text-sm text-green-600 dark:text-green-300">
                                    {comment.content}
                                </p>
                                <p className="text-xs text-green-500 dark:text-green-400">
                                    {new Date(
                                        comment.createdAt
                                    ).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex items-center space-x-2">
                    <Input
                        placeholder="Add a comment..."
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                    />
                    <Button
                        onClick={() => handleComment(post._id)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="container mx-auto p-4 bg-green-50 dark:bg-green-900">
            <h1 className="gradient-title font-bold text-green-800 dark:text-green-100 mb-6">
                Community
            </h1>

            <Tabs defaultValue="timeline" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    <TabsTrigger value="your-posts">Your Posts</TabsTrigger>
                </TabsList>
                <TabsContent value="timeline">
                    <Card className="mb-6 dark:bg-green-800">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-green-700 dark:text-green-200">
                                Create a New Post
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Input
                                placeholder="Title"
                                value={newPost.title}
                                onChange={(e) =>
                                    setNewPost({
                                        ...newPost,
                                        title: e.target.value,
                                    })
                                }
                                className="mb-4"
                            />
                            <Textarea
                                placeholder="What's on your mind?"
                                value={newPost.content}
                                onChange={(e) =>
                                    setNewPost({
                                        ...newPost,
                                        content: e.target.value,
                                    })
                                }
                                className="mb-4"
                            />
                            <Button
                                onClick={handleCreatePost}
                                className="bg-green-600 hover:bg-green-700 text-white"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Create Post
                            </Button>
                        </CardContent>
                    </Card>
                    <ScrollArea className="min-h-[calc(100vh-300px)]">
                        {posts?.map(renderPost)}
                    </ScrollArea>
                </TabsContent>
                <TabsContent value="your-posts">
                    <ScrollArea className="h-[calc(100vh-200px)]">
                        {posts
                            .filter((post) => post.userId === userData._id)
                            .map(renderPost)}
                    </ScrollArea>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Community;
