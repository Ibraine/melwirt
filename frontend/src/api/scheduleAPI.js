import axiosInstance from "./axiosConfig";

// -------------------------------
// CORRECT BASE URL for TUTOR APIs
// -------------------------------
const BASE = "/api/tutors/schedules/";

// ===============================
// COURSES
// ===============================
export const fetchCourses = () =>
  axiosInstance.get("/api/courses/").then((res) => res.data);

// ===============================
// STUDENTS  ✅ (YE NAYA ADD KARNA HAI)
// ===============================
export const fetchStudents = () =>
  axiosInstance.get("/api/students/").then((res) => res.data);

// ===============================
// 1) Tutor — Create Slot
// ===============================
export const createSlot = (data) =>
  axiosInstance.post(BASE, data).then((res) => res.data);

// ===============================
// 2) Tutor — Upcoming Classes
// ===============================
export const fetchTutorUpcoming = () =>
  axiosInstance.get(`${BASE}tutor/upcoming/`).then((res) => res.data);

// ===============================
// 3) Tutor — Past Classes
// ===============================
export const fetchTutorPast = () =>
  axiosInstance.get(`${BASE}tutor/past/`).then((res) => res.data);

// ===============================
// 4) Get all schedules
// ===============================
export const fetchSchedules = (params = {}) =>
  axiosInstance.get(BASE, { params }).then((res) => res.data);

// ===============================
// 5) Get one slot
// ===============================
export const fetchSlot = (id) =>
  axiosInstance.get(`${BASE}${id}/`).then((res) => res.data);

// ===============================
// 6) Student — Book slot
// ===============================
export const bookSlot = (id) =>
  axiosInstance.post(`${BASE}${id}/book/`).then((res) => res.data);



// api/scheduleAPI.js (existing file)

// 🔥 ADMIN CREATE SLOT
export const createAdminSlot = (data) =>
  axiosInstance.post("/api/adminpanel/schedules/", data).then(res => res.data);

// 🔥 ADMIN UPCOMING
export const fetchAdminUpcoming = () =>
  axiosInstance.get("/api/adminpanel/schedules/admin/upcoming/").then(res => res.data);

// 🔥 ADMIN PAST
export const fetchAdminPast = () =>
  axiosInstance.get("/api/adminpanel/schedules/admin/past/").then(res => res.data);

// 🔥 ADMIN ALL SCHEDULES (optional)
export const fetchAdminSchedules = (params = {}) =>
  axiosInstance.get("/api/adminpanel/schedules/", { params }).then(res => res.data);

// ================= TUTORS =================
export const fetchTutors = async () => {
  const res = await fetch("/api/tutors/");
  if (!res.ok) throw new Error("Failed to fetch tutors");
  return res.json();
};


// ===============================
// COURSE → TUTOR
// ===============================
export const fetchTutorByCourse = (courseId) =>
  axiosInstance
    .get(`/api/courses/${courseId}/tutor/`)
    .then((res) => res.data);


// ===============================
// STUDENT RESCHEDULE
// ===============================

// ✅ Get available reschedule slots
export const fetchRescheduleSlots = (scheduleId) =>
  axiosInstance
    .get(`/api/adminpanel/schedules/${scheduleId}/reschedule-slots/`)
    .then((res) => res.data);


// ✅ Reschedule class
// export const rescheduleClass = (scheduleId, newSlotId) =>
//   axiosInstance
//     .post(`/api/adminpanel/schedules/${scheduleId}/reschedule/`, {
//       new_slot_id: newSlotId,
//     })
//     .then((res) => res.data);

export const rescheduleClass = (scheduleId, newSlotId) =>
  axiosInstance
    .post(
      `/api/adminpanel/schedules/${scheduleId}/confirm-reschedule/`,
      {
        new_slot_id: newSlotId,
      }
    )
    .then((res) => res.data);