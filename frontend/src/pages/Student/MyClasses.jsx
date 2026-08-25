// import React, { useState, useEffect } from "react";
// import Sidebar from "../../components/Sidebar";
// import Header from "../../components/Header";
// import "../../styles/myclasses.css";
// // import { fetchSchedules } from "../../api/scheduleAPI";
// import { fetchAdminSchedules } from "../../api/scheduleAPI";
// const StudentMyClasses = () => {
//   const [activeTab, setActiveTab] = useState("regular"); // regular | demo
//   const [subTab, setSubTab] = useState("upcoming"); // upcoming | past
//   const [classes, setClasses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchClasses = async () => {
//     setLoading(true);
//     try {
//       const params = {
//         is_demo: activeTab === "demo",
//       };
//       const data = await fetchAdminSchedules(params);
//       // Filter upcoming/past
//       const now = new Date();
//       const filtered = data.filter((cls) => {
//         const clsDate = new Date(cls.date + "T" + cls.start_time);
//         return subTab === "upcoming" ? clsDate >= now : clsDate < now;
//       });

//       setClasses(filtered);
//     } catch (err) {
//       console.error("Error fetching classes:", err);
//       setClasses([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchClasses();
//   }, [activeTab, subTab]);

//   return (
//     <div className="dashboard-layout">
//       <Sidebar role="student" />
//       <div className="main-content">
//         <Header />

//         {/* PAGE TITLE */}
//         <div className="tab-header">
//           <h2>My Classes</h2>

//           {/* Main Tabs */}
//           <div className="tabs-container">
//             <button
//               className={`tab ${activeTab === "regular" ? "active" : ""}`}
//               onClick={() => setActiveTab("regular")}
//             >
//               Regular Classes
//             </button>
//             <button
//               className={`tab ${activeTab === "demo" ? "active" : ""}`}
//               onClick={() => setActiveTab("demo")}
//             >
//               Demo Classes
//             </button>
//           </div>

//           {/* Sub Tabs */}
//           <div className="tabs-container sub-tabs">
//             <button
//               className={`tab ${subTab === "upcoming" ? "active" : ""}`}
//               onClick={() => setSubTab("upcoming")}
//             >
//               Upcoming
//             </button>
//             <button
//               className={`tab ${subTab === "past" ? "active" : ""}`}
//               onClick={() => setSubTab("past")}
//             >
//               Past
//             </button>
//           </div>
//         </div>

//         {/* Classes List */}
//         <div className="classes-section">
//           {loading ? (
//             <p>Loading classes...</p>
//           ) : classes.length > 0 ? (
//             classes.map((cls) => {
//               const classDateTime = new Date(`${cls.date}T${cls.start_time}`);
//               const isPast = classDateTime < new Date();

//               return (
//                 <div key={cls.id} className="class-card">
//                   <img
//                     src={cls.course_image || "/default-course.png"}
//                     alt={cls.course_title}
//                     className="class-image"
//                   />
//                   <div className="class-info">
//                     <h4>{cls.course_title}</h4>
//                     <span className="instructor-badge">
//                       {cls.tutor_detail?.name || "Tutor"}
//                     </span>

//                     <p>
//                       <strong>Module:</strong> {cls.module_title || "-"}
//                     </p>
//                     <p>
//                       <strong>Session:</strong> {cls.session_title || "-"}
//                     </p>

//                     <div className="class-timings">
//                       <p>
//                         <strong>Class Date:</strong> {cls.date}
//                       </p>
//                       <p>
//                         <strong>Class Timing:</strong> {cls.start_time} -{" "}
//                         {cls.end_time}
//                       </p>
//                     </div>
//                   </div>

//                   <button
//                     className="join-btn"
//                     disabled={!cls.meet_link}
//                     onClick={() => cls.meet_link && window.open(cls.meet_link, "_blank")}
//                   >
//                     {subTab === "past" ? "View Recordings" : "Join Class"}
//                   </button>
//                 </div>
//               );
//             })
//           ) : (
//             <p>No classes found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentMyClasses;



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // ✅ ADDED
// import Sidebar from "../../components/Sidebar";
// import Header from "../../components/Header";
// import "../../styles/myclasses.css";

// import {
//   fetchSchedules,
// } from "../../api/scheduleAPI";

// const StudentMyClasses = () => {
//   const navigate = useNavigate(); // ✅ ADDED

//   const [activeTab, setActiveTab] = useState("regular");
//   const [subTab, setSubTab] = useState("upcoming");
//   const [classes, setClasses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ===============================
//   // FETCH CLASSES
//   // ===============================
//   const fetchClasses = async () => {
//     setLoading(true);

