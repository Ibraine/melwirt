// // import React, { useState, useEffect } from "react";
// // import Sidebar from "../../components/Sidebar";
// // import Header from "../../components/Header";
// // import axiosInstance from "../../api/axiosConfig";
// // import "../../styles/studentassignment.css";

// // const Assignment = () => {
// //   const [courses, setCourses] = useState([]);
// //   const [selectedCourse, setSelectedCourse] = useState("");
// //   const [assignments, setAssignments] = useState([]);

// //   // 🔥 STATES
// //   const [files, setFiles] = useState({});
// //   const [uploadingId, setUploadingId] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   // ======================
// //   // FETCH COURSES
// //   // ======================
// //   const fetchCourses = async () => {
// //     try {
// //       const res = await axiosInstance.get("/api/student/courses/");
// //       setCourses(res.data);
// //       if (res.data.length > 0) {
// //         setSelectedCourse(res.data[0].id);
// //       }
// //     } catch {
// //       setError("Failed to load courses");
// //     }
// //   };

// //   // ======================
// //   // FETCH ASSIGNMENTS (🔥 BACKEND HANDLES STATUS)
// //   // ======================
// //   const fetchAssignments = async (courseId) => {
// //     if (!courseId) return;

// //     setLoading(true);
// //     setError("");

// //     try {
// //       const res = await axiosInstance.get(
// //         `/api/assignments/student/list/?course=${courseId}`
// //       );
// //       setAssignments(res.data);
// //     } catch {
// //       setError("Failed to load assignments");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchCourses();
// //   }, []);

// //   useEffect(() => {
// //     fetchAssignments(selectedCourse);
// //   }, [selectedCourse]);

// //   // ======================
// //   // FILE CHANGE
// //   // ======================
// //   const handleFileChange = (assignmentId, file) => {
// //     setFiles((prev) => ({
// //       ...prev,
// //       [assignmentId]: file,
// //     }));
// //   };

// //   // ======================
// //   // SUBMIT / RESUBMIT
// //   // ======================
// //   const handleSubmit = async (e, assignmentId) => {
// //     e.preventDefault();

// //     const file = files[assignmentId];
// //     if (!file) {
// //       setError("Please select a file before submitting");
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append("file", file);
// //     formData.append("assignment", assignmentId);

// //     try {
// //       setUploadingId(assignmentId);

// //       await axiosInstance.post(
// //         "/api/assignments/student/submit/",
// //         formData,
// //         { headers: { "Content-Type": "multipart/form-data" } }
// //       );

// //       setFiles((prev) => ({ ...prev, [assignmentId]: null }));
// //       fetchAssignments(selectedCourse);
// //     } catch (err) {
// //       setError(
// //         err.response?.data?.detail ||
// //           err.response?.data?.error ||
// //           "Submission failed"
// //       );
// //     } finally {
// //       setUploadingId(null);
// //     }
// //   };

// //   return (
// //     <div className="dashboard-layout">
// //       <Sidebar role="student" />
// //       <div className="main-content">
// //         <Header />

// //         <div className="assignment-container assignment-page-body">
// //           <h2>Assignment Submission</h2>
// //           <p>Select course and upload assignment</p>

// //           {error && <p className="error-text">{error}</p>}

// //           {/* COURSE SELECT */}
// //           <div className="course-select">
// //             <label>Choose Course:</label>
// //             <select
// //               value={selectedCourse}
// //               onChange={(e) => setSelectedCourse(e.target.value)}
// //             >
// //               {courses.map((course) => (
// //                 <option key={course.id} value={course.id}>
// //                   {course.title}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           {loading ? (
// //             <p>Loading assignments...</p>
// //           ) : (
// //             <div className="assignment-table">
// //               <table>
// //                 <thead>
// //                   <tr>
// //                     <th>Title</th>
// //                     <th>Due Date</th>
// //                     <th>Upload</th>
// //                     <th>Status</th>
// //                     <th>Feedback</th>
// //                     <th>Action</th>
// //                   </tr>
// //                 </thead>

// //                 <tbody>
// //                   {assignments.length === 0 && (
// //                     <tr>
// //                       <td colSpan="6">No assignments found</td>
// //                     </tr>
// //                   )}

// //                   {assignments.map((item) => (
// //                     <tr key={item.id}>
// //                       <td>{item.title}</td>

// //                       <td>
// //                         {new Date(item.due_date).toLocaleDateString()}
// //                       </td>

