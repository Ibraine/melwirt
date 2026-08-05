import axiosInstance from "./axiosConfig";

export const fetchStudentDashboard = () =>
  axiosInstance
    .get("/api/students/dashboard/")
    .then(res => res.data);
