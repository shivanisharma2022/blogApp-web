import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      console.log("Token found:", token);

      if (!token) {
        console.warn("No token found");
        return;
      }

      try {
        const res = await axios.get("http://localhost:8000/api/user/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Dashboard response:", res.data);
        setUser(res.data.data);
      } catch (err) {
        console.error("Error fetching dashboard or blogs:", err.response?.data || err.message);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <div>Loading profile...</div>;

  return (
  <div className="flex items-center justify-between max-w-4xl mx-auto mt-10 px-4">
    <h1 className="text-xl font-semibold">Welcome to dashboard, {user.email}</h1>
    <img
      src={user.profileImage}
      alt="Profile"
      width={100}
      className="ml-4"
    />
  </div>
);
}

export default Dashboard;
