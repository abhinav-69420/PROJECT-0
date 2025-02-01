import React, { useEffect, useState } from "react";
import axios from "axios";
import defaultProfilePic from "../../assets/default-profile.png"; // Adjust path as needed
import "./buyerProfile.css"

function BuyerProfile() {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBuyerProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in to view your profile.");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/buyer/getbuyer",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProfileData(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(
          err.response?.data?.message || "Failed to fetch profile details."
        );
      }
    };

    fetchBuyerProfile();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!profileData) {
    return <div className="loading-message">Loading profile...</div>;
  }
  console.log(profileData);
  return (
    <div className="profile-container">
    <h1>Your Profile</h1>
  
    {/* Profile Picture */}
    <div className="profile-pic-container">
      <img
        src={profileData.profilePic || defaultProfilePic} // Default profile picture
        alt="Profile"
        className="profile-pic"
      />
    </div>
  
    {/* Profile Details */}
    <div className="profile-details">
      <p><strong>Email:</strong> {profileData.email}</p>
      <div className="name-row">
        <p><strong>First Name:</strong> {profileData.firstname}</p>
        <p><strong>Last Name:</strong> {profileData.lastname}</p>
      </div>
      <p><strong>Phone Number:</strong> {profileData.phoneNo}</p>
  
      <div className="profile-address">
        <h2>Address</h2>
        {profileData.address && profileData.address.length > 0 ? (
          profileData.address.map((addr, index) => (
            <div key={index} className="address-block">
              <div className="address-row">
                <p><strong>Street:</strong> {addr.street || "N/A"}</p>
                <p><strong>City:</strong> {addr.city || "N/A"}</p>
              </div>
              <div className="address-row">
                <p><strong>State:</strong> {addr.state || "N/A"}</p>
                <p><strong>PIN:</strong> {addr.pin || "N/A"}</p>
              </div>
              <p><strong>Country:</strong> {addr.country || "N/A"}</p>
            </div>
          ))
        ) : (
          <p>Address not provided</p>
        )}
      </div>
    </div>
  </div>
  

  );
}

export default BuyerProfile;
