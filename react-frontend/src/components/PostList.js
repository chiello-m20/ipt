import { useState, useEffect } from "react";
import axios from "axios";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/posts/");
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const createPost = async () => {
        try {
            await axios.post("http://127.0.0.1:8000/api/posts/", {
                title,
                content,
                author
            });
            fetchPosts();  // Refresh the post list
            setTitle(""); setContent(""); setAuthor("");
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return (
        <div>
            <h1>Posts</h1>
            <div>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <button onClick={createPost}>Create Post</button>
            </div>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <small>By {post.author}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
