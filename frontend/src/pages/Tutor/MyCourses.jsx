// // tutor/Mycourses.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";  // ✅ added
// import Sidebar from "../../components/Sidebar";
// import Header from "../../components/Header";
// import "../../styles/mycourses.css";
// import axiosInstance from "../../api/axiosConfig";

// const MyCourses = () => {
//   const [courses, setCourses] = useState([]);
//   const navigate = useNavigate(); // ✅ added

//   useEffect(() => {
//     axiosInstance
//       .get("/api/courses/")
//       .then((res) => {
//         console.log("COURSES FROM API:", res.data);
//         setCourses(res.data.results || res.data);
//       })
//       .catch((err) => console.log("API Error:", err));
//   }, []);

//   return (
//     <div className="dashboard-container">
//       <Sidebar role="tutor" />
//       <div className="main-content">
//         <Header title="My Courses" />

//         <div className="courses-container">
//           {courses.length === 0 ? (
//             <p className="no-course-text">No Courses Found!</p>
//           ) : (
//             courses.map((course) => (
//               <div className="course-card" key={course.id}>
//                 <div className="course-left">
//                   <img
//                     src={course.image}
//                     className="course-image"
//                     alt={course.title}
//                   />
//                 </div>

//                 <div className="course-right">
//                   <h3 className="course-title">{course.title}</h3>
//                   <span className="tutor-badge">Your Course</span>

//                   <p className="course-students">
//                     👨‍🎓 Students Enrolled: {course.students_count}
//                   </p>
//                   <p className="course-tutor">Tutor: {course.tutor_name}</p>
//                   <p className="course-level">
//                     Level: {course.level?.toUpperCase()}
//                   </p>

//                   {/* ================= STUDENTS TABLE SECTION ================= */}
//                   <div className="students-section">
//                     <h4>Enrolled Students</h4>

//                     {course.enrolled_students.length === 0 ? (
//                       <p>No students enrolled yet.</p>
//                     ) : (
//                       <table className="students-table">
//                         <thead>
//                           <tr>
//                             <th>Profile</th>
//                             <th>Name</th>
//                             <th>Email</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {course.enrolled_students.map((student) => (
//                             <tr key={student.id}>
//                               <td>
//                                 <img
//                                   src={student.profile_pic}
//                                   alt="profile"
//                                   className="student-avatar"
//                                 />
//                               </td>
//                               <td>
//                                 {student.first_name} {student.last_name}
//                               </td>
//                               <td>{student.email}</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     )}
//                   </div>

//                   {/* ================== NAVIGATE BUTTON ================== */}
//                   <button
//                     className="btn-primary"
//                     onClick={() => navigate(`/tutor/course/${course.id}`)}
//                   >
//                     Manage Content
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyCourses;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../../styles/mycourses.css";
import axiosInstance from "../../api/axiosConfig";

// Default Fallback Assets
import defaultCourseImg from "../../assets/robotics automation.png";
import defaultAvatar from "../../assets/default-avatar.png";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/api/courses/")
      .then((res) => {
        setCourses(res.data.results || res.data);
      })
      .catch((err) => console.error("API Error:", err))
      .finally(() => setLoading(false));
  }, []);

  // 🔹 Smart Image Helper (Course Image)
  const getCourseImage = (course) => {
    const img = course?.image || course?.image_url;
    if (!img) return defaultCourseImg;
    if (img.startsWith("http://") || img.startsWith("https://")) return img;
    return `http://127.0.0.1:8000${img.startsWith("/") ? "" : "/"}${img}`;
  };

  // 🔹 Smart Image Helper (Student Profile Avatar)
  const getStudentAvatar = (student) => {
    const img = student?.profile_pic || student?.avatar || student?.profile_image;
    if (!img) return defaultAvatar;
    if (img.startsWith("http://") || img.startsWith("https://")) return img;
    return `http://127.0.0.1:8000${img.startsWith("/") ? "" : "/"}${img}`;
  };

  return (
    <div className="dashboard-container">
      <Sidebar role="tutor" />
      <div className="main-content">
        <Header />

        <div className="my-courses-page-wrapper">
          <div className="page-header-box mb-4">
            <h3 className="fw-bold m-0 text-dark">My Courses</h3>
            <p className="text-muted small m-0">View assigned courses and enrolled student rosters</p>
          </div>

          {loading ? (
            <div className="loading-card-box">Loading your assigned courses...</div>
          ) : courses.length === 0 ? (
            <div className="empty-courses-card">
              <p className="no-course-text">No courses assigned to you yet.</p>
            </div>
          ) : (
            <div className="courses-list-stack">
              {courses.map((course) => (
                <div className="tutor-course-card" key={course.id}>
                  {/* Left Column: Course Image Box */}
                  <div className="course-left-col">
                    <div className="course-img-wrapper">
                      <img
                        src={getCourseImage(course)}
                        alt={course.title || "Course"}
                        className="course-image-fit"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = defaultCourseImg;
                        }}
                      />
                    </div>
                  </div>

                  {/* Right Column: Details & Enrolled Students Table */}
                  <div className="course-right-col">
                    <div className="course-header-badge-row">
                      <h3 className="course-main-title">{course.title || "Untitled Course"}</h3>
                      <span className="your-course-pill">Your Course</span>
                    </div>

                    {/* Metadata Pills */}
                    <div className="meta-pills-container">
                      <div className="meta-chip">
                        <span className="meta-icon">👨‍🎓</span>
                        <span>Students Enrolled: <strong>{course.students_count || course.enrolled_students?.length || 0}</strong></span>
                      </div>
                      <div className="meta-chip">
                        <span className="meta-icon">👤</span>
                        <span>Tutor: <strong>{course.tutor_name || "Assigned"}</strong></span>
                      </div>
                      <div className="meta-chip">
                        <span className="meta-icon">⭐</span>
                        <span>Level: <strong>{course.level ? course.level.toUpperCase() : "BEGINNER"}</strong></span>
                      </div>
                    </div>

                    {/* Enrolled Students Table */}
                    <div className="enrolled-students-card">
                      <h5 className="table-section-title">Enrolled Students</h5>

                      {!course.enrolled_students || course.enrolled_students.length === 0 ? (
                        <p className="no-students-msg">No students enrolled in this course yet.</p>
                      ) : (
                        <div className="table-responsive-box">
                          <table className="students-table-custom">
                            <thead>
                              <tr>
                                <th>Profile</th>
                                <th>Student Name</th>
                                <th>Email Address</th>
                              </tr>
                            </thead>
                            <tbody>
                              {course.enrolled_students.map((student) => (
                                <tr key={student.id}>
                                  <td>
                                    <img
                                      src={getStudentAvatar(student)}
                                      alt="Student Profile"
                                      className="student-avatar-img"
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = defaultAvatar;
                                      }}
                                    />
                                  </td>
                                  <td className="fw-semibold text-dark">
                                    {student.first_name} {student.last_name || ""}
                                  </td>
                                  <td className="text-muted">{student.email}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>

                    {/* Navigate Button */}
                    <div className="card-actions-bar">
                      <button
                        className="btn-manage-content"
                        onClick={() => navigate(`/tutor/course/${course.id}`)}
                      >
                        Manage Content & Sessions →
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

export default MyCourses;