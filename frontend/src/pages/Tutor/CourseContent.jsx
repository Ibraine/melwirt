// // tutor/TutorCourseContent.jsx
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Sidebar from "../../components/Sidebar";
// import Header from "../../components/Header";
// import axiosInstance from "../../api/axiosConfig";
// import "../../styles/tutorcoursecontent.css";

// const TutorCourseContent = () => {
//   const { courseId } = useParams();
//   const [modules, setModules] = useState([]);
//   const [selectedModule, setSelectedModule] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // -------------------------
//   // Load modules + sessions
//   // -------------------------
//   const loadContent = async () => {
//     setLoading(true);
//     try {
//       const res = await axiosInstance.get(`/api/courses/${courseId}/content/`);
//       setModules(res.data);
//     } catch (err) {
//       console.error("Failed to load content:", err);
//       alert("Failed to load modules. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadContent();
//   }, [courseId]);

//   return (
//     <div className="dashboard-container">
//       <Sidebar role="tutor" />
//       <div className="main-content">
//         <Header title="Manage Course Content" />

//         {/* =========================
//             LOADING STATE
//         ========================== */}
//         {loading && <p>Loading modules and sessions...</p>}

//         {/* =========================
//             MODULE LIST
//         ========================== */}
//         {modules.length === 0 && !loading ? (
//           <p>No modules found. Modules are added by Admin.</p>
//         ) : (
//           modules.map((module) => (
//             <div key={module.id} className="module-item card p-3 mb-3">
//               <h3>
//                 {module.order}. {module.title}
//               </h3>

//               {module.sessions.length > 0 ? (
//                 <div className="session-list mt-2">
//                   {module.sessions.map((s) => (
//                     <p key={s.id}>
//                       📘 {s.order}. {s.title} ({s.duration_minutes} min)
//                     </p>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-muted">No sessions added by Admin yet.</p>
//               )}

//               {/* Optional: Info message */}
//               <p className="text-muted mt-2">
//                 Modules and sessions are created by Admin. You can view them here.
//               </p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default TutorCourseContent;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import axiosInstance from "../../api/axiosConfig";
import "../../styles/tutorcoursecontent.css";

const TutorCourseContent = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load modules + sessions
  const loadContent = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/api/courses/${courseId}/content/`);
      setModules(res.data);
    } catch (err) {
      console.error("Failed to load content:", err);
      alert("Failed to load modules. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, [courseId]);

  return (
    <div className="dashboard-container">
      <Sidebar role="tutor" />
      <div className="main-content">
        <Header />

        <div className="content-page-wrapper">
          {/* Header & Back Button */}
          <div className="content-header-row mb-4">
            <button className="btn-back-link mb-2" onClick={() => navigate("/tutor/my-courses")}>
              ← Back to My Courses
            </button>
            <h3 className="fw-bold m-0 text-dark">Course Modules & Sessions</h3>
            <p className="text-muted small m-0">View curriculum structure, modules, and session duration</p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="loading-state-card">
              <p>Loading course modules and sessions...</p>
            </div>
          )}

          {/* Module Cards List */}
          {!loading && modules.length === 0 ? (
            <div className="empty-content-card">
              <h5>No Modules Found</h5>
              <p className="text-muted m-0">Modules and sessions are created and managed by the Admin.</p>
            </div>
          ) : (
            <div className="modules-stack">
              {modules.map((module) => (
                <div key={module.id} className="module-card-pro">
                  <div className="module-card-header">
                    <div className="d-flex align-items-center gap-3">
                      <span className="module-number-badge">Module {module.order}</span>
                      <h4 className="module-title-text">{module.title}</h4>
                    </div>
                    <span className="sessions-count-pill">
                      {module.sessions?.length || 0} Sessions
                    </span>
                  </div>

                  {module.sessions && module.sessions.length > 0 ? (
                    <div className="sessions-container">
                      <h6 className="sessions-section-title">Sessions & Topics:</h6>
                      <div className="sessions-grid">
                        {module.sessions.map((s) => (
                          <div key={s.id} className="session-item-card">
                            <div className="session-left">
                              <span className="session-icon">📘</span>
                              <span className="session-name">
                                <strong>Session {s.order}:</strong> {s.title}
                              </span>
                            </div>
                            <span className="duration-pill">
                              🕒 {s.duration_minutes} mins
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="no-sessions-msg">No sessions added under this module yet.</p>
                  )}

                  <div className="module-card-footer">
                    <span>💡 Modules and sessions are managed by Admin. You can view them here.</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorCourseContent;