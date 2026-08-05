import axiosInstance from "./axiosConfig"; // existing axios config

// // Admin - Full CRUD
// export const fetchEnrollments = (params = {}) =>
//   axiosInstance
//     .get("/api/enrollments/", { params })
//     .then((res) => res.data);

// export const createEnrollment = (data) =>
//   axiosInstance
//     .post("/api/enrollments/", data)
//     .then((res) => res.data);

// export const updateEnrollment = (id, data) =>
//   axiosInstance
//     .patch(`/api/enrollments/${id}/`, data)
//     .then((res) => res.data);

// export const deleteEnrollment = (id) =>
//   axiosInstance
//     .delete(`/api/enrollments/${id}/`)
//     .then((res) => res.data);

// // Student - Only own enrollments
// export const fetchStudentEnrollments = () =>
//   axiosInstance
//     .get("/api/enrollments/student/")
//     .then((res) => res.data);


export const fetchEnrollments = (params = {}) =>
  axiosInstance
    .get("/api/adminpanel/enrollments/", { params })
    .then(res => res.data);

export const createEnrollment = (data) =>
  axiosInstance
    .post("/api/adminpanel/enrollments/", data)
    .then(res => res.data);

export const updateEnrollment = (id, data) =>
  axiosInstance
    .patch(`/api/adminpanel/enrollments/${id}/`, data)
    .then(res => res.data);

export const deleteEnrollment = (id) =>
  axiosInstance
    .delete(`/api/adminpanel/enrollments/${id}/`)
    .then(res => res.data);

export const fetchStudentEnrollments = () =>
  axiosInstance
    .get("/api/adminpanel/enrollments/student/")
    .then(res => res.data);
export const fetchStudentMyCourses = async () => {
  try {
    const res = await axiosInstance.get("/api/student/my-courses/");
    return res.data;
  } catch (err) {
    console.error("Error fetching student my courses:", err);
    return [];
  }
};
