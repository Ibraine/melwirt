// import React, { useEffect, useState } from "react";
// import Sidebar from "../../components/Sidebar";
// import Header from "../../components/Header";
// import WelcomeBox from "../../components/WelcomeBox";
// import "../../styles/dashboard.css";

// import { fetchStudentDashboard } from "../../api/studentDashboardAPI";

// const BASE_URL = "https://api.melwirt.com";

// const StudentDashboard = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchStudentDashboard()
//       .then((res) => {
//         setData(res);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   if (loading) return <p style={{ padding: 20 }}>Loading...</p>;
//   if (!data) return <p style={{ padding: 20 }}>No data</p>;

//   const { stats, active_courses, upcoming_schedule } = data;

//   // 🔥 SPLIT DEMO & REGULAR
//   const demoClass = upcoming_schedule?.is_demo
//     ? upcoming_schedule
//     : null;

//   const regularClass = upcoming_schedule?.is_demo === false
//     ? upcoming_schedule
//     : null;

//   const getImage = (img) => {
//     if (!img) return "/course-placeholder.png";
//     return img.startsWith("http") ? img : `${BASE_URL}${img}`;
//   };

//   return (
//     <div className="dashboard-layout">
//       <Sidebar role="student" />

//       <div className="main-content">
//         <Header role="student" />
//         <WelcomeBox role="student" />

//         {/* STATS */}
//         <div className="dashboard-cards">
//           <div className="dashboard-card">
//             <h4>Total Enroll Courses</h4>
//             <p>{stats?.total_enroll_courses || 0}</p>
//           </div>

//           <div className="dashboard-card">
//             <h4>Ongoing Courses</h4>
//             <p>{stats?.ongoing_courses || 0}</p>
//           </div>

//           <div className="dashboard-card">
//             <h4>Hour Spent</h4>
//             <p>{stats?.hours_spent || 0}</p>
//           </div>
//         </div>

//         {/* ACTIVE COURSES */}
//         <div className="dashboard-section">
//           <h3>Active Courses</h3>

//           <div className="course-list">
//             {active_courses?.map((course) => (
//               <div key={course.id} className="course-card">
//                 <img src={getImage(course.thumbnail)} alt={course.title} />
//                 <div>
//                   <h4>{course.title}</h4>
//                   <span>{course.tutor_name}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* 🔥 DEMO CLASS */}
//         {demoClass && (
//           <div className="dashboard-section">
//             <h3>Upcoming Demo Class</h3>

//             <div className="upcoming-card">
//               <h4>{demoClass.course_title}</h4>
//               <p>
//                 {demoClass.date} | {demoClass.start_time} - {demoClass.end_time}
//               </p>

//               {demoClass.join_link && (
//                 <a href={demoClass.join_link} target="_blank" rel="noreferrer">
//                   Join Demo
//                 </a>
//               )}
//             </div>
//           </div>
//         )}

//         {/* 🔥 REGULAR CLASS */}
//         {regularClass && (
//           <div className="dashboard-section">
//             <h3>Upcoming Class</h3>

//             <div className="upcoming-card">
//               <h4>{regularClass.course_title}</h4>
//               <p>
//                 {regularClass.date} | {regularClass.start_time} - {regularClass.end_time}
//               </p>

//               {regularClass.join_link && (
//                 <a href={regularClass.join_link} target="_blank" rel="noreferrer">
//                   Join Class
//                 </a>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;



// import React, { useEffect, useState } from "react";
// import Sidebar from "../../components/Sidebar";
// import Header from "../../components/Header";
// import WelcomeBox from "../../components/WelcomeBox";
// import "../../styles/dashboard.css";

// import { fetchStudentDashboard } from "../../api/studentDashboardAPI";

// const BASE_URL = "https://api.melwirt.com";

// const StudentDashboard = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchStudentDashboard()
//       .then((res) => {
//         setData(res);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Dashboard error:", err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p style={{ padding: 20 }}>Loading...</p>;
//   if (!data) return <p style={{ padding: 20 }}>No data</p>;

//   const {
//     stats,
//     active_courses,
//     upcoming_demo,
//     upcoming_regular,
//   } = data;

