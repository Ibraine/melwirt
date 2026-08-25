// import React, { useEffect, useState } from "react";
// import Sidebar from "../../components/Sidebar";
// import Header from "../../components/Header";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import "../../styles/myclasses.css";

// import {
//   fetchTutorUpcoming,
//   fetchTutorPast,
// } from "../../api/scheduleAPI";

// import AddSlot from "./AddSlot";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const TutorMyClasses = () => {
//   const [mainTab, setMainTab] = useState("regular");
//   const [subTab, setSubTab] = useState("upcoming");
//   const [classes, setClasses] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showAddSlot, setShowAddSlot] = useState(false);

//   /* ===============================
//      ✅ SUCCESS MESSAGE (WORKING)
//   =============================== */
//   useEffect(() => {
//     if (localStorage.getItem("slot_success")) {
//       toast.success("Slot created successfully 🎉");
//       localStorage.removeItem("slot_success");
//     }
//   }, []);

//   /* ===============================
//      ✅ LOAD CLASSES (DATE FIXED)
//   =============================== */
//   const loadClasses = async () => {
//     setLoading(true);
//     try {
//       let data = [];

//       data =
//         subTab === "upcoming"
//           ? await fetchTutorUpcoming()
//           : await fetchTutorPast();

//       // demo / regular filter
//       data =
//         mainTab === "demo"
//           ? data.filter(c => c.is_demo)
//           : data.filter(c => !c.is_demo);

//       // 🔥 DATE FILTER (REAL FIX)
//       if (selectedDate) {
//         const sel = new Date(selectedDate);

//         data = data.filter(c => {
//           const cd = new Date(c.date);
//           return (
//             cd.getFullYear() === sel.getFullYear() &&
//             cd.getMonth() === sel.getMonth() &&
//             cd.getDate() === sel.getDate()
//           );
//         });
//       }

//       setClasses(data);
//     } catch (err) {
//       toast.error("Failed to load classes");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadClasses();
//   }, [mainTab, subTab, selectedDate]);

//   return (
//     <div className="dashboard-layout">
//       <Sidebar role="tutor" />

//       <div className="main-content">
//         <Header />

//         {/* ================= HEADER ================= */}
//         <div className="tab-header">
//           <h2>My Classes</h2>

//           <div className="tabs">
//             <button
//               className={mainTab === "regular" ? "active" : ""}
//               onClick={() => setMainTab("regular")}
//             >
//               Regular
//             </button>
//             <button
//               className={mainTab === "demo" ? "active" : ""}
//               onClick={() => setMainTab("demo")}
//             >
//               Demo
//             </button>
//           </div>

//           <button
//             className="add-slot-btn"
//             onClick={() => setShowAddSlot(true)}
//           >
//             + Add Slot
//           </button>
//         </div>

//         {/* ================= SUB TABS ================= */}
//         <div className="tab-header">
//           <div className="tabs">
//             <button
//               className={subTab === "upcoming" ? "active" : ""}
//               onClick={() => setSubTab("upcoming")}
//             >
//               Upcoming
//             </button>
//             <button
//               className={subTab === "past" ? "active" : ""}
//               onClick={() => setSubTab("past")}
//             >
//               Past
//             </button>
//           </div>
//         </div>

//         {/* ================= CONTENT ================= */}
//         <div className="classes-wrapper">
//           <div className="classes-section">
//             {loading ? (
//               <p>Loading...</p>
//             ) : classes.length === 0 ? (
//               <p>No classes found</p>
//             ) : (
//               classes.map(c => {
//                 // 🔥 PAST CHECK WITH TIME
//                 const classDateTime = new Date(
//                   `${c.date}T${c.start_time}`
//                 );
//                 const isPast = classDateTime < new Date();

//                 return (
//                   <div key={c.id} className="class-card">
//                     <div className="class-info">
//                       <h4>{c.course_title}</h4>

//                       <span
//                         className={`status-dot ${
//                           isPast ? "red" : "green"
//                         }`}
//                       />

//                       {c.is_demo && (
//                         <span className="demo-label">Demo</span>
//                       )}

//                       <p><strong>Date:</strong> {c.date}</p>
//                       <p>
//                         <strong>Time:</strong>{" "}
//                         {c.start_time} - {c.end_time}
//                       </p>
//                     </div>

//                     {!isPast ? (
//                       <a
//                         href={c.meet_link || "#"}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="join-btn"
//                       >
//                         Join
//                       </a>
//                     ) : (
//                       <span className="past-label">Class Ended</span>
//                     )}
//                   </div>
//                 );
//               })
//             )}
//           </div>

//           {/* ================= CALENDAR ================= */}
//           <div className="calendar-section">
//             <Calendar
//               value={selectedDate}
//               onChange={(date) => {
//                 setSelectedDate(date);
//                 setSubTab("upcoming");
//               }}
//               tileContent={({ date, view }) => {
//                 if (view !== "month") return null;

//                 const hasSlot = classes.some(c => {
//                   const cd = new Date(c.date);
//                   return (
//                     cd.getFullYear() === date.getFullYear() &&
//                     cd.getMonth() === date.getMonth() &&
//                     cd.getDate() === date.getDate()
//                   );
//                 });

//                 return hasSlot ? <div className="calendar-dot" /> : null;
//               }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* ================= ADD SLOT MODAL ================= */}
//       {showAddSlot && (
//         <div className="modal-overlay">
//           <div className="modal-box">
//             <AddSlot onClose={() => setShowAddSlot(false)} />
//             <button
//               className="close-btn"
//               onClick={() => setShowAddSlot(false)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// };