// //                       {/* UPLOAD */}
// //                       <td>
// //                         {(item.action === "SUBMIT" ||
// //                           item.action === "RESUBMIT") && (
// //                           <form
// //                             onSubmit={(e) =>
// //                               handleSubmit(e, item.id)
// //                             }
// //                           >
// //                             <input
// //                               type="file"
// //                               required
// //                               onChange={(e) =>
// //                                 handleFileChange(
// //                                   item.id,
// //                                   e.target.files[0]
// //                                 )
// //                               }
// //                             />

// //                             <button
// //                               disabled={uploadingId === item.id}
// //                               className={
// //                                 item.action === "RESUBMIT"
// //                                   ? "resubmit-btn"
// //                                   : "submit-btn"
// //                               }
// //                             >
// //                               {uploadingId === item.id
// //                                 ? "Uploading..."
// //                                 : item.action === "RESUBMIT"
// //                                 ? "Re-Submit"
// //                                 : "Submit"}
// //                             </button>
// //                           </form>
// //                         )}

// //                         {item.action === "VIEW" && (
// //                           <span className="success-text">
// //                             ✔ Submitted
// //                           </span>
// //                         )}
// //                       </td>

// //                       {/* STATUS */}
// //                       <td>
// //                         {item.status ? (
// //                           <span
// //                             className={`status-badge ${
// //                               item.status === "SUCCESS"
// //                                 ? "success"
// //                                 : item.status === "REJECTED"
// //                                 ? "rejected"
// //                                 : "pending"
// //                             }`}
// //                           >
// //                             {item.status}
// //                           </span>
// //                         ) : (
// //                           <span className="status-badge pending">
// //                             Not Submitted
// //                           </span>
// //                         )}
// //                       </td>

// //                       {/* FEEDBACK */}
// //                       <td>
// //                         {item.feedback || "No Feedback"}
// //                       </td>

// //                       {/* ACTION */}
// //                       <td>
// //                         {item.action === "RESUBMIT" && (
// //                           <span className="resubmit-text">
// //                             ❌ Re-submit required
// //                           </span>
// //                         )}
// //                         {item.action === "VIEW" && (
// //                           <span className="success-text">
// //                             ✔ Completed
// //                           </span>
// //                         )}
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Assignment;


// import React, { useState, useEffect } from "react";
// import Sidebar from "../../components/Sidebar";
// import Header from "../../components/Header";
// import axiosInstance from "../../api/axiosConfig";
// import "../../styles/studentassignment.css";

// const Assignment = () => {
//   const [courses, setCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState("");
//   const [assignments, setAssignments] = useState([]);

//   // STATES
//   const [files, setFiles] = useState({});
//   const [uploadingId, setUploadingId] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // ======================
//   // FETCH COURSES (FIXED ENDPOINT: /api/student/my-courses/)
//   // ======================
//   const fetchCourses = async () => {
//     try {
//       setError("");
//       const res = await axiosInstance.get("/api/student/my-courses/");
//       const data = res.data.results || res.data || [];

//       // Format course dropdown options
//       const courseList = data.map((item) => ({
//         id: item.course_id || item.course || item.id,
//         title: item.course_title || item.title || `Course #${item.id}`,
//       }));

//       setCourses(courseList);
//       if (courseList.length > 0) {
//         setSelectedCourse(courseList[0].id);
//       }
//     } catch (err) {
//       console.error("Fetch courses error:", err);
//       setError("Failed to load enrolled courses");
//     }
//   };

//   // ======================
//   // FETCH ASSIGNMENTS FOR SELECTED COURSE
//   // ======================
//   const fetchAssignments = async (courseId) => {
//     if (!courseId) return;

//     setLoading(true);
//     setError("");

//     try {
//       const res = await axiosInstance.get(
//         `/api/assignments/student/list/?course=${courseId}`
//       );
//       setAssignments(res.data || []);
//     } catch (err) {
//       console.error("Fetch assignments error:", err);
//       setError("Failed to load assignments");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   useEffect(() => {
//     if (selectedCourse) {
//       fetchAssignments(selectedCourse);
//     }
//   }, [selectedCourse]);

//   // FILE CHANGE
//   const handleFileChange = (assignmentId, file) => {
//     setFiles((prev) => ({
//       ...prev,
//       [assignmentId]: file,
//     }));
//   };

//   // SUBMIT / RESUBMIT
//   const handleSubmit = async (e, assignmentId) => {
//     e.preventDefault();

//     const file = files[assignmentId];
//     if (!file) {
//       setError("Please select a file before submitting");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("assignment", assignmentId);

//     try {
//       setUploadingId(assignmentId);

//       await axiosInstance.post(
//         "/api/assignments/student/submit/",
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       setFiles((prev) => ({ ...prev, [assignmentId]: null }));
//       fetchAssignments(selectedCourse);
//     } catch (err) {
//       setError(
//         err.response?.data?.detail ||
//           err.response?.data?.error ||
//           "Submission failed"
//       );
//     } finally {
//       setUploadingId(null);
//     }
//   };