//   const getImage = (img) => {
//     if (!img) return "/course-placeholder.png";
//     return img.startsWith("http") ? img : `${BASE_URL}${img}`;
//   };

//   return (
//     <div className="dashboard-layout">
//       <Sidebar role="student" />

//       <div className="main-content">
//         <Header role="student" />
//         <WelcomeBox role="student" />

//         {/* ================= STATS ================= */}
//         <div className="dashboard-cards">
//           <div className="dashboard-card">
//             <h4>Total Enroll Courses</h4>
//             <p>{stats?.total_enroll_courses || 0}</p>
//           </div>

//           <div className="dashboard-card">
//             <h4>Ongoing Courses</h4>
//             <p>{stats?.ongoing_courses || 0}</p>
//           </div>

//           <div className="dashboard-card">
//             <h4>Hour Spent</h4>
//             <p>{stats?.hours_spent || 0}</p>
//           </div>
//         </div>

//         {/* ================= ACTIVE COURSES ================= */}
//         <div className="dashboard-section">
//           <h3>Active Courses</h3>

//           <div className="course-list">
//             {active_courses?.length === 0 && <p>No active courses</p>}

//             {active_courses?.map((course) => (
//               <div key={course.id} className="course-card">
//                 <img
//                   src={getImage(course.thumbnail)}
//                   alt={course.title}
//                 />
//                 <div>
//                   <h4>{course.title}</h4>
//                   <span className="instructor-badge">
//                     {course.tutor_name}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ================= DEMO CLASS ================= */}
//         {upcoming_demo && (
//           <div className="dashboard-section">
//             <h3>Upcoming Demo Class</h3>

//             <div className="upcoming-card">
//               <div className="upcoming-info">
//                 <h4>{upcoming_demo.course_title}</h4>

//                 <p>
//                   <strong>Date / Time:</strong>{" "}
//                   {upcoming_demo.date} |{" "}
//                   {upcoming_demo.start_time} –{" "}
//                   {upcoming_demo.end_time}
//                 </p>

//                 {upcoming_demo.join_link && (
//                   <a
//                     href={upcoming_demo.join_link}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="join-btn"
//                   >
//                     Join Demo
//                   </a>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ================= REGULAR CLASS ================= */}
//         {upcoming_regular && (
//           <div className="dashboard-section">
//             <h3>Upcoming Class</h3>

//             <div className="upcoming-card">
//               <div className="upcoming-info">
//                 <h4>{upcoming_regular.course_title}</h4>

//                 <p>
//                   <strong>Date / Time:</strong>{" "}
//                   {upcoming_regular.date} |{" "}
//                   {upcoming_regular.start_time} –{" "}
//                   {upcoming_regular.end_time}
//                 </p>

//                 {upcoming_regular.join_link && (
//                   <a
//                     href={upcoming_regular.join_link}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="join-btn"
//                   >
//                     Join Class
//                   </a>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ================= EMPTY STATE ================= */}
//         {!upcoming_demo && !upcoming_regular && (
//           <div className="dashboard-section">
//             <p>No upcoming classes</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;


// import React, { useEffect, useState } from "react";
// import Sidebar from "../../components/Sidebar";
// import Header from "../../components/Header";
// import WelcomeBox from "../../components/WelcomeBox";
// import "../../styles/dashboard.css";

// import { fetchStudentDashboard } from "../../api/studentDashboardAPI";

// // Default Fallback Image
// import defaultCourseImg from "../../assets/robotics automation.png";

// const BASE_URL = "https://api.melwirt.com";

// const StudentDashboard = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchStudentDashboard()
//       .then((res) => {
//         setData(res);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Dashboard error:", err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <div className="p-5 text-center text-muted">Loading student dashboard...</div>;
//   if (!data) return <div className="p-5 text-center text-muted">No data available</div>;

//   const {
//     stats,
//     active_courses,
//     upcoming_demo,
//     upcoming_regular,
//   } = data;

//   const getImage = (img) => {
//     if (!img) return defaultCourseImg;
//     return img.startsWith("http") ? img : `${BASE_URL}${img}`;
//   };

