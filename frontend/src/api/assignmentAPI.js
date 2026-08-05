// src/api/assignmentAPI.js
import axiosInstance from "./axiosConfig"; // 🔥 SAME axios as whole project

// ===================
// TUTOR
// ===================
export const createAssignment = (data) =>
  axiosInstance.post("/api/assignments/tutor/create/", data);

// export const getTutorAssignments = () =>
//   axiosInstance.get("/api/assignments/tutor/list/");
export const getTutorAssignments = () =>
  axiosInstance.get("/api/assignments/tutor/created/");


// ===================
// STUDENT
// ===================
export const getAssignments = (courseId) =>
  axiosInstance.get("/api/assignments/student/list/", {
    params: { course: courseId },
  });

export const submitAssignment = (data) =>
  axiosInstance.post("/api/assignments/student/submit/", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ===================
// TUTOR REVIEW
// ===================
export const reviewSubmission = (id, data) =>
  axiosInstance.patch(`/api/assignments/tutor/review/${id}/`, data);

// ===================
// TUTOR SUBMISSIONS
// ===================
export const getTutorSubmissions = () =>
  axiosInstance.get("/api/assignments/tutor/submissions/");
