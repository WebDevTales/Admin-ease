import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/sales.css";
import "../styles/profile.css"; // ✅ Add profile.css for styling
import ProfilePage from "../components/Profile/ProfilePage";
import UserBadges from "../components/Profile/UserBadges"; // ✅ Add UserBadges component
import DigitalClock from "../components/Profile/DigitalClock";
import FeedbackWidget from "../components/Profile/FeedbackWidget"; // ✅ Add FeedbackWidget component
import FeedbackViewer from "../components/Profile/FeedbackViewer"; // ✅ Add FeedbackViewer component
import UpcomingEvents from "../components/Profile/UpcomingEvents"; // ✅ Add UpcomingEvents component
import MotivationWidget from "../components/Profile/MotivationWidget"; // ✅ Add SkillTracker component
import StatsWidget from "../components/Profile/StatsWidget";
import WeatherWidget from "../components/Profile/WeatherWidget"; // ✅ Add WeatherWidget component

const Profile = () => {
  useEffect(() => {
    console.log("✅ Profile Page Rendered");
    document.title = "Profile - Admin Dashboard";
  }, []);

  return (
    <div className="sales-container">
      <Navbar />
      <div className="sales-content">
        <Sidebar />
        <main className="main-content profile-layout">
  <div className="profile-left">
    <ProfilePage />
  </div>
  <div className="profile-right">
    <UserBadges />
    <div className="profile-nest">
        <DigitalClock />
        <FeedbackViewer />
    </div>
        <MotivationWidget />
        <div className="profile-nest">
            <WeatherWidget />
            <StatsWidget />
        </div>
        <UpcomingEvents />
  </div>
  
  <FeedbackWidget />
</main>

      </div>
    </div>
  );
};

export default Profile;
