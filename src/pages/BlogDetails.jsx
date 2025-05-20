import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlog(res.data.blog);
    } catch (err) {
      setError("Failed to fetch blog.");
    }
  };

  if (error) return <p>{error}</p>;
  if (!blog) return <p>Loading blog...</p>;

  return (
    <div>
      <button onClick={() => navigate("/blogs")}>Back to Blogs</button>
      <h2>{blog.title}</h2>
      {blog.image && <img src={blog.image} alt={blog.title} width="300" />}
      <p>{blog.description}</p>
    </div>
  );
}