//     try {
//       const params = {
//         is_demo: activeTab === "demo",
//       };

//       const data = await fetchSchedules(params);

//       const now = new Date();

//       const filtered = data.filter((cls) => {
//         const clsDate = new Date(
//           cls.date + "T" + cls.start_time
//         );

//         return subTab === "upcoming"
//           ? clsDate >= now
//           : clsDate < now;
//       });

//       setClasses(filtered);
//     } catch (err) {
//       console.error("Error fetching classes:", err);
//       setClasses([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchClasses();
//   }, [activeTab, subTab]);

//   return (
//     <div className="dashboard-layout">
//       <Sidebar role="student" />

//       <div className="main-content">
//         <Header />

//         {/* HEADER */}
//         <div className="tab-header">
//           <h2>My Classes</h2>

//           {/* MAIN TABS */}
//           <div className="tabs-container">
//             <button
//               className={`tab ${
//                 activeTab === "regular" ? "active" : ""
//               }`}
//               onClick={() => setActiveTab("regular")}
//             >
//               Regular Classes
//             </button>

//             <button
//               className={`tab ${
//                 activeTab === "demo" ? "active" : ""
//               }`}
//               onClick={() => setActiveTab("demo")}
//             >
//               Demo Classes
//             </button>
//           </div>

//           {/* SUB TABS */}
//           <div className="tabs-container sub-tabs">
//             <button
//               className={`tab ${
//                 subTab === "upcoming" ? "active" : ""
//               }`}
//               onClick={() => setSubTab("upcoming")}
//             >
//               Upcoming
//             </button>

//             <button
//               className={`tab ${
//                 subTab === "past" ? "active" : ""
//               }`}
//               onClick={() => setSubTab("past")}
//             >
//               Past
//             </button>
//           </div>
//         </div>

//         {/* ===============================
//             CLASSES LIST
//         =============================== */}
//         <div className="classes-section">
//           {loading ? (
//             <p>Loading classes...</p>
//           ) : classes.length > 0 ? (
//             classes.map((cls) => (
//               <div key={cls.id} className="class-card">
//                 <img
//                   src={cls.course_image || "/default-course.png"}
//                   alt={cls.course_title}
//                   className="class-image"
//                 />

//                 <div className="class-info">
//                   <h4>{cls.course_title}</h4>

//                   <span className="instructor-badge">
//                     {cls.tutor_detail?.name || "Tutor"}
//                   </span>

//                   <p>
//                     <strong>Module:</strong>{" "}
//                     {cls.module_title || "-"}
//                   </p>

//                   <p>
//                     <strong>Session:</strong>{" "}
//                     {cls.session_title || "-"}
//                   </p>

//                   <div className="class-timings">
//                     <p>
//                       <strong>Date:</strong> {cls.date}
//                     </p>

//                     <p>
//                       <strong>Timing:</strong>{" "}
//                       {cls.start_time} - {cls.end_time}
//                     </p>
//                   </div>
//                 </div>

//                 {/* JOIN BUTTON */}
//                 <button
//                   className="join-btn"
//                   disabled={!cls.meet_link}
//                   onClick={() =>
//                     cls.meet_link &&
//                     window.open(cls.meet_link, "_blank")
//                   }
//                 >
//                   {subTab === "past"
//                     ? "View Recordings"
//                     : "Join Class"}
//                 </button>

//                 {/* ✅ NEW RESCHEDULE NAVIGATION */}
//                 {subTab === "upcoming" && (
//                   <button
//                     className="reschedule-btn"
//                     onClick={() =>
//                       navigate(
//                         `/student/reschedule/${cls.id}`
//                       )
//                     }
//                   >
//                     Reschedule
//                   </button>
//                 )}
//               </div>
//             ))
//           ) : (
//             <p>No classes found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentMyClasses;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../../styles/myclasses.css";

import { fetchSchedules } from "../../api/scheduleAPI";

// Default Fallback Image
import defaultCourseImg from "../../assets/robotics automation.png";

