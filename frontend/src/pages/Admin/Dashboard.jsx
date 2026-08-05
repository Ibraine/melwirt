import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import WelcomeBox from "../../components/WelcomeBox";
import DashboardCard from "../../components/DashboardCard";
import { getDashboardStats } from "../../api/adminPanelAPI";

import activeUserImg from "../../assets/active user.png";
import enrollStudentImg from "../../assets/enroll student.png";
import totalTeacherImg from "../../assets/total teacher.png";
import totalStudentImg from "../../assets/total student.png";

import "../../styles/dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    active_users: 0,
    total_users: 0,
    total_students: 0,
    total_tutors: 0,
    total_bookings: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // JWT token fetch
        if (!token) {
          console.error("Token missing, please login again");
          return;
        }

        const data = await getDashboardStats(token); // pass token to API
        if (data) setStats(data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 admin-dashboard">
        <Header />
        <div className="container mt-4">
          <WelcomeBox />
          <div className="dashboard-cards">
            <DashboardCard
              title="Active Users"
              value={stats.active_users}
              image={activeUserImg}
            />
            <DashboardCard
              title="Total Users"
              value={stats.total_users}
              image={totalStudentImg}
            />
            <DashboardCard
              title="Total Students"
              value={stats.total_students}
              image={enrollStudentImg}
            />
            <DashboardCard
              title="Total Tutors"
              value={stats.total_tutors}
              image={totalTeacherImg}
            />
            <DashboardCard
              title="Total Bookings"
              value={stats.total_bookings}
              image={totalStudentImg}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
