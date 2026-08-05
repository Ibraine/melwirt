// src/api/profileAPI.js
import axiosInstance from "./axiosConfig";

const BASE = "/api/profile";

export const fetchMyProfile = () =>
  axiosInstance.get(`${BASE}/me/`).then((res) => res.data);

export const updateMyProfile = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    const val = data[key];
    // Only append non-null/undefined
    if (val !== null && val !== undefined) {
      formData.append(key, val);
    }
  });

  return axiosInstance.put(`${BASE}/update_me/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }).then((res) => res.data);
};

// New: explicit delete-image endpoint (POST)
export const deleteProfileImage = () =>
  axiosInstance.post(`${BASE}/delete_image/`).then((res) => res.data);
