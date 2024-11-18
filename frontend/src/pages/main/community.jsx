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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import {
    Heart,
    MessageCircle,
    Edit,
    Trash2,
    Send,
    Plus,
    ImageIcon,
    X,
    Check,
    MoreVertical,
    Link,
} from "lucide-react";
import { useAppContext } from "@/context/context";
import { useNavigate } from "react-router-dom";

// Dummy posts with comments
const dummyPosts = [
    {
        _id: "dummy1",
        title: "Overcoming Anxiety",
        content:
            "I've found that regular exercise and meditation have been incredibly helpful in managing my anxiety. What strategies work for you?",
        coverImage: "https://example.com/anxiety-image.jpg",
        userId: "dummyUser1",
        userData: {
            name: "Jane Doe",
            image: "https://example.com/jane-doe.jpg",
        },
        createdAt: "2023-06-15T10:00:00Z",
        likes: ["dummyUser2", "dummyUser3"],
        comments: [
            {
                _id: "dummyComment1",
                user: {
                    name: "John Smith",
                    image: "https://example.com/john-smith.jpg",
                },
                content:
                    "Great tips! I've also found that keeping a gratitude journal helps me stay positive.",
                createdAt: "2023-06-15T11:00:00Z",
            },
            {
                _id: "dummyComment2",
                user: {
                    name: "Emily Brown",
                    image: "https://example.com/emily-brown.jpg",
                },
                content:
                    "Meditation has been a game-changer for me too. Have you tried any specific apps?",
                createdAt: "2023-06-15T12:00:00Z",
            },
        ],
    },
    {
        _id: "dummy2",
        title: "The Importance of Self-Care",
        content:
            "Remember, taking care of yourself is not selfish. It's necessary for your mental health and overall well-being. What are your favorite self-care activities?",
        userId: "dummyUser2",
        userData: {
            name: "Mike Johnson",
            image: "https://example.com/mike-johnson.jpg",
        },
        createdAt: "2023-06-16T09:00:00Z",
        likes: ["dummyUser1"],
        comments: [
            {
                _id: "dummyComment3",
                user: {
                    name: "Sarah Lee",
                    image: "https://example.com/sarah-lee.jpg",
                },
                content:
                    "I love taking long baths and reading a good book. It's my way of disconnecting from the world.",
                createdAt: "2023-06-16T10:00:00Z",
            },
        ],
    },
];

