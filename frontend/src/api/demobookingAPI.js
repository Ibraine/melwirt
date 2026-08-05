// import axiosInstance from "./axiosConfig";

// export const fetchDemoSlots = async (params = {}) => {
//   const res = await axiosInstance.get("/api/public/demo-slots/", { params });
//   return res.data;
// };

// export const createDemoBooking = async (data) => {
//   const res = await axiosInstance.post("/api/book-demo/", data);
//   return res.data;
// };


import axiosInstance from "./axiosConfig";

// GET available demo slots
export const fetchDemoSlots = async (params = {}) => {
  const res = await axiosInstance.get("/api/booking/public/demo-slots/", { params });
  return res.data;
};

// CREATE demo booking
export const createDemoBooking = async (data) => {
  const res = await axiosInstance.post("/api/book-demo/", data);
  return res.data;
};