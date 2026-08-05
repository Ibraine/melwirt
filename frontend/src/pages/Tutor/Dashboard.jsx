import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import WelcomeBox from "../../components/WelcomeBox";
import "../../styles/dashboard.css";

import coursesImg from "../../assets/courses.png";
import enrollStudentImg from "../../assets/enroll student.png";

import { fetchTutorDashboard } from "../../api/tutorDashboardAPI";

const BASE_URL = "http://127.0.0.1:8000";

const TutorDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTutorDashboard()
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;
  if (!stats) return <p style={{ padding: 20 }}>No data available</p>;

  /* ================= SORT CLASSES ================= */
  const regularClasses = [...(stats.regular_classes || [])].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const demoClasses = [...(stats.demo_classes || [])].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  /* ================= IMAGE HANDLER ================= */
  const getImage = (img) => {
    if (!img) return "/course-placeholder.png";
    return img.startsWith("http") ? img : `${BASE_URL}${img}`;
  };

  return (
    <div className="dashboard-layout admin-dashboard">
      <Sidebar role="tutor" />

      <div className="main-content">
        <Header role="tutor" />
        <WelcomeBox role="tutor" />

        {/* ================= FIGMA COUNTER CARDS ================= */}
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <img src={coursesImg} alt="Courses" />
            <h4>Courses</h4>
            <p>{stats.total_courses || 0}</p>
          </div>

          <div className="dashboard-card">
            <img src={enrollStudentImg} alt="Upcoming Classes" />
            <h4>Upcoming Classes</h4>
            <p>{regularClasses.length + demoClasses.length}</p>
          </div>
        </div>

        {/* ================= UPCOMING REGULAR ================= */}
        <div className="dashboard-section">
          <h3>Upcoming Regular Classes</h3>

          {regularClasses.length === 0 && (
            <p>No upcoming regular classes</p>
          )}

          {regularClasses.slice(0, 3).map((cls) => (
            <div className="upcoming-card" key={cls.id}>
              <img
                src={getImage(cls.course_image)}
                alt={cls.course_name}
              />

              <div className="upcoming-info">
                <h4>{cls.course_name}</h4>
                <p>
                  <strong>Date:</strong> {cls.date}
                </p>
                <p>
                  <strong>Time:</strong>{" "}
                  {cls.start_time} – {cls.end_time}
                </p>

                {cls.meet_link && (
                  <a
                    href={cls.meet_link}
                    target="_blank"
                    rel="noreferrer"
                    className="join-btn"
                  >
                    Join Class
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ================= UPCOMING DEMO ================= */}
        <div className="dashboard-section">
          <h3>Upcoming Demo Classes</h3>

          {demoClasses.length === 0 && <p>No demo classes</p>}

          {demoClasses.slice(0, 3).map((cls) => (
            <div className="upcoming-card demo" key={cls.id}>
              <img
                src={getImage(cls.course_image)}
                alt={cls.course_name}
              />

              <div className="upcoming-info">
                <h4>{cls.course_name} (Demo)</h4>
                <p>
                  <strong>Date:</strong> {cls.date}
                </p>
                <p>
                  <strong>Time:</strong>{" "}
                  {cls.start_time} – {cls.end_time}
                </p>

                {cls.meet_link && (
                  <a
                    href={cls.meet_link}
                    target="_blank"
                    rel="noreferrer"
                    className="join-btn"
                  >
                    Join Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;
