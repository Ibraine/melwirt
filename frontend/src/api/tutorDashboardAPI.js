import axiosInstance from "./axiosConfig";

export const fetchTutorDashboard = () =>
  axiosInstance.get("/api/tutors/dashboard/")
    .then(res => res.data);