const StudentMyClasses = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("regular");
  const [subTab, setSubTab] = useState("upcoming");
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH CLASSES
  const fetchClasses = async () => {
    setLoading(true);

    try {
      const params = {
        is_demo: activeTab === "demo",
      };

      const data = await fetchSchedules(params);
      const now = new Date();

      const filtered = data.filter((cls) => {
        const clsDate = new Date(cls.date + "T" + cls.start_time);
        return subTab === "upcoming" ? clsDate >= now : clsDate < now;
      });

      setClasses(filtered);
    } catch (err) {
      console.error("Error fetching classes:", err);
      setClasses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [activeTab, subTab]);

  // 🔹 Smart Image URL Handler (Prevents Broken Images)
  const getCourseImage = (cls) => {
    const imgPath = cls?.course_image || cls?.image || cls?.course?.image;
    if (!imgPath) return defaultCourseImg;

    if (imgPath.startsWith("http://") || imgPath.startsWith("https://")) {
      return imgPath;
    }

    return `https://api.melwirt.com${imgPath.startsWith("/") ? "" : "/"}${imgPath}`;
  };

  return (
    <div className="dashboard-layout">
      <Sidebar role="student" />

      <div className="main-content">
        <Header />

        <div className="my-classes-container">
          
          {/* Page Header & Main Controls Row */}
          <div className="page-header-row">
            <div>
              <h2 className="page-title">My Classes</h2>
              <p className="page-sub">Access your live classes, recordings, and schedules</p>
            </div>

            {/* Main Tabs Capsule (Regular / Demo) */}
            <div className="top-controls-group">
              <div className="main-tabs-capsule">
                <button
                  className={activeTab === "regular" ? "active" : ""}
                  onClick={() => setActiveTab("regular")}
                >
                  Regular Classes
                </button>
                <button
                  className={activeTab === "demo" ? "active" : ""}
                  onClick={() => setActiveTab("demo")}
                >
                  Demo Classes
                </button>
              </div>
            </div>
          </div>

          {/* Sub Tabs Row (Upcoming / Past) */}
          <div className="sub-tabs-row">
            <div className="sub-tabs-group">
              <button
                className={subTab === "upcoming" ? "active" : ""}
                onClick={() => setSubTab("upcoming")}
              >
                Upcoming
              </button>
              <button
                className={subTab === "past" ? "active" : ""}
                onClick={() => setSubTab("past")}
              >
                Past
              </button>
            </div>
          </div>

          {/* Classes Cards List */}
          <div className="classes-section">
            {loading ? (
              <div className="loading-state-card">
                <p>Loading your classes...</p>
              </div>
            ) : classes.length > 0 ? (
              classes.map((cls) => (
                <div key={cls.id} className="class-card">
                  
                  {/* Fixed Size Course Image */}
                  <div className="course-thumb-box">
                    <img
                      src={getCourseImage(cls)}
                      alt={cls.course_title || "Course"}
                      className="course-thumb"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultCourseImg;
                      }}
                    />
                  </div>

                  {/* Class Info */}
                  <div className="class-info">
                    <div className="title-row">
                      <h4 className="class-title">{cls.course_title || "Untitled Course"}</h4>
                      {activeTab === "demo" && (
                        <span className="demo-badge">Demo Class</span>
                      )}
                    </div>

                    <div className="details-grid">
                      <div className="detail-row">
                        <span className="label">Instructor:</span>
                        <span className="val">{cls.tutor_detail?.name || "Tutor"}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Module:</span>
                        <span className="val">{cls.module_title || "-"}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Session:</span>
                        <span className="val">{cls.session_title || "-"}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Date:</span>
                        <span className="val">{cls.date}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Timing:</span>
                        <span className="val">{cls.start_time} - {cls.end_time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons & Conditions */}
                  <div className="card-action">
                    {subTab === "upcoming" ? (
                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="join-btn"
                          disabled={!cls.meet_link}
                          onClick={() =>
                            cls.meet_link && window.open(cls.meet_link, "_blank")
                          }
                        >
                          Join Class
                        </button>

                        <button
                          className="reset-date-btn"
                          style={{ padding: "8px 14px", fontSize: "13px" }}
                          onClick={() =>
                            navigate(`/student/reschedule/${cls.id}`)
                          }
                        >
                          Reschedule
                        </button>
                      </div>
                    ) : (
                      /* PAST TAB CONDITION: Past Demo = Class Ended (NO RECORDING), Past Regular = View Recordings */
                      activeTab === "demo" ? (
                        <span className="past-badge">Class Ended</span>
                      ) : (
                        <button
                          className="join-btn"
                          disabled={!cls.meet_link}
                          onClick={() =>
                            cls.meet_link && window.open(cls.meet_link, "_blank")
                          }
                        >
                          View Recordings
                        </button>
                      )
                    )}
                  </div>

                </div>
              ))
            ) : (
              <div className="empty-state-card">
                <p>No classes found.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentMyClasses;