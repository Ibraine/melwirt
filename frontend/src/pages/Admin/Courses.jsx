// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../../components/Sidebar";
// import Header from "../../components/Header";
// import "../../styles/courses.css";
// import AddCourseModal from "../../components/AddCourseModal";
// import axios from "axios";
// import defaultCourseImg from "../../assets/robotics automation.png";

// const Courses = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [courses, setCourses] = useState([]);
//   const [tutors, setTutors] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   const [filters, setFilters] = useState({
//     teacher: "",
//     student: "",
//     status: "",
//     search: "",
//   });

//   useEffect(() => {
//     loadCourses();
//     loadTutors();
//   }, []);

//   // 🔹 Load courses
//   const loadCourses = async () => {
//     try {
//       const res = await axios.get("https://api.melwirt.com/api/courses/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = res.data.results || res.data;
//       setCourses(data);

//       // 🔥 extract unique students
//       const allStudents = [
//         ...new Map(
//           data
//             .flatMap((c) => c.students || [])
//             .map((s) => [s.id, s])
//         ).values(),
//       ];
//       setStudents(allStudents);
//     } catch (err) {
//       console.error("Failed to load courses:", err);
//     }
//   };

//   // 🔹 Load tutors (for filter only)
//   const loadTutors = async () => {
//     try {
//       const res = await axios.get(
//         "https://api.melwirt.com/api/adminpanel/users/?role=tutor",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const list = res.data.results || res.data;
//       setTutors(
//         list.map((t) => ({
//           id: t.id,
//           name: `${t.first_name || ""} ${t.last_name || ""}`.trim(),
//         }))
//       );
//     } catch (err) {
//       console.error("Failed to load tutors:", err);
//     }
//   };

//   // ✅ SAFE TUTOR NAME (FIRST CODE LOGIC – FINAL)
//   const getTutorName = (course) => {
//     if (course?.tutor?.first_name || course?.tutor?.last_name) {
//       return `${course.tutor.first_name || ""} ${
//         course.tutor.last_name || ""
//       }`.trim();
//     }
//     if (course?.tutor_name) return course.tutor_name;
//     return "No Tutor";
//   };

//   // ✅ SAFE COURSE TITLE (AS PER BACKEND)
//   const getCourseTitle = (course) => {
//     if (course?.title && course.title.trim() !== "") {
//       return course.title;
//     }
//     return "No title found";
//   };

//   // 🔹 Filter change
//   const handleFilterChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//   };

//   // 🔹 Filter courses
//   const filteredCourses = courses.filter((course) => {
//     const teacherMatch = filters.teacher
//       ? course.tutor?.id?.toString() === filters.teacher
//       : true;

//     const studentMatch = filters.student
//       ? (course.students || []).some(
//           (s) => s.id.toString() === filters.student
//         )
//       : true;

//     const statusMatch = filters.status
//       ? filters.status === "Active"
//         ? course.is_active
//         : !course.is_active
//       : true;

//     const searchMatch = getCourseTitle(course)
//       .toLowerCase()
//       .includes(filters.search.toLowerCase());

//     return teacherMatch && studentMatch && statusMatch && searchMatch;
//   });

//   // 🔹 Toggle active status
//   const toggleStatus = async (course, e) => {
//     e.stopPropagation();
//     try {
//       await axios.patch(
//         `https://api.melwirt.com/api/courses/${course.id}/`,
//         { is_active: !course.is_active },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       loadCourses();
//     } catch (err) {
//       console.error("Status update failed:", err);
//     }
//   };

//   return (
//     <div className="d-flex">
//       <Sidebar />

//       <div className="flex-grow-1">
//         <Header />

//         <div className="container mt-4">
//           <div className="d-flex justify-content-between align-items-center">
//             <h4>Course Information</h4>
//             <button onClick={() => setShowModal(true)} className="btn-add">
//               +
//             </button>
//           </div>

//           {/* 🔍 FILTER BAR */}
//           <div className="filter-bar">
//             <select
//               name="teacher"
//               value={filters.teacher}
//               onChange={handleFilterChange}
//             >
//               <option value="">All Teachers</option>
//               {tutors.map((t) => (
//                 <option key={t.id} value={t.id}>
//                   {t.name}
//                 </option>
//               ))}
//             </select>

//             <select
//               name="student"
//               value={filters.student}
//               onChange={handleFilterChange}
//             >
//               <option value="">All Students</option>
//               {students.map((s) => (
//                 <option key={s.id} value={s.id}>
//                   {s.name}
//                 </option>
//               ))}
//             </select>

//             <select
//               name="status"
//               value={filters.status}
//               onChange={handleFilterChange}
//             >
//               <option value="">All Status</option>
//               <option value="Active">Active</option>
//               <option value="Inactive">Inactive</option>
//             </select>

