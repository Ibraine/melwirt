import React from "react";

const DashboardCard = ({ title, value, icon: Icon, tone = "blue" }) => {
  return (
    <article className={`dashboard-card dashboard-card-${tone}`}>
      <div className="dashboard-card-topline">
        <span className="dashboard-card-icon" aria-hidden="true">
          <Icon size={22} strokeWidth={1.8} />
        </span>
        <span className="dashboard-card-label">{title}</span>
      </div>
      <strong className="dashboard-card-value">{value}</strong>
    </article>
  );
};

export default DashboardCard;