//   return (
//     <div className="dashboard-layout student-dashboard">
//       <Sidebar role="student" />

//       <div className="main-content">
//         <Header role="student" />
//         <WelcomeBox role="student" />

//         {/* ================= STATS ================= */}
//         <div className="dashboard-cards">
//           <div className="dashboard-card">
//             <h4>Total Enroll Courses</h4>
//             <p>{stats?.total_enroll_courses || 0}</p>
//           </div>

//           <div className="dashboard-card">
//             <h4>Ongoing Courses</h4>
//             <p>{stats?.ongoing_courses || 0}</p>
//           </div>

//           <div className="dashboard-card">
//             <h4>Hour Spent</h4>
//             <p>{stats?.hours_spent || 0}</p>
//           </div>
//         </div>

//         {/* ================= ACTIVE COURSES ================= */}
//         <div className="dashboard-section">
//           <h3 className="section-title">Active Courses</h3>

//           <div className="course-list">
//             {!active_courses || active_courses?.length === 0 ? (
//               <p className="text-muted">No active courses found.</p>
//             ) : (
//               active_courses?.map((course) => (
//                 <div key={course.id} className="course-card">
//                   <img
//                     src={getImage(course.thumbnail)}
//                     alt={course.title || "Course"}
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = defaultCourseImg;
//                     }}
//                   />
//                   <div className="course-card-info">
//                     <h4>{course.title || "Untitled Course"}</h4>
//                     <span className="instructor-badge">
//                       Instructor: {course.tutor_name || "Assigned Tutor"}
//                     </span>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* ================= UPCOMING DEMO CLASS ================= */}
//         {upcoming_demo && (
//           <div className="dashboard-section">
//             <h3 className="section-title">Upcoming Demo Class</h3>

//             <div className="upcoming-card">
//               {/* Added Course Image for Demo Class */}
//               <img
//                 src={getImage(upcoming_demo.course_image || upcoming_demo.thumbnail || upcoming_demo.image)}
//                 alt={upcoming_demo.course_title}
//                 className="upcoming-img"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = defaultCourseImg;
//                 }}
//               />

//               <div className="upcoming-info">
//                 <h4>{upcoming_demo.course_title}</h4>

//                 <p>
//                   <strong>Date / Time:</strong>{" "}
//                   {upcoming_demo.date} | {upcoming_demo.start_time} – {upcoming_demo.end_time}
//                 </p>

//                 {upcoming_demo.join_link && (
//                   <a
//                     href={upcoming_demo.join_link}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="join-btn"
//                   >
//                     Join Demo Class
//                   </a>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ================= UPCOMING REGULAR CLASS ================= */}
//         {upcoming_regular && (
//           <div className="dashboard-section">
//             <h3 className="section-title">Upcoming Class</h3>

//             <div className="upcoming-card">
//               {/* Added Course Image for Regular Class */}
//               <img
//                 src={getImage(upcoming_regular.course_image || upcoming_regular.thumbnail || upcoming_regular.image)}
//                 alt={upcoming_regular.course_title}
//                 className="upcoming-img"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = defaultCourseImg;
//                 }}
//               />

//               <div className="upcoming-info">
//                 <h4>{upcoming_regular.course_title}</h4>

//                 <p>
//                   <strong>Date / Time:</strong>{" "}
//                   {upcoming_regular.date} | {upcoming_regular.start_time} – {upcoming_regular.end_time}
//                 </p>

//                 {upcoming_regular.join_link && (
//                   <a
//                     href={upcoming_regular.join_link}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="join-btn"
//                   >
//                     Join Class
//                   </a>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ================= EMPTY STATE ================= */}
//         {!upcoming_demo && !upcoming_regular && (
//           <div className="dashboard-section">
//             <p className="text-muted">No upcoming classes scheduled</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;


// import React, { useEffect, useState } from "react";
// import Sidebar from "../../components/Sidebar";
// import Header from "../../components/Header";
// import WelcomeBox from "../../components/WelcomeBox";
// import axiosInstance from "../../api/axiosConfig";
// import "../../styles/dashboard.css";



// import { fetchStudentDashboard } from "../../api/studentDashboardAPI";

