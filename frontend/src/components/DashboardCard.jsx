import React from "react";

const DashboardCard = ({ title, value, image }) => {
  return (
    <div className="dashboard-card">
      <img src={image} alt={title} className="card-icon" />
      <h6>{title}</h6>
      <h3>{value}</h3>
    </div>
  );
};

export default DashboardCard;
