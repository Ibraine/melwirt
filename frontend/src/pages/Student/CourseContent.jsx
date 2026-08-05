// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Sidebar from "../../components/Sidebar";
// import Header from "../../components/Header";
// import axiosInstance from "../../api/axiosConfig";
// import "../../styles/coursecontent.css";

// const CourseContent = () => {
//   const { courseId } = useParams();
//   const [modules, setModules] = useState([]);

//   useEffect(() => {
//     axiosInstance
//       .get(`/api/courses/${courseId}/content/`)
//       .then((res) => {
//         console.log("MODULES:", res.data);
//         setModules(res.data);
//       })
//       .catch((err) => console.log(err));
//   }, [courseId]);

//   return (
//     <div className="dashboard-container">
//       <Sidebar role="student" />
//       <div className="main-content">
//         <Header title="Course Content" />

//         {modules.map((module) => (
//           <div key={module.id} className="module-card">

//             {/* OPTIONAL: show lock icon for module */}
//             <h3>
//               {module.is_locked ? "🔒 " : "📘 "}
//               {module.title}
//             </h3>

//             {module.sessions.map((session) => {

//               // ✅ USE BACKEND VALUES
//               const isCompleted = session.is_completed;
//               const isLocked = session.is_locked;

//               return (
//                 <div
//                   key={session.id}
//                   className={`session-item ${
//                     isCompleted
//                       ? "completed"
//                       : isLocked
//                       ? "locked"
//                       : "active"
//                   }`}
//                   onClick={() => {
//                     if (!isLocked) {
//                       alert("Open Session: " + session.title);
//                     }
//                   }}
//                 >
//                   {isCompleted ? "✅" : isLocked ? "🔒" : "🔵"}{" "}
//                   {session.title}
//                 </div>
//               );
//             })}

//           </div>
//         ))}

//       </div>
//     </div>
//   );
// };

// export default CourseContent;



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import axiosInstance from "../../api/axiosConfig";
import "../../styles/coursecontent.css";

const CourseContent = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/api/courses/${courseId}/content/`)
      .then((res) => {
        setModules(res.data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [courseId]);

  return (
    <div className="dashboard-container">
      <Sidebar role="student" />
      <div className="main-content">
        <Header />

        <div className="content-page-wrapper">
          {/* Header & Back Button */}
          <div className="content-header-row mb-4">
            <button className="btn-back-link mb-2" onClick={() => navigate("/student/my-courses")}>
              ← Back to My Courses
            </button>
            <h3 className="fw-bold m-0 text-dark">Course Content & Curriculum</h3>
            <p className="text-muted small m-0">Access unlocked modules, video lectures, and practice sessions</p>
          </div>

          {loading ? (
            <div className="loading-state-card">
              <p>Loading course modules...</p>
            </div>
          ) : modules.length === 0 ? (
            <div className="empty-content-card">
              <h5>No Content Available</h5>
              <p className="text-muted m-0">Course curriculum is being updated by the instructor.</p>
            </div>
          ) : (
            <div className="modules-stack">
              {modules.map((module) => (
                <div key={module.id} className="module-card-pro">
                  
                  {/* Module Header */}
                  <div className="module-card-header">
                    <div className="d-flex align-items-center gap-3">
                      <span className={`module-number-badge ${module.is_locked ? "locked" : ""}`}>
                        {module.is_locked ? "🔒 Locked" : `Module ${module.order || "1"}`}
                      </span>
                      <h4 className="module-title-text">
                        {module.title}
                      </h4>
                    </div>
                    <span className="sessions-count-pill">
                      {module.sessions?.length || 0} Sessions
                    </span>
                  </div>

                  {/* Sessions List */}
                  {module.sessions && module.sessions.length > 0 ? (
                    <div className="sessions-container">
                      <h6 className="sessions-section-title">Sessions & Topics:</h6>
                      <div className="sessions-grid">
                        {module.sessions.map((session) => {
                          const isCompleted = session.is_completed;
                          const isLocked = session.is_locked || module.is_locked;

                          return (
                            <div
                              key={session.id}
                              className={`session-item-card ${
                                isCompleted
                                  ? "completed"
                                  : isLocked
                                  ? "locked"
                                  : "active"
                              }`}
                              onClick={() => {
                                if (isLocked) {
                                  alert("🔒 This session is locked. Complete previous sessions first!");
                                } else {
                                  alert("📘 Opening Session: " + session.title);
                                }
                              }}
                            >
                              <div className="session-left">
                                <span className="session-status-icon">
                                  {isCompleted ? "✅" : isLocked ? "🔒" : "📘"}
                                </span>
                                <span className="session-name">
                                  {session.title}
                                </span>
                              </div>

                              <span className={`session-status-badge ${isCompleted ? "success" : isLocked ? "locked" : "open"}`}>
                                {isCompleted ? "Completed" : isLocked ? "Locked" : "Start Session →"}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <p className="no-sessions-msg">No sessions published under this module yet.</p>
                  )}

                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CourseContent;