const Community = () => {
    const navigate = useNavigate();
    const {
        backendUrl,
        token,
        userData,
        fetchPosts,
        posts,
        setPosts,
        getUserData,
    } = useAppContext();
    const [newPost, setNewPost] = useState({
        title: "",
        content: "",
        coverImage: null,
    });
    const [editingPost, setEditingPost] = useState(null);

    useEffect(() => {
        fetchPosts();
        getUserData();
    }, []);

    const handleCreatePost = async () => {
        try {
            const formData = new FormData();
            formData.append("title", newPost.title);
            formData.append("content", newPost.content);
            if (newPost.coverImage) {
                formData.append("coverImage", newPost.coverImage);
            }
            if (token) {
                const response = await axios.post(
                    `${backendUrl}/posts/add-post`,
                    formData,
                    {
                        headers: {
                            token,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                setPosts([response.data.post, ...posts]);
                setNewPost({ title: "", content: "", coverImage: null });
                toast.success("Post created successfully");
            } else {
                toast.warn("Please login first to post");
                navigate("/signin");
            }
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

    return (
        <div className="container mx-auto p-4">
            <h1 className="gradient-title font-bold text-green-800 dark:text-green-100 mb-6">
                Community
            </h1>

            <Tabs defaultValue="timeline" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    <TabsTrigger value="your-posts">Your Posts</TabsTrigger>
                </TabsList>
                <TabsContent value="timeline">
                    <Card className="mb-6 dark:bg-zinc-950/80">
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
                            <div className="flex items-center space-x-2 mb-4">
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setNewPost({
                                            ...newPost,
                                            coverImage: e.target.files
                                                ? e.target.files[0]
                                                : null,
                                        })
                                    }
                                    className="hidden"
                                    id="cover-image-input"
                                />
                                <Button
                                    onClick={() =>
                                        document
                                            .getElementById("cover-image-input")
                                            ?.click()
                                    }
                                    variant="outline"
                                    className="w-full justify-start text-green-600 dark:text-green-300"
                                >
                                    <ImageIcon className="mr-2 h-4 w-4" />
                                    {newPost.coverImage
                                        ? "Change Cover Image"
                                        : "Add Cover Image"}
                                </Button>
                                {newPost.coverImage && (
                                    <Button
                                        variant="ghost"
                                        onClick={() =>
                                            setNewPost({
                                                ...newPost,
                                                coverImage: null,
                                            })
                                        }
                                        className="text-red-600 dark:text-red-400"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
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
                        {[...dummyPosts, ...posts].map((post) => (
                            <RenderPost key={post?._id} post={post} />
                        ))}
                    </ScrollArea>
                </TabsContent>
                <TabsContent value="your-posts">
                    <ScrollArea className="min-h-[calc(100vh-200px)]">
                        {[...dummyPosts, ...posts]
                            .filter((post) => post?.userId === userData._id)
                            .map((post) => (
                                <RenderPost
                                    key={post?._id}
                                    post={post}
                                    userData={userData}
                                />
                            ))}
                    </ScrollArea>
                </TabsContent>
            </Tabs>

            <Dialog>
                <DialogContent className="">
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
        </div>
    );
};

const RenderPost = ({ post }) => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(post?.title);
    const [editedContent, setEditedContent] = useState(post?.content);
    const [commentContent, setCommentContent] = useState("");
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const { backendUrl, token, posts, setPosts, userData } = useAppContext();

    const handleUpdatePost = async (postId, newTitle, newContent) => {
        try {
            const response = await axios.put(
                `${backendUrl}/posts/${postId}`,
                { title: newTitle, content: newContent },
                { headers: { token } }
            );
            setPosts(
                posts.map((post) =>
                    post._id === postId ? response.data.post : post
                )
            );
            toast.success("Post updated successfully");
        } catch (error) {
            console.error("Failed to update post:", error);
            toast.error("Failed to update post");
            throw error;
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
        if (!token) {
            toast.warn("Login to like post");
            localStorage.removeItem("token");
            return navigate("/signin");
        }
        try {
            const response = await axios.post(
                `${backendUrl}/posts/${postId}/like`,
                {},
                { headers: { token } }
            );
            console.log(response.data);

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
        if (!token) {
            toast.warn("Login to comment");
            localStorage.removeItem("token");
            return navigate("/signin");
        }
        try {
            const response = await axios.post(
                `${backendUrl}/posts/${postId}/comment`,
                { content: commentContent },
                { headers: { token } }
            );

            if (response.data?.success) {
                console.log(response.data);
                setPosts(
                    posts.map((post) =>
                        post._id.toString() == postId.toString()
                            ? response.data.post
                            : post
                    )
                );
                setCommentContent("");
                setShowComments(true);
                toast.success("Comment added successfully");
            } else {
                toast.error("Failed to add comment");
            }
        } catch (error) {
            console.log(error);

            toast.error("Failed to add comment");
        }
    };
    const handleDeleteComment = async (postId) => {
        if (!token) {
            toast.warn("Login to comment");
            localStorage.removeItem("token");
            return navigate("/signin");
        }
        try {
            const response = await axios.delete(
                `${backendUrl}/posts/${postId}/comment`,
                { headers: { token } }
            );

            if (response.data?.success) {
                console.log(response.data);
                setPosts(
                    posts.map((post) =>
                        post._id.toString() == postId.toString()
                            ? response.data.post
                            : post
                    )
                );
                setCommentContent("");
                setShowComments(true);
                toast.success(response.data.message);
            } else {
                toast.error("Failed to delete comment");
            }
        } catch (error) {
            console.log(error);

            toast.error("Failed to delete comment");
        }
    };

    const copyPostLink = (postId) => {
        const link = `${window.location.origin}/post/${postId}`;
        navigator.clipboard.writeText(link);
        toast.success("Post link copied to clipboard");
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedTitle(post.title);
        setEditedContent(post.content);
    };

    const handleSaveEdit = async () => {
        try {
            await handleUpdatePost(post._id, editedTitle, editedContent);
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update post:", error);
            toast.error("Failed to update post");
        }
    };

    return (
        <Card key={post?._id} className="mb-6 dark:bg-zinc-950/80">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Avatar>
                            <AvatarImage src={post?.userData?.image} />
                            <AvatarFallback>
                                {post?.userData?.name[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            {isEditing ? (
                                <Input
                                    value={editedTitle}
                                    onChange={(e) =>
                                        setEditedTitle(e.target.value)
                                    }
                                    className="mb-2"
                                />
                            ) : (
                                <CardTitle className="text-lg font-semibold text-zinc-800 dark:text-gray-200">
                                    {post?.title}
                                </CardTitle>
                            )}
                            <p className="text-sm text-green-900 font-medium dark:text-green-300">
                                {post?.userData?.name} •{" "}
                                {new Date(post?.createdAt).toLocaleString()}
                            </p>
                        </div>
                    </div>
                    {post?.userId === userData._id && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onSelect={handleEdit}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onSelect={() => setIsDeleteDialogOpen(true)}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    <span>Delete</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onSelect={() => copyPostLink(post?._id)}
                                >
                                    <Link className="mr-2 h-4 w-4" />
                                    <span>Copy Link</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                {isEditing ? (
                    <Textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="mb-4"
                    />
                ) : (
                    <p className="text-zinc-800 dark:text-gray-100 mb-4">
                        {post?.content}
                    </p>
                )}
                {post?.coverImage && (
                    <img
                        src={post?.coverImage}
                        alt="Cover image"
                        width={600}
                        height={300}
                        className="w-full h-48 object-contain rounded-md"
                    />
                )}
            </CardContent>
            <CardFooter className="flex flex-col items-start">
                {isEditing ? (
                    <div className="flex justify-end w-full mb-4">
                        <Button
                            variant="ghost"
                            onClick={handleCancelEdit}
                            className="mr-2"
                        >
                            <X className="mr-2 h-4 w-4" />
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSaveEdit}
                            className="bg-green-600 hover:bg-green-700 text-white"
                        >
                            <Check className="mr-2 h-4 w-4" />
                            Save
                        </Button>
                    </div>
                ) : (
                    <div className="flex justify-between w-full mb-4">
                        <Button
                            variant="ghost"
                            onClick={() => handleLike(post._id)}
                            className="text-green-600 dark:text-green-300"
                        >
                            <Heart
                                className={`mr-2 h-4 w-4 ${
                                    post?.likes?.filter(
                                        (like) => like.userId === userData._id
                                    ).length > 0
                                        ? "fill-current"
                                        : ""
                                }`}
                            />
                            {post?.likesCount > 0 ? post?.likesCount : 0}{" "}
                            {post?.likesCount === 1 ? "Like" : "Likes"}
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => setShowComments(!showComments)}
                            className="text-green-600 dark:text-green-300"
                        >
                            <MessageCircle className="mr-2 h-4 w-4" />
                            {post?.comments?.length}
                        </Button>
                    </div>
                )}
                {showComments && (
                    <div className="w-full">
                        <div className="mt-4 space-y-4 border-t border-black/10 pt-4">
                            {post?.comments?.map((comment) => (
                                <div
                                    key={comment?._id}
                                    className="flex items-start space-x-4 border-b-[0.5px] pb-2 mb-4 border-gray-50/5"
                                >
                                    <Avatar>
                                        <AvatarImage
                                            src={comment?.userData?.image}
                                        />
                                        <AvatarFallback>
                                            {comment?.userData.name[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 flex w-full justify-between items-center">
                                        <div>
                                            <p className="text-sm font-medium text-zinc-900 dark:text-white">
                                                {comment?.userData?.name}
                                            </p>
                                            <p className="text-lg text-zinc-950 dark:text-gray-100">
                                                {comment.content}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <p className="text-xs text-slate-500 dark:text-white">
                                                {new Date(
                                                    comment?.createdAt
                                                ).toLocaleString()}
                                            </p>
                                            {comment?.userId?.toString() ==
                                                userData._id?.toString() && (
                                                <button
                                                    onClick={() =>
                                                        handleDeleteComment(
                                                            post?._id
                                                        )
                                                    }
                                                    className="cursor-pointer"
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-500 hover:text-red-900" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex items-center space-x-2">
                            <Input
                                placeholder="Add a comment..."
                                value={commentContent}
                                onChange={(e) =>
                                    setCommentContent(e.target.value)
                                }
                            />
                            <Button
                                onClick={() => handleComment(post?._id)}
                                className="bg-green-600 hover:bg-green-700 text-white"
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </CardFooter>

            <AlertDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you sure you want to delete this post?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your post.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                handleDeletePost(post._id);
                                setIsDeleteDialogOpen(false);
                            }}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Card>
    );
};

export default Community;
