import axios from "axios";

const API_URL = "https://api.melwirt.com/api/accounts/";

export const registerUser = async (data) => {
  const res = await axios.post(`${API_URL}register/`, data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await axios.post(`${API_URL}login/`, data);
  if (res.data.access) {
    localStorage.setItem("token", res.data.access); // JWT save
    localStorage.setItem("refresh", res.data.refresh); // 🔥 refresh token
  }
  return res.data;
};

// 🔁 NEW – Forgot Password
export const forgotPassword = async (email) => {
  const res = await axios.post(`${API_URL}forgot-password/`, { email });
  return res.data;
};

// 🔢 NEW – Verify OTP
export const verifyOTP = async (email, otp) => {
  const res = await axios.post(`${API_URL}verify-otp/`, { email, otp });
  return res.data; // { reset_token }
};

// 🔐 NEW – Reset Password
export const resetPassword = async (reset_token, new_password) => {
  const res = await axios.post(`${API_URL}reset-password/`, {
    reset_token,
    new_password,
  });
  return res.data;
};

