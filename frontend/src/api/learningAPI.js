import axiosInstance from "./axiosConfig";

// ===============================
// STUDENT - MY COURSES (Learning)
// ===============================
export const fetchMyLearningCourses = async () => {
  const res = await axiosInstance.get("/api/my-classes/");
  return res.data;
};

// ===============================
// COURSE CONTENT (Modules + Sessions)
// ===============================
export const fetchCourseContent = async (courseId) => {
  const res = await axiosInstance.get(
    `/api/courses/${courseId}/content/`
  );
  return res.data;
};

// ===============================
// SESSION DETAIL (🔥 MAIN API)
// ===============================
export const fetchSessionDetail = async (sessionId) => {
  const res = await axiosInstance.get(
    `/api/session/${sessionId}/`
  );
  return res.data;
};

// ===============================
// ADMIN / TUTOR - ADD SUMMARY
// ===============================
export const addSessionSummary = async (data) => {
  const res = await axiosInstance.post(
    "/api/session-summary/",
    data
  );
  return res.data;
};

// ===============================
// ADMIN / TUTOR - ADD CONTENT (VIDEO)
// ===============================
export const addSessionContent = async (data) => {
  const res = await axiosInstance.post(
    "/api/session-content/",
    data
  );
  return res.data;
};