// import React, { useEffect, useState } from "react";
// import Sidebar from "../../components/Sidebar";
// import Header from "../../components/Header";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import "../../styles/myclasses.css";

// import {
//   fetchAdminUpcoming,
//   fetchAdminPast,
// } from "../../api/scheduleAPI";

// import AdminAddSlot from "./AdminAddSlot";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// /* ✅ NAME CHANGED */
// const AdminMyClasses = () => {
//   const [mainTab, setMainTab] = useState("regular");
//   const [subTab, setSubTab] = useState("upcoming");
//   const [classes, setClasses] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showAddSlot, setShowAddSlot] = useState(false);

//   useEffect(() => {
//     if (localStorage.getItem("slot_success")) {
//       toast.success("Slot created successfully 🎉");
//       localStorage.removeItem("slot_success");
//     }
//   }, []);

//   const loadClasses = async () => {
//     setLoading(true);
//     try {
//       let data = [];

//       data =
//         subTab === "upcoming"
//           ? await fetchAdminUpcoming()
//           : await fetchAdminPast();

//       data =
//         mainTab === "demo"
//           ? data.filter(c => c.is_demo)
//           : data.filter(c => !c.is_demo);

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

//       {/* ✅ SIDEBAR FIX */}
//       <Sidebar role="admin" />

//       <div className="main-content">
//         <Header />

//         {/* HEADER */}
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

//         {/* SUB TABS */}
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

//         {/* CONTENT */}
//         <div className="classes-wrapper">
//           <div className="classes-section">
//             {loading ? (
//               <p>Loading...</p>
//             ) : classes.length === 0 ? (
//               <p>No classes found</p>
//             ) : (
//               classes.map(slot => {

//                 const classDateTime = new Date(
//                   `${slot.date}T${slot.start_time}`
//                 );

//                 const isPast = classDateTime < new Date();

//                 return (
//                   <div key={slot.id} className="class-card admin-card">

//                     {/* ✅ COURSE IMAGE */}
//                     <img
//                       src={
//                         slot.course_image
//                           ? `http://localhost:8000${slot.course_image}`
//                           : "/default-course.png"
//                       }
//                       alt="course"
//                       className="course-thumb"
//                     />

//                     <div className="class-info">

//                       <h4>{slot.course_title}</h4>

//                       <p>
//                         <strong>Tutor:</strong>{" "}
//                         {slot.tutor_name || "Not Assigned"}
//                       </p>

//                       <p>
//                         <strong>Student:</strong>{" "}
//                         {slot.student_name || "Not Assigned"}
//                       </p>

//                       <p>
//                         <strong>Date:</strong> {slot.date}
//                       </p>

//                       <p>
//                         <strong>Time:</strong>{" "}
//                         {slot.start_time} - {slot.end_time}
//                       </p>

//                       {slot.is_demo && (
//                         <span className="demo-label">
//                           Demo Class
//                         </span>
//                       )}
//                     </div>

//                     {!isPast ? (
//                       <a
//                         href={slot.meet_link || "#"}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="join-btn"
//                       >
//                         Join
//                       </a>
//                     ) : (
//                       <span className="past-label">
//                         Class Ended
//                       </span>
//                     )}
//                   </div>
//                 );
//               })
//             )}
//           </div>

//           {/* CALENDAR */}
//           <div className="calendar-section">
//             <Calendar
//               value={selectedDate}
//               onChange={(date) => {
//                 setSelectedDate(date);
//                 setSubTab("upcoming");
//               }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* ADD SLOT */}
//       {showAddSlot && (
//         <div className="modal-overlay">
//           <div className="modal-box">
//             <AdminAddSlot onClose={() => setShowAddSlot(false)} />
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

// export default AdminMyClasses;



import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/myclasses.css";

import {
  fetchAdminUpcoming,
  fetchAdminPast,
} from "../../api/scheduleAPI";