// export default TutorMyClasses;
   


import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/myclasses.css";

import {
  fetchTutorUpcoming,
  fetchTutorPast,
} from "../../api/scheduleAPI";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Default Fallback Image
import defaultCourseImg from "../../assets/robotics automation.png";

const TutorMyClasses = () => {
  const [mainTab, setMainTab] = useState("regular");
  const [subTab, setSubTab] = useState("upcoming");
  const [classes, setClasses] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);

  /* Load classes for Tutor */
  const loadClasses = async () => {
    setLoading(true);
    try {
      let data = [];

      data =
        subTab === "upcoming"
          ? await fetchTutorUpcoming()
          : await fetchTutorPast();

      // Demo / Regular filter
      data =
        mainTab === "demo"
          ? data.filter((c) => c.is_demo)
          : data.filter((c) => !c.is_demo);

      // Date Filter
      if (selectedDate) {
        const sel = new Date(selectedDate);

        data = data.filter((c) => {
          const cd = new Date(c.date);
          return (
            cd.getFullYear() === sel.getFullYear() &&
            cd.getMonth() === sel.getMonth() &&
            cd.getDate() === sel.getDate()
          );
        });
      }

      setClasses(data);
    } catch (err) {
      toast.error("Failed to load classes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClasses();
  }, [mainTab, subTab, selectedDate]);

  // 🔹 Smart Image URL Handler (Prevents Broken Links)
  const getCourseImage = (slot) => {
    const imgPath = slot?.course_image || slot?.image || slot?.course?.image;
    if (!imgPath) return defaultCourseImg;

    if (imgPath.startsWith("http://") || imgPath.startsWith("https://")) {
      return imgPath;
    }

    return `https://api.melwirt.com${imgPath.startsWith("/") ? "" : "/"}${imgPath}`;
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar with auto role */}
      <Sidebar role="tutor" />

      {/* Main Content Wrapper */}
      <div className="main-content">
        <Header />

        <div className="my-classes-container">
          
          {/* Header Row (No Add Slot button for Tutor) */}
          <div className="page-header-row">
            <div>
              <h2 className="page-title">My Classes</h2>
              <p className="page-sub">View and join your scheduled regular and demo sessions</p>
            </div>

            {/* Main Tabs (Regular / Demo) */}
            <div className="top-controls-group">
              <div className="main-tabs-capsule">
                <button
                  className={mainTab === "regular" ? "active" : ""}
                  onClick={() => setMainTab("regular")}
                >
                  Regular
                </button>
                <button
                  className={mainTab === "demo" ? "active" : ""}
                  onClick={() => setMainTab("demo")}
                >
                  Demo
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

            {selectedDate && (
              <button
                className="reset-date-btn"
                onClick={() => setSelectedDate(null)}
              >
                Clear Date Filter ✕
              </button>
            )}
          </div>

          {/* Main Classes + Calendar Grid */}
          <div className="classes-wrapper">
            
            {/* Class Cards List */}
            <div className="classes-section">
              {loading ? (
                <div className="loading-state-card">
                  <p>Loading scheduled classes...</p>
                </div>
              ) : classes.length === 0 ? (
                <div className="empty-state-card">
                  <p>No classes found for this filter</p>
                </div>
              ) : (
                classes.map((c) => {
                  const classDateTime = new Date(`${c.date}T${c.start_time}`);
                  const isPast = classDateTime < new Date();

                  return (
                    <div key={c.id} className="class-card">
                      
                      {/* Fixed Size Image Box */}
                      <div className="course-thumb-box">
                        <img
                          src={getCourseImage(c)}
                          alt={c.course_title || "Course"}
                          className="course-thumb"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = defaultCourseImg;
                          }}
                        />
                      </div>

                      {/* Class Details Info */}
                      <div className="class-info">
                        <div className="title-row">
                          <h4 className="class-title">{c.course_title || "Untitled Course"}</h4>
                          {c.is_demo && (
                            <span className="demo-badge">Demo Class</span>
                          )}
                        </div>

                        <div className="details-grid">
                          <div className="detail-row">
                            <span className="label">Student:</span>
                            <span className="val">{c.student_name || "Not Assigned"}</span>
                          </div>
                          <div className="detail-row">
                            <span className="label">Date:</span>
                            <span className="val">{c.date}</span>
                          </div>
                          <div className="detail-row">
                            <span className="label">Time:</span>
                            <span className="val">{c.start_time} - {c.end_time}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="card-action">
                        {!isPast ? (
                          <a
                            href={c.meet_link || "#"}
                            target="_blank"
                            rel="noreferrer"
                            className="join-btn"
                          >
                            Join Class
                          </a>
                        ) : (
                          <span className="past-badge">Class Ended</span>
                        )}
                      </div>

                    </div>
                  );
                })
              )}
            </div>

            {/* Right Side Calendar Section */}
            <div className="calendar-section-card">
              <div className="calendar-header">
                <h6>Filter by Date</h6>
              </div>
              <Calendar
                value={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setSubTab("upcoming");
                }}
                tileContent={({ date, view }) => {
                  if (view !== "month") return null;

                  const hasSlot = classes.some((c) => {
                    const cd = new Date(c.date);
                    return (
                      cd.getFullYear() === date.getFullYear() &&
                      cd.getMonth() === date.getMonth() &&
                      cd.getDate() === date.getDate()
                    );
                  });

                  return hasSlot ? <div className="calendar-dot" /> : null;
                }}
              />
            </div>

          </div>

        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default TutorMyClasses;