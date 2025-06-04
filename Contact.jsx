import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ContactsSummary from "../components/Contacts/ContactsSummaryCards";
import "../styles/sales.css";
import ContactsTable from "../components/Contacts/ContactsTable";
import ChatRooms from "../components/Contacts/ChatRooms";
import ContactAnalytics from "../components/Contacts/ContactAnalytics";
import RecentInteractions from "../components/Contacts/RecentInteractions";


const Contact = () => {
  useEffect(() => {
    console.log("✅ Contact Page Rendered");
    document.title = "Contact - Admin Dashboard";
  }, []);



  

  return (
    <div className="sales-container">
      <Navbar />
      <div className="sales-content">
        <Sidebar />
        <main className="main-content">
        <ContactsSummary total={1000} employees={40} buyers={500} emails={460} />
        <ContactsTable />
        <ChatRooms />
        <ContactAnalytics />
        <RecentInteractions />
        </main>
      </div>
    </div>
  );
};

export default Contact;
