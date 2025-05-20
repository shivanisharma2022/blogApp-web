import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/blogs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(res.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const deleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`http://localhost:8000/api/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchBlogs(); // refresh list
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  return (
    <div>
      <h2>Your Blogs</h2>
      <button onClick={() => navigate("/blogs/new")}>Add New Blog</button>
      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%", marginTop: "1rem" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Image</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(({ _id, title, image, description }) => (
              <tr key={_id}>
                <td>{title}</td>
                <td>
                  {image && <img src={image} alt={title} width="100" />}
                </td>
                <td>{description.length > 100 ? description.slice(0, 100) + "..." : description}</td>
                <td>
                  <button onClick={() => navigate(`/blogs/${_id}`)}>View</button>{" "}
                  <button onClick={() => navigate(`/blogs/edit/${_id}`)}>Edit</button>{" "}
                  <button onClick={() => deleteBlog(_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