//   return (
//     <div className="dashboard-layout">
//       <Sidebar role="student" />

//       <div className="main-content">
//         <Header />

//         <div className="assignment-container">
//           <div className="page-header-box mb-4">
//             <h2 className="page-title">Assignment Submission</h2>
//             <p className="page-sub">Select your enrolled course and upload your completed tasks</p>
//           </div>

//           {error && <div className="alert alert-danger py-2 px-3 mb-3">{error}</div>}

//           {/* COURSE SELECT CARD */}
//           <div className="course-select-card mb-4">
//             <label className="fw-semibold text-dark me-2">Choose Course:</label>
//             <select
//               className="form-select custom-select-box"
//               value={selectedCourse}
//               onChange={(e) => setSelectedCourse(e.target.value)}
//             >
//               {courses.length === 0 ? (
//                 <option value="">No courses available</option>
//               ) : (
//                 courses.map((course) => (
//                   <option key={course.id} value={course.id}>
//                     {course.title}
//                   </option>
//                 ))
//               )}
//             </select>
//           </div>

//           {/* ASSIGNMENT TABLE */}
//           {loading ? (
//             <div className="loading-state-card">
//               <p>Loading assignments for selected course...</p>
//             </div>
//           ) : (
//             <div className="assignment-table-card">
//               <table className="custom-assignment-table">
//                 <thead>
//                   <tr>
//                     <th>Title</th>
//                     <th>Due Date</th>
//                     <th>Upload File</th>
//                     <th>Status</th>
//                     <th>Feedback</th>
//                     <th className="text-end">Action</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {assignments.length === 0 ? (
//                     <tr>
//                       <td colSpan="6" className="text-center py-4 text-muted">
//                         No assignments found for this course.
//                       </td>
//                     </tr>
//                   ) : (
//                     assignments.map((item) => (
//                       <tr key={item.id}>
//                         <td className="fw-semibold text-dark">{item.title}</td>

//                         <td className="text-muted">
//                           {item.due_date ? new Date(item.due_date).toLocaleDateString() : "-"}
//                         </td>

//                         {/* UPLOAD FORM */}
//                         <td>
//                           {(item.action === "SUBMIT" ||
//                             item.action === "RESUBMIT") && (
//                             <form
//                               className="d-flex align-items-center gap-2"
//                               onSubmit={(e) => handleSubmit(e, item.id)}
//                             >
//                               <input
//                                 type="file"
//                                 className="form-control form-control-sm"
//                                 required
//                                 onChange={(e) =>
//                                   handleFileChange(
//                                     item.id,
//                                     e.target.files[0]
//                                   )
//                                 }
//                               />

//                               <button
//                                 disabled={uploadingId === item.id}
//                                 className={
//                                   item.action === "RESUBMIT"
//                                     ? "btn-resubmit"
//                                     : "btn-submit"
//                                 }
//                               >
//                                 {uploadingId === item.id
//                                   ? "Uploading..."
//                                   : item.action === "RESUBMIT"
//                                   ? "Re-Submit"
//                                   : "Submit"}
//                               </button>
//                             </form>
//                           )}

//                           {item.action === "VIEW" && (
//                             <span className="success-text">
//                               ✔ Submitted
//                             </span>
//                           )}
//                         </td>

//                         {/* STATUS */}
//                         <td>
//                           {item.status ? (
//                             <span
//                               className={`status-pill ${
//                                 item.status === "SUCCESS"
//                                   ? "success"
//                                   : item.status === "REJECTED"
//                                   ? "rejected"
//                                   : "pending"
//                               }`}
//                             >
//                               {item.status}
//                             </span>
//                           ) : (
//                             <span className="status-pill pending">
//                               Not Submitted
//                             </span>
//                           )}
//                         </td>

//                         {/* FEEDBACK */}
//                         <td className="text-muted small">
//                           {item.feedback || "No Feedback yet"}
//                         </td>

//                         {/* ACTION */}
//                         <td className="text-end">
//                           {item.action === "RESUBMIT" && (
//                             <span className="badge bg-danger">
//                               ❌ Re-submit required
//                             </span>
//                           )}
//                           {item.action === "VIEW" && (
//                             <span className="badge bg-success">
//                               ✔ Completed
//                             </span>
//                           )}
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Assignment;




import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import axiosInstance from "../../api/axiosConfig";
import "../../styles/studentassignment.css";

