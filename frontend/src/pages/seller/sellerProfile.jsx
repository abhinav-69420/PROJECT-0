import React, { useEffect, useState } from "react";
import axios from "axios";
import "./sellerPofile.css"
import defaultProfilePic from "../../assets/default-profile.png"; // Adjust the relative path to reach assets


function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in to view your profile.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/seller/profileseller", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfileData(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(
          err.response?.data?.message || "Failed to fetch profile details."
        );
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!profileData) {
    return <div className="loading-message">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <h1>Your Profile</h1>
      {/* Profile picture */}
      <div className="profile-pic-container">
      <img
  src={defaultProfilePic}  // Correct path for images in the public folder
  alt="Profile"
  className="profile-pic"
/>

      </div>
      <div className="profile-details">
        <p><strong>Email:</strong> {profileData.email}</p>
        <p><strong>Username:</strong> {profileData.username}</p>
        {/* Add more fields as per the API response */}
      </div>
    </div>
  );
}

export default Profile;