// // Default Fallback Image
// import defaultCourseImg from "../../assets/robotics automation.png";

// const BASE_URL = "https://api.melwirt.com";

// const StudentDashboard = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadDashboardData = async () => {
//       try {
//         setLoading(true);

//         // 1. Fetch main dashboard data
//         const dashRes = await fetchStudentDashboard();

//         // 2. Fetch my-courses data to get GUARANTEED real course images
//         let enrolledCourses = [];
//         try {
//           const myCoursesRes = await axiosInstance.get("/api/student/my-courses/");
//           enrolledCourses = myCoursesRes.data?.results || myCoursesRes.data || [];
//         } catch (e) {
//           console.error("My courses fetch error in dashboard:", e);
//         }

//         // 3. 🔥 Smart Merge: Attach real_image from enrollment to active_courses!
//         if (dashRes?.active_courses && enrolledCourses.length > 0) {
//           dashRes.active_courses = dashRes.active_courses.map((ac) => {
//             const matched = enrolledCourses.find(
//               (mc) =>
//                 mc.course_id === ac.id ||
//                 mc.id === ac.id ||
//                 mc.course_title?.toLowerCase() === ac.title?.toLowerCase()
//             );

//             return {
//               ...ac,
//               real_image:
//                 matched?.course_image ||
//                 matched?.thumbnail ||
//                 matched?.image ||
//                 matched?.course_thumbnail,
//             };
//           });
//         }

//         setData(dashRes);
//       } catch (err) {
//         console.error("Dashboard error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadDashboardData();
//   }, []);

//   if (loading) return <div className="p-5 text-center text-muted">Loading student dashboard...</div>;
//   if (!data) return <div className="p-5 text-center text-muted">No data available</div>;

//   const {
//     stats,
//     active_courses,
//     upcoming_demo,
//     upcoming_regular,
//   } = data;

//   // 🔹 Smart Image Formatter
//   const getImage = (courseObj) => {
//     if (!courseObj) return defaultCourseImg;

//     const imgPath =
//       courseObj.real_image ||
//       courseObj.course_image ||
//       courseObj.thumbnail ||
//       courseObj.image ||
//       courseObj.image_url;

//     if (!imgPath) return defaultCourseImg;

//     if (imgPath.startsWith("http://") || imgPath.startsWith("https://")) {
//       return imgPath;
//     }

//     return `${BASE_URL}${imgPath.startsWith("/") ? "" : "/"}${imgPath}`;
//   };

//   return (
//     <div className="dashboard-layout student-dashboard">
//       <Sidebar role="student" />

//       <div className="main-content">
//         <Header role="student" />
//         <WelcomeBox role="student" />

//         {/* ================= STATS ================= */}
//         <div className="dashboard-cards">
//           <div className="dashboard-card">
//             <h4>Total Enroll Courses</h4>
//             <p>{stats?.total_enroll_courses || 0}</p>
//           </div>

//           <div className="dashboard-card">
//             <h4>Ongoing Courses</h4>
//             <p>{stats?.ongoing_courses || 0}</p>
//           </div>

//           <div className="dashboard-card">
//             <h4>Hour Spent</h4>
//             <p>{stats?.hours_spent || 0}</p>
//           </div>
//         </div>

//         {/* ================= ACTIVE COURSES ================= */}
//         <div className="dashboard-section">
//           <h3 className="section-title">Active Courses</h3>

//           <div className="course-list">
//             {!active_courses || active_courses?.length === 0 ? (
//               <p className="text-muted">No active courses found.</p>
//             ) : (
//               active_courses?.map((course) => (
//                 <div key={course.id || course.course_id} className="course-card">
//                   <img
//                     src={getImage(course)}
//                     alt={course.title || "Course"}
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = defaultCourseImg;
//                     }}
//                   />
//                   <div className="course-card-info">
//                     <h4>{course.title || "Untitled Course"}</h4>
//                     <span className="instructor-badge">
//                       Instructor: {course.tutor_name || "Assigned Tutor"}
//                     </span>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* ================= UPCOMING DEMO CLASS ================= */}
//         {upcoming_demo && (
//           <div className="dashboard-section">
//             <h3 className="section-title">Upcoming Demo Class</h3>