const Assignment = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [assignments, setAssignments] = useState([]);

  // 🔥 STATES
  const [files, setFiles] = useState({});
  const [uploadingId, setUploadingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ======================
  // FETCH COURSES (FIXED ENDPOINT: /api/student/my-courses/)
  // ======================
  const fetchCourses = async () => {
    try {
      setError("");
      const res = await axiosInstance.get("/api/student/my-courses/");
      const data = res.data.results || res.data || [];

      // Format course list options
      const courseList = data.map((item) => ({
        id: item.course_id || item.course || item.id,
        title: item.course_title || item.title || `Course #${item.id}`,
      }));

      setCourses(courseList);
      if (courseList.length > 0) {
        setSelectedCourse(courseList[0].id);
      }
    } catch {
      setError("Failed to load courses");
    }
  };

  // ======================
  // FETCH ASSIGNMENTS (🔥 BACKEND HANDLES STATUS)
  // ======================
  const fetchAssignments = async (courseId) => {
    if (!courseId) return;

    setLoading(true);
    setError("");

    try {
      const res = await axiosInstance.get(
        `/api/assignments/student/list/?course=${courseId}`
      );
      setAssignments(res.data || []);
    } catch {
      setError("Failed to load assignments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchAssignments(selectedCourse);
    }
  }, [selectedCourse]);

  // ======================
  // FILE CHANGE
  // ======================
  const handleFileChange = (assignmentId, file) => {
    setFiles((prev) => ({
      ...prev,
      [assignmentId]: file,
    }));
  };

  // ======================
  // SUBMIT / RESUBMIT
  // ======================
  const handleSubmit = async (e, assignmentId) => {
    e.preventDefault();

    const file = files[assignmentId];
    if (!file) {
      setError("Please select a file before submitting");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("assignment", assignmentId);

    try {
      setUploadingId(assignmentId);

      await axiosInstance.post(
        "/api/assignments/student/submit/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setFiles((prev) => ({ ...prev, [assignmentId]: null }));
      fetchAssignments(selectedCourse);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          err.response?.data?.error ||
          "Submission failed"
      );
    } finally {
      setUploadingId(null);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar role="student" />
      <div className="main-content">
        <Header />

        <div className="assignment-container assignment-page-body">
          <h2>Assignment Submission</h2>
          <p>Select course and upload assignment</p>

          {error && <p className="error-text">{error}</p>}

          {/* COURSE SELECT */}
          <div className="course-select">
            <label>Choose Course:</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <p>Loading assignments...</p>
          ) : (
            <div className="assignment-table">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Due Date</th>
                    <th>Upload</th>
                    <th>Status</th>
                    <th>Feedback</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {assignments.length === 0 && (
                    <tr>
                      <td colSpan="6">No assignments found</td>
                    </tr>
                  )}

                  {assignments.map((item) => (
                    <tr key={item.id}>
                      <td>{item.title}</td>

                      <td>
                        {new Date(item.due_date).toLocaleDateString()}
                      </td>

                      {/* UPLOAD */}
                      <td>
                        {(item.action === "SUBMIT" ||
                          item.action === "RESUBMIT") && (
                          <form
                            onSubmit={(e) =>
                              handleSubmit(e, item.id)
                            }
                          >
                            <input
                              type="file"
                              required
                              onChange={(e) =>
                                handleFileChange(
                                  item.id,
                                  e.target.files[0]
                                )
                              }
                            />

                            <button
                              disabled={uploadingId === item.id}
                              className={
                                item.action === "RESUBMIT"
                                  ? "resubmit-btn"
                                  : "submit-btn"
                              }
                            >
                              {uploadingId === item.id
                                ? "Uploading..."
                                : item.action === "RESUBMIT"
                                ? "Re-Submit"
                                : "Submit"}
                            </button>
                          </form>
                        )}

                        {item.action === "VIEW" && (
                          <span className="success-text">
                            ✔ Submitted
                          </span>
                        )}
                      </td>

                      {/* STATUS */}
                      <td>
                        {item.status ? (
                          <span
                            className={`status-badge ${
                              item.status === "SUCCESS"
                                ? "success"
                                : item.status === "REJECTED"
                                ? "rejected"
                                : "pending"
                            }`}
                          >
                            {item.status}
                          </span>
                        ) : (
                          <span className="status-badge pending">
                            Not Submitted
                          </span>
                        )}
                      </td>

                      {/* FEEDBACK */}
                      <td>
                        {item.feedback || "No Feedback"}
                      </td>

                      {/* ACTION */}
                      <td>
                        {item.action === "RESUBMIT" && (
                          <span className="resubmit-text">
                            ❌ Re-submit required
                          </span>
                        )}
                        {item.action === "VIEW" && (
                          <span className="success-text">
                            ✔ Completed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assignment;