// src/api/adminPanelAPI.js
import axios from "axios";

const API_BASE = "https://api.melwirt.com/api/adminpanel/";

const API = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// ================================== AUTH HEADER ==================================
export const setAuthHeader = (token) => {
  if (token) API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete API.defaults.headers.common["Authorization"];
};

// ================================== USERS ==================================
export const fetchUsers = async (token, params = {}) => {
  setAuthHeader(token);
  const res = await API.get("users/", { params });
  return res.data;
};

export const fetchUser = async (token, id) => {
  setAuthHeader(token);
  const res = await API.get(`users/${id}/`);
  return res.data;
};

export const createUser = async (token, payload) => {
  setAuthHeader(token);
  const isForm = payload instanceof FormData;

  const res = await API.post(`users/`, payload, {
    headers: isForm
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" }
  });

  return res.data;
};

export const updateUser = async (token, id, payload) => {
  setAuthHeader(token);
  const isForm = payload instanceof FormData;

  const res = await API.patch(`users/${id}/`, payload, {
    headers: isForm
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" }
  });

  return res.data;
};

export const deleteUser = async (token, id) => {
  setAuthHeader(token);
  const res = await API.delete(`users/${id}/`);
  return res.data;
};

export const toggleUserStatus = async (token, id) => {
  setAuthHeader(token);
  const res = await API.post(`users/${id}/toggle_status/`);
  return res.data;
};

// ================================== PERMISSIONS ==================================
export const listPermissions = async (token) => {
  setAuthHeader(token);
  const res = await API.get("permissions/");
  return res.data;
};

export const getUserPermissions = async (token, userId) => {
  setAuthHeader(token);
  const res = await API.get(`users/${userId}/permissions/`);
  return res.data;
};

export const setUserPermissions = async (token, userId, permissionIds) => {
  setAuthHeader(token);
  const res = await API.patch(`users/${userId}/permissions/`, {
    permissions: permissionIds,
  });
  return res.data;
};

// ================================== TUTORS ==================================
export const fetchTutors = async (token, params = {}) => {
  setAuthHeader(token);
  const res = await API.get("tutors/", { params });
  return res.data;
};

export const fetchTutor = async (token, id) => {
  setAuthHeader(token);
  const res = await API.get(`tutors/${id}/`);
  return res.data;
};

export const createTutor = async (token, payload) => {
  setAuthHeader(token);
  const isForm = payload instanceof FormData;

  const res = await API.post(`tutors/`, payload, {
    headers: isForm
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" }
  });

  return res.data;
};

export const updateTutor = async (token, id, payload) => {
  setAuthHeader(token);
  const isForm = payload instanceof FormData;

  const res = await API.patch(`tutors/${id}/`, payload, {
    headers: isForm
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" }
  });

  return res.data;
};

export const deleteTutor = async (token, id) => {
  setAuthHeader(token);
  const res = await API.delete(`tutors/${id}/`);
  return res.data;
};

// ================================== DASHBOARD ==================================
export const getDashboardStats = async (token) => {
  setAuthHeader(token);
  const res = await API.get("dashboard-stats/");
  return res.data;
};
