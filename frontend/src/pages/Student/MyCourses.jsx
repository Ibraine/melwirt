// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../../components/Sidebar";
// import Header from "../../components/Header";
// import "../../styles/mycourses.css";
// import axiosInstance from "../../api/axiosConfig";

// const StudentMyCourses = () => {
//   const [courses, setCourses] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axiosInstance
//       .get("/api/student/my-courses/")
//       .then((res) => {
//         console.log("STUDENT ENROLLMENTS:", res.data);

//         const data = res.data.results || res.data;

//         const enrolledCourses = data.map((enrollment) => ({
//           enrollmentId: enrollment.id,          // ✅ unique key
//           courseId: enrollment.course_id,       // ✅ from serializer
//           title: enrollment.course_title,
//           thumbnail: enrollment.course_image,  // ✅ FIXED IMAGE FIELD
//           tutorName: enrollment.tutor_name,    // ✅ FIXED TUTOR
//           status:
//             enrollment.status?.toLowerCase() === "pending"
//               ? "ENROLLED"
//               : enrollment.status?.toUpperCase(),
//           progress: enrollment.sessions?.length
//             ? Math.round(
//                 (enrollment.sessions.filter((s) => s.attended).length /
//                   enrollment.sessions.length) *
//                   100
//               )
//             : 0,
//         }));

//         setCourses(enrolledCourses);
//       })
//       .catch((err) => {
//         console.error("API Error:", err);
//       });
//   }, []);

//   return (
//     <div className="dashboard-container">
//       <Sidebar role="student" />

//       <div className="main-content">
//         <Header title="My Courses" />

//         <div className="courses-container">
//           {courses.length === 0 ? (
//             <p className="no-course-text">No Courses Enrolled Yet!</p>
//           ) : (
//             courses.map((course) => (
//               <div
//                 className="course-card"
//                 key={course.enrollmentId}
//                 style={{ cursor: "pointer" }}
//                 onClick={() =>
//                   navigate(`/student/course/${course.courseId}`)
//                 }
//               >
//                 <div className="course-left">
//                   {course.thumbnail ? (
//                     <img
//                       src={course.thumbnail}
//                       className="course-image"
//                       alt={course.title}
//                     />
//                   ) : (
//                     <div className="course-image placeholder">
//                       No Image
//                     </div>
//                   )}
//                 </div>

//                 <div className="course-right">
//                   <h3 className="course-title">{course.title}</h3>

//                   <span className="tutor-badge">
//                     {course.status || "ENROLLED"}
//                   </span>

//                   <p className="course-tutor">
//                     Tutor: {course.tutorName || "N/A"}
//                   </p>

//                   {/* ✅ PROGRESS BAR (TERA ORIGINAL LOGIC) */}
//                   <div className="progress-wrapper">
//                     <div className="progress-bar">
//                       <div
//                         className="progress-fill"
//                         style={{ width: `${course.progress}%` }}
//                       />
//                     </div>
//                     <span className="progress-text">
//                       {course.progress}% Completed
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentMyCourses;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../../styles/mycourses.css";
import axiosInstance from "../../api/axiosConfig";

// Default Fallback Image
import defaultCourseImg from "../../assets/robotics automation.png";

const StudentMyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/api/student/my-courses/")
      .then((res) => {
        const data = res.data.results || res.data;

        const enrolledCourses = data.map((enrollment) => ({
          enrollmentId: enrollment.id,
          courseId: enrollment.course_id,
          title: enrollment.course_title,
          thumbnail: enrollment.course_image,
          tutorName: enrollment.tutor_name,
          status:
            enrollment.status?.toLowerCase() === "pending"
              ? "ENROLLED"
              : enrollment.status?.toUpperCase() || "ENROLLED",
          progress: enrollment.sessions?.length
            ? Math.round(
                (enrollment.sessions.filter((s) => s.attended).length /
                  enrollment.sessions.length) *
                  100
              )
            : 0,
        }));

        setCourses(enrolledCourses);
      })
      .catch((err) => {
        console.error("API Error:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // 🔹 Smart Image URL Helper
  const getCourseImage = (img) => {
    if (!img) return defaultCourseImg;
    if (img.startsWith("http://") || img.startsWith("https://")) return img;
    return `https://api.melwirt.com${img.startsWith("/") ? "" : "/"}${img}`;
  };

  return (
    <div className="dashboard-container">
      <Sidebar role="student" />

      <div className="main-content">
        <Header />

        <div className="my-courses-page-wrapper">
          <div className="page-header-box mb-4">
            <h3 className="fw-bold m-0 page-title">My Enrolled Courses</h3>
            <p className="text-muted small m-0">Track your learning progress, modules, and class schedules</p>
          </div>

          {loading ? (
            <div className="loading-card-box">Loading your enrolled courses...</div>
          ) : courses.length === 0 ? (
            <div className="empty-courses-card">
              <p className="no-course-text">No Courses Enrolled Yet!</p>
            </div>
          ) : (
            <div className="courses-list-stack">
              {courses.map((course) => (
                <div
                  className="tutor-course-card student-card"
                  key={course.enrollmentId}
                  onClick={() => navigate(`/student/course/${course.courseId}`)}
                >
                  {/* Course Thumbnail Image */}
                  <div className="course-left-col">
                    <div className="course-img-wrapper">
                      <img
                        src={getCourseImage(course.thumbnail)}
                        className="course-image-fit"
                        alt={course.title || "Course"}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = defaultCourseImg;
                        }}
                      />
                    </div>
                  </div>

                  {/* Course Details Info */}
                  <div className="course-right-col">
                    <div className="course-header-badge-row">
                      <h3 className="course-main-title">{course.title || "Untitled Course"}</h3>
                      <span className="your-course-pill">{course.status}</span>
                    </div>

                    <p className="course-tutor-name">
                      Instructor: <strong>{course.tutorName || "Assigned Tutor"}</strong>
                    </p>

                    {/* Progress Bar Box */}
                    <div className="student-progress-box">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="progress-label">Course Progress</span>
                        <span className="progress-percent-text">{course.progress}% Completed</span>
                      </div>
                      <div className="custom-progress-track">
                        <div
                          className="custom-progress-fill"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Button */}
                    <div className="card-actions-bar mt-2">
                      <button
                        className="btn-manage-content"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/student/course/${course.courseId}`);
                        }}
                      >
                        View Course Content & Modules →
                      </button>
                    </div>
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

export default StudentMyCourses;