//             <div className="upcoming-card">
//               <img
//                 src={getImage(upcoming_demo)}
//                 alt={upcoming_demo.course_title}
//                 className="upcoming-img"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = defaultCourseImg;
//                 }}
//               />

//               <div className="upcoming-info">
//                 <h4>{upcoming_demo.course_title}</h4>

//                 <p>
//                   <strong>Date / Time:</strong>{" "}
//                   {upcoming_demo.date} | {upcoming_demo.start_time} – {upcoming_demo.end_time}
//                 </p>

//                 {upcoming_demo.join_link && (
//                   <a
//                     href={upcoming_demo.join_link}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="join-btn"
//                   >
//                     Join Demo Class
//                   </a>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ================= UPCOMING REGULAR CLASS ================= */}
//         {upcoming_regular && (
//           <div className="dashboard-section">
//             <h3 className="section-title">Upcoming Class</h3>

//             <div className="upcoming-card">
//               <img
//                 src={getImage(upcoming_regular)}
//                 alt={upcoming_regular.course_title}
//                 className="upcoming-img"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = defaultCourseImg;
//                 }}
//               />

//               <div className="upcoming-info">
//                 <h4>{upcoming_regular.course_title}</h4>

//                 <p>
//                   <strong>Date / Time:</strong>{" "}
//                   {upcoming_regular.date} | {upcoming_regular.start_time} – {upcoming_regular.end_time}
//                 </p>

//                 {upcoming_regular.join_link && (
//                   <a
//                     href={upcoming_regular.join_link}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="join-btn"
//                   >
//                     Join Class
//                   </a>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ================= EMPTY STATE ================= */}
//         {!upcoming_demo && !upcoming_regular && (
//           <div className="dashboard-section">
//             <p className="text-muted">No upcoming classes scheduled</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;



import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import WelcomeBox from "../../components/WelcomeBox";
import axiosInstance from "../../api/axiosConfig";
import "../../styles/dashboard.css";

import { fetchStudentDashboard } from "../../api/studentDashboardAPI";

// 🔹 STATS ICONS (From assets)
import totalEnrollImg from "../../assets/total enroll courses.png";
import ongoingCoursesImg from "../../assets/ongoing courses.png";
import hoursSpentImg from "../../assets/hours spent.png";

// Default Fallback Image
import defaultCourseImg from "../../assets/robotics automation.png";

const BASE_URL = "https://api.melwirt.com";

const StudentDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);

        // 1. Fetch main dashboard data
        const dashRes = await fetchStudentDashboard();

        // 2. Fetch my-courses data for real course images
        let enrolledCourses = [];
        try {
          const myCoursesRes = await axiosInstance.get("/api/student/my-courses/");
          enrolledCourses = myCoursesRes.data?.results || myCoursesRes.data || [];
        } catch (e) {
          console.error("My courses fetch error in dashboard:", e);
        }

        // 3. Smart Merge: Attach real_image to active_courses
        if (dashRes?.active_courses && enrolledCourses.length > 0) {
          dashRes.active_courses = dashRes.active_courses.map((ac) => {
            const matched = enrolledCourses.find(
              (mc) =>
                mc.course_id === ac.id ||
                mc.id === ac.id ||
                mc.course_title?.toLowerCase() === ac.title?.toLowerCase()
            );

            return {
              ...ac,
              real_image:
                matched?.course_image ||
                matched?.thumbnail ||
                matched?.image ||
                matched?.course_thumbnail,
            };
          });
        }

        setData(dashRes);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) return <div className="p-5 text-center text-muted">Loading student dashboard...</div>;
  if (!data) return <div className="p-5 text-center text-muted">No data available</div>;

  const {
    stats,
    active_courses,
    upcoming_demo,
    upcoming_regular,
  } = data;

  // 🔹 Smart Image Formatter
  const getImage = (courseObj) => {
    if (!courseObj) return defaultCourseImg;

    const imgPath =
      courseObj.real_image ||
      courseObj.course_image ||
      courseObj.thumbnail ||
      courseObj.image ||
      courseObj.image_url;

    if (!imgPath) return defaultCourseImg;

    if (imgPath.startsWith("http://") || imgPath.startsWith("https://")) {
      return imgPath;
    }

    return `${BASE_URL}${imgPath.startsWith("/") ? "" : "/"}${imgPath}`;
  };

  return (
    <div className="dashboard-layout student-dashboard">
      <Sidebar role="student" />

      <div className="main-content">
        <Header role="student" />
        <WelcomeBox role="student" />

        {/* ================= FIGMA STATS CARDS ================= */}
        <div className="dashboard-cards">
          {/* Card 1: Total Enroll Courses */}
          <div className="dashboard-card">
            <img src={totalEnrollImg} alt="Total Enroll Courses" />
            <div className="card-stats-text">
              <h4>Total Enroll Courses</h4>
              <p>{stats?.total_enroll_courses || 0}</p>
            </div>
          </div>

          {/* Card 2: Ongoing Courses */}
          <div className="dashboard-card">
            <img src={ongoingCoursesImg} alt="Ongoing Courses" />
            <div className="card-stats-text">
              <h4>Ongoing Courses</h4>
              <p>{stats?.ongoing_courses || 0}</p>
            </div>
          </div>

          {/* Card 3: Hour Spent */}
          <div className="dashboard-card">
            <img src={hoursSpentImg} alt="Hour Spent" />
            <div className="card-stats-text">
              <h4>Hour Spent</h4>
              <p>{stats?.hours_spent || 0}</p>
            </div>
          </div>
        </div>

        {/* ================= ACTIVE COURSES ================= */}
        <div className="dashboard-section">
          <h3 className="section-title">Active Courses</h3>

          <div className="course-list">
            {!active_courses || active_courses?.length === 0 ? (
              <p className="text-muted">No active courses found.</p>
            ) : (
              active_courses?.map((course) => (
                <div key={course.id || course.course_id} className="course-card">
                  <img
                    src={getImage(course)}
                    alt={course.title || "Course"}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultCourseImg;
                    }}
                  />
                  <div className="course-card-info">
                    <h4>{course.title || "Untitled Course"}</h4>
                    <span className="instructor-badge">
                      Instructor: {course.tutor_name || "Assigned Tutor"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ================= UPCOMING DEMO CLASS ================= */}
        {upcoming_demo && (
          <div className="dashboard-section">
            <h3 className="section-title">Upcoming Demo Class</h3>

            <div className="upcoming-card">
              <img
                src={getImage(upcoming_demo)}
                alt={upcoming_demo.course_title}
                className="upcoming-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultCourseImg;
                }}
              />

              <div className="upcoming-info">
                <h4>{upcoming_demo.course_title}</h4>

                <p>
                  <strong>Date / Time:</strong>{" "}
                  {upcoming_demo.date} | {upcoming_demo.start_time} – {upcoming_demo.end_time}
                </p>

                {upcoming_demo.join_link && (
                  <a
                    href={upcoming_demo.join_link}
                    target="_blank"
                    rel="noreferrer"
                    className="join-btn"
                  >
                    Join Demo Class
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= UPCOMING REGULAR CLASS ================= */}
        {upcoming_regular && (
          <div className="dashboard-section">
            <h3 className="section-title">Upcoming Class</h3>

            <div className="upcoming-card">
              <img
                src={getImage(upcoming_regular)}
                alt={upcoming_regular.course_title}
                className="upcoming-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultCourseImg;
                }}
              />

              <div className="upcoming-info">
                <h4>{upcoming_regular.course_title}</h4>

                <p>
                  <strong>Date / Time:</strong>{" "}
                  {upcoming_regular.date} | {upcoming_regular.start_time} – {upcoming_regular.end_time}
                </p>

                {upcoming_regular.join_link && (
                  <a
                    href={upcoming_regular.join_link}
                    target="_blank"
                    rel="noreferrer"
                    className="join-btn"
                  >
                    Join Class
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= EMPTY STATE ================= */}
        {!upcoming_demo && !upcoming_regular && (
          <div className="dashboard-section">
            <p className="text-muted">No upcoming classes scheduled</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;