//             <input
//               type="text"
//               name="search"
//               placeholder="Search course"
//               value={filters.search}
//               onChange={handleFilterChange}
//             />
//           </div>

//           {/* 📦 COURSES */}
//           {filteredCourses.length > 0 ? (
//             filteredCourses.map((course) => (
//               <div
//                 key={course.id}
//                 className="course-card"
//                 style={{ cursor: "pointer" }}
//                 onClick={() =>
//                   navigate(`/admin/courses/${course.id}/content`)
//                 }
//               >
//                 <img
//                   src={
//                     course.image_url
//                       ? `https://api.melwirt.com${course.image_url}`
//                       : defaultCourseImg
//                   }
//                   alt={getCourseTitle(course)}
//                   className="course-image"
//                 />

//                 <div className="course-info">
//                   {/* ✅ COURSE TITLE */}
//                   <h5 className="course-title">
//                     {getCourseTitle(course)}
//                   </h5>

//                   {/* ✅ TUTOR NAME – FIXED */}
//                   <span className="teacher-badge">
//                     {getTutorName(course)}
//                   </span>

//                   <div className="course-meta mt-2">
//                     <div>
//                       <span className="label">Duration</span>
//                       <p>{course.duration_weeks || "-"}</p>
//                     </div>
//                     <div>
//                       <span className="label">Level</span>
//                       <p>{course.level || "-"}</p>
//                     </div>
//                     <div>
//                       <span className="label">Created</span>
//                       <p>
//                         {course.created_at
//                           ? new Date(course.created_at).toLocaleDateString()
//                           : "-"}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="course-stats">
//                     <div>
//                       <span className="highlight">
//                         ₹{course.price_inr || "-"} / $
//                         {course.price_usd || "-"}
//                       </span>
//                       <p>Fee/class</p>
//                     </div>

//                     <div>
//                       <span
//                         className="highlight"
//                         onClick={(e) => toggleStatus(course, e)}
//                       >
//                         {course.is_active ? "Active" : "Inactive"}
//                       </span>
//                       <p>Status (click)</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center mt-4">No courses available</p>
//           )}
//         </div>
//       </div>

//       {showModal && (
//         <AddCourseModal
//           onClose={() => setShowModal(false)}
//           onCourseAdded={loadCourses}
//         />
//       )}
//     </div>
//   );
// };

// export default Courses;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../../styles/courses.css";
import AddCourseModal from "../../components/AddCourseModal";
import axios from "axios";
import defaultCourseImg from "../../assets/robotics automation.png";

