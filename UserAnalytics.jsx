import React from "react";
import "../../styles/Dashboard/UserAnalytics.css";

// 🌍 **Import Country Flags**
import usaFlag from "../../assets/flags/usa.svg";
import ukFlag from "../../assets/flags/pk.svg";
import indiaFlag from "../../assets/flags/india.svg";
import germanyFlag from "../../assets/flags/germany.svg";
import canadaFlag from "../../assets/flags/canada.svg";
import australiaFlag from "../../assets/flags/australia.svg";

const UserAnalytics = () => {
  // 🌍 **Users by Country Data**
  const countryData = [
    { name: "USA", users: "35K", percentage: "40%", revenue: "$120K", entrances: "25K", bounceRate: "32%", exits: "12K", flag: usaFlag },
    { name: "PK", users: "25K", percentage: "28%", revenue: "$90K", entrances: "18K", bounceRate: "28%", exits: "9K", flag: ukFlag },
    { name: "India", users: "15K", percentage: "17%", revenue: "$45K", entrances: "12K", bounceRate: "35%", exits: "6K", flag: indiaFlag },
    { name: "Germany", users: "10K", percentage: "10%", revenue: "$35K", entrances: "8K", bounceRate: "30%", exits: "4K", flag: germanyFlag },
    { name: "Canada", users: "8K", percentage: "8%", revenue: "$28K", entrances: "6K", bounceRate: "25%", exits: "3K", flag: canadaFlag },
    { name: "Australia", users: "7K", percentage: "7%", revenue: "$25K", entrances: "5K", bounceRate: "20%", exits: "2K", flag: australiaFlag },
  ];

  // 📊 **Acquisition Data**
  const acquisitionData = [
    { source: "Search Engines", value: "45%", color: "#4CAF50"},
    { source: "Social Networks", value: "25%", color: "#2196F3"},
    { source: "Referrals", value: "18%", color: "#FF9800" },
    { source: "Direct", value: "12%", color: "#9C27B0" },
  ];

  // ⏳ **Sessions Data**
  const sessionsData = [
    { type: "New Visitors", value: "60%", color: "#3F51B5"},
    { type: "Returning Visitors", value: "40%", color: "#E91E63" },
    { type: "Bounced", value: "0%", color: "#3b0316"},
  ];

  return (
    <div className="analytics-container">
      {/* 🌍 Users by Country Table */}
      <div className="countries-section">
        <h3>🌍 Users by Country</h3>
        <table className="country-table">
          <thead>
            <tr>
              <th>Flag</th>
              <th>Country</th>
              <th>Users</th>
              <th>Revenue</th>
              <th>Entrances</th>
              <th>Bounce Rate</th>
              <th>Exits</th>
            </tr>
          </thead>
          <tbody>
            {countryData.map((country, index) => (
              <tr key={index}>
                <td><img src={country.flag} alt={country.name} className="flag-icon" /></td>
                <td>{country.name}</td>
                <td>{country.users} ({country.percentage})</td>
                <td>{country.revenue}</td>
                <td>{country.entrances}</td>
                <td className="bounce-rate">{country.bounceRate}</td>
                <td className="exits">{country.exits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📊 Acquisition & Sessions Boxes */}
      <div className="analytics-sidebar">
        {/* 🔍 **Acquisition Sources** */}
        <div className="analytics-box">
          <h4>📊 Acquisition</h4>
          {acquisitionData.map((item, index) => (
            <div key={index} className="analytics-item">
              <span className="indicator" style={{ background: item.color }}></span>
              <span className="text-left">{item.source}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>

        {/* ⏳ **Sessions Data** */}
        <div className="analytics-box">
          <h4>⏳ Sessions</h4>
          {sessionsData.map((item, index) => (
            <div key={index} className="analytics-item">
              <span className="indicator" style={{ background: item.color }}></span>
              <span className="text-left">{item.type}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserAnalytics;