import AdminAddSlot from "./AdminAddSlot";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Default Fallback Image
import defaultCourseImg from "../../assets/robotics automation.png";
import { Plus, X } from "lucide-react";

const AdminMyClasses = () => {
  const [mainTab, setMainTab] = useState("regular");
  const [subTab, setSubTab] = useState("upcoming");
  const [classes, setClasses] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAddSlot, setShowAddSlot] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("slot_success")) {
      toast.success("Slot created successfully 🎉");
      localStorage.removeItem("slot_success");
    }
  }, []);

  const loadClasses = async () => {
    setLoading(true);
    try {
      let data = [];

      data =
        subTab === "upcoming"
          ? await fetchAdminUpcoming()
          : await fetchAdminPast();

      data =
        mainTab === "demo"
          ? data.filter((c) => c.is_demo)
          : data.filter((c) => !c.is_demo);

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

  // 🔹 FIX: Smart Image URL Handler (Prevents Double Domain & Broken Links)
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
      {/* Sidebar */}
      <Sidebar role="admin" />

      {/* Main Content Wrapper (Fixed Sidebar Offset) */}
      <div className="main-content">
        <Header />

        <div className="my-classes-container">
          
          {/* Top Title & Main Controls Header */}
          <div className="page-header-row">
            <div>
              <h2 className="page-title">My Classes</h2>
              <p className="page-sub">Manage regular and demo schedule slots</p>
            </div>

            {/* Main Tabs (Regular / Demo) & Add Slot */}
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

              <button
                className="add-slot-btn"
                onClick={() => setShowAddSlot(true)}
              >
                <Plus size={16} strokeWidth={2} /> Add Slot
              </button>
            </div>
          </div>

          {/* Sub Tabs Header (Upcoming / Past) */}
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
                <X size={15} strokeWidth={2} /> Clear Date Filter
              </button>
            )}
          </div>

          {/* Main Classes + Calendar Grid */}
          <div className="classes-wrapper">
            
            {/* Class Cards Section */}
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
                classes.map((slot) => {
                  const classDateTime = new Date(
                    `${slot.date}T${slot.start_time}`
                  );
                  const isPast = classDateTime < new Date();

                  return (
                    <div key={slot.id} className="class-card">
                      
                      {/* Fixed Size Image Box */}
                      <div className="course-thumb-box">
                        <img
                          src={getCourseImage(slot)}
                          alt={slot.course_title || "Course"}
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
                          <h4 className="class-title">{slot.course_title || "Untitled Course"}</h4>
                          {slot.is_demo && (
                            <span className="demo-badge">Demo Class</span>
                          )}
                        </div>

                        <div className="details-grid">
                          <div className="detail-row">
                            <span className="label">Tutor:</span>
                            <span className="val">{slot.tutor_name || "Not Assigned"}</span>
                          </div>
                          <div className="detail-row">
                            <span className="label">Student:</span>
                            <span className="val">{slot.student_name || "Not Assigned"}</span>
                          </div>
                          <div className="detail-row">
                            <span className="label">Date:</span>
                            <span className="val">{slot.date}</span>
                          </div>
                          <div className="detail-row">
                            <span className="label">Time:</span>
                            <span className="val">{slot.start_time} - {slot.end_time}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Button / Past Tag */}
                      <div className="card-action">
                        {!isPast ? (
                          <a
                            href={slot.meet_link || "#"}
                            target="_blank"
                            rel="noreferrer"
                            className="join-btn"
                          >
                            Join Class
                          </a>
                        ) : (
                          <span className="past-badge">
                            Class Ended
                          </span>
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
              />
            </div>

          </div>

        </div>
      </div>

      {/* Add Slot Modal */}
      {showAddSlot && (
        <div className="modal-overlay" onClick={() => setShowAddSlot(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <AdminAddSlot onClose={() => setShowAddSlot(false)} />
            <button
              className="close-btn"
              onClick={() => setShowAddSlot(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminMyClasses;