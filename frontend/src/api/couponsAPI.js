import axiosInstance from "./axiosConfig"; // <— using global axios with token auto-attached

const API_BASE = "/api/adminpanel/"; 
// axiosConfig already adds https://api.melwirt.com

// ===================== COUPONS =====================

// fetch all coupons
export const fetchCoupons = () =>
  axiosInstance.get(API_BASE + "coupons/").then((r) => r.data);

// fetch single coupon
export const fetchCoupon = (id) =>
  axiosInstance.get(API_BASE + `coupons/${id}/`).then((r) => r.data);

// create coupon
export const createCoupon = (payload) =>
  axiosInstance.post(API_BASE + "coupons/", payload).then((r) => r.data);

// update coupon
export const updateCoupon = (id, payload) =>
  axiosInstance.patch(API_BASE + `coupons/${id}/`, payload).then((r) => r.data);

// delete coupon
export const deleteCoupon = (id) =>
  axiosInstance.delete(API_BASE + `coupons/${id}/`).then((r) => r.data);

// toggle coupon on/off
export const toggleCouponStatus = (id) =>
  axiosInstance.post(API_BASE + `coupons/${id}/toggle_status/`, {})
    .then((r) => r.data);