const Courses = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [courses, setCourses] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [filters, setFilters] = useState({
    teacher: "",
    student: "",
    status: "",
    search: "",
  });

  useEffect(() => {
    loadCourses();
    loadTutors();
    loadStudents(); // 🔹 Added student loading
  }, []);

  // 🔹 Load courses
  const loadCourses = async () => {
    try {
      const res = await axios.get("https://api.melwirt.com/api/courses/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data.results || res.data;
      setCourses(data);
    } catch (err) {
      console.error("Failed to load courses:", err);
    }
  };

  // 🔹 Load tutors
  const loadTutors = async () => {
    try {
      const res = await axios.get(
        "https://api.melwirt.com/api/adminpanel/users/?role=tutor",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const list = res.data.results || res.data;
      setTutors(
        list.map((t) => ({
          id: t.id,
          name: `${t.first_name || ""} ${t.last_name || ""}`.trim() || t.username || `Tutor ${t.id}`,
        }))
      );
    } catch (err) {
      console.error("Failed to load tutors:", err);
    }
  };

  // 🔹 FIX: Load Students directly from backend
  const loadStudents = async () => {
    try {
      const res = await axios.get(
        "https://api.melwirt.com/api/adminpanel/users/?role=student",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const list = res.data.results || res.data;
      setStudents(
        list.map((s) => ({
          id: s.id,
          name: `${s.first_name || ""} ${s.last_name || ""}`.trim() || s.username || `Student ${s.id}`,
        }))
      );
    } catch (err) {
      console.error("Failed to load students:", err);
    }
  };

  // ✅ SAFE TUTOR NAME
  const getTutorName = (course) => {
    if (course?.tutor?.first_name || course?.tutor?.last_name) {
      return `${course.tutor.first_name || ""} ${
        course.tutor.last_name || ""
      }`.trim();
    }
    if (course?.tutor_name) return course.tutor_name;
    return "No Tutor";
  };

  // ✅ SAFE COURSE TITLE
  const getCourseTitle = (course) => {
    if (course?.title && course.title.trim() !== "") {
      return course.title;
    }
    return "Untitled Course";
  };

  // 🔹 Smart Image URL Handler
  const getCourseImage = (course) => {
    const imgPath = course?.image || course?.image_url;
    if (!imgPath) return defaultCourseImg;
    
    if (imgPath.startsWith("http://") || imgPath.startsWith("https://")) {
      return imgPath;
    }
    
    return `https://api.melwirt.com${imgPath.startsWith("/") ? "" : "/"}${imgPath}`;
  };

  // 🔹 Filter change
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // 🔹 Filter courses
  const filteredCourses = courses.filter((course) => {
    const teacherMatch = filters.teacher
      ? course.tutor?.id?.toString() === filters.teacher
      : true;

    // FIX: Handles student match whether student object or ID array
    const studentMatch = filters.student
      ? (course.students || []).some((s) => {
          const sId = typeof s === "object" ? s.id : s;
          return sId?.toString() === filters.student;
        })
      : true;

    const statusMatch = filters.status
      ? filters.status === "Active"
        ? course.is_active
        : !course.is_active
      : true;

    const searchMatch = getCourseTitle(course)
      .toLowerCase()
      .includes(filters.search.toLowerCase());

    return teacherMatch && studentMatch && statusMatch && searchMatch;
  });

  // 🔹 Toggle active status
  const toggleStatus = async (course, e) => {
    e.stopPropagation();
    try {
      await axios.patch(
        `https://api.melwirt.com/api/courses/${course.id}/`,
        { is_active: !course.is_active },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      loadCourses();
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  return (
    <div className="d-flex courses-page">
      <Sidebar />

      <div className="main-content-wrapper flex-grow-1">
        <Header />

        <div className="container py-4" style={{ maxWidth: "1000px" }}>
          
          {/* Header Row */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h4 className="fw-bold m-0 page-title">Course Information</h4>
              <p className="text-muted small m-0">Manage all course curriculums, pricing, and active status</p>
            </div>
            <button onClick={() => setShowModal(true)} className="btn-add-course">
              + Add Course
            </button>
          </div>

          {/* 🔍 FILTER BAR */}
          <div className="filter-bar-custom">
            <select
              name="teacher"
              value={filters.teacher}
              onChange={handleFilterChange}
            >
              <option value="">All Teachers</option>
              {tutors.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>

            <select
              name="student"
              value={filters.student}
              onChange={handleFilterChange}
            >
              <option value="">All Students</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <input
              type="text"
              name="search"
              placeholder="Search course..."
              value={filters.search}
              onChange={handleFilterChange}
            />
          </div>

          {/* 📦 COURSES LIST */}
          <div className="courses-list-container">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="course-card-custom"
                  onClick={() =>
                    navigate(`/admin/courses/${course.id}/content`)
                  }
                >
                  {/* Fixed Size Image Box */}
                  <div className="course-img-box">
                    <img
                      src={getCourseImage(course)}
                      alt={getCourseTitle(course)}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultCourseImg;
                      }}
                    />
                  </div>

                  {/* Course Details Info */}
                  <div className="course-card-body">
                    <div className="course-card-header">
                      <h5 className="course-title-text">{getCourseTitle(course)}</h5>
                      <span className="tutor-tag">
                        Tutor: <strong>{getTutorName(course)}</strong>
                      </span>
                    </div>

                    <div className="course-meta-grid">
                      <div className="meta-col">
                        <span className="meta-label">Duration</span>
                        <span className="meta-val">{course.duration_weeks ? `${course.duration_weeks} Weeks` : "-"}</span>
                      </div>
                      <div className="meta-col">
                        <span className="meta-label">Level</span>
                        <span className="meta-val capitalize">{course.level || "-"}</span>
                      </div>
                      <div className="meta-col">
                        <span className="meta-label">Created</span>
                        <span className="meta-val">
                          {course.created_at
                            ? new Date(course.created_at).toLocaleDateString()
                            : "-"}
                        </span>
                      </div>
                    </div>

                    <div className="course-card-footer">
                      <div className="fee-box">
                        <span className="price-text">
                          ₹{course.price_inr || "0"} / ${course.price_usd || "0"}
                        </span>
                        <span className="fee-sub">Fee per class</span>
                      </div>

                      <div className="status-toggle-box" onClick={(e) => toggleStatus(course, e)}>
                        <span className={`status-pill ${course.is_active ? "active" : "inactive"}`}>
                          <span className="dot"></span>
                          {course.is_active ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              ))
            ) : (
              <div className="empty-courses-state">
                <p>No courses found matching your criteria</p>
              </div>
            )}
          </div>

        </div>
      </div>

      {showModal && (
        <AddCourseModal
          onClose={() => setShowModal(false)}
          onCourseAdded={loadCourses}
        />
      )}
    </div>
  );
};

export default Courses;