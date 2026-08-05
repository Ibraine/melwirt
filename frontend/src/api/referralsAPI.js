// src/api/referralsAPI.js
import axiosInstance from "./axiosConfig";

// =======================
// Admin APIs
// =======================
export const fetchAdminReferrals = (params = {}) =>
  axiosInstance
    .get("/api/adminpanel/referrals/", { params })
    .then((res) => res.data);

export const updateReferral = (id, data) =>
  axiosInstance
    .patch(`/api/adminpanel/referrals/${id}/`, data)
    .then((res) => res.data);

export const deleteReferral = (id) =>
  axiosInstance
    .delete(`/api/adminpanel/referrals/${id}/`)
    .then((res) => res.data);

// =======================
// Tutor APIs (READ ONLY)
// =======================
export const fetchTutorReferrals = () =>
  axiosInstance
    .get("/api/referrals/")
    .then((res) => res.data);

// =======================
// Student APIs (SUMMARY)
// =======================
export const fetchStudentReferralSummary = () =>
  axiosInstance
    .get("/api/referrals/student-summary/")
    .then((res) => res.data);
