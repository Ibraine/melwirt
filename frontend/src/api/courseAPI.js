// // src/api/courseAPI.js
// import axios from "axios";

// const API_BASE = "https://api.melwirt.com/api/";

// export const fetchCourses = async () => {
//   try {
//     const response = await axios.get(`${API_BASE}courses/`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching courses:", error);
//     return [];
//   }
// };


// // src/api/courseAPI.js
// import axiosInstance from "./axiosConfig";

// export const fetchCourses = async () => {
//   try {
//     const res = await axiosInstance.get("/api/courses/");
//     return res.data;
//   } catch (err) {
//     console.error("Error fetching courses:", err);
//     return [];
//   }
// };


// // PUBLIC COURSES (demo booking page)
// export const fetchPublicCourses = async () => {
//   try {
//     const res = await axiosInstance.get("/api/public/courses/");
//     return res.data;
//   } catch (err) {
//     console.error("Error fetching public courses:", err);
//     return [];
//   }
// };



// // PUBLIC TUTORS (demo booking page)

// export const fetchPublicTutors = async (courseId) => {
//   try {

//     const res = await axiosInstance.get(
//       `/api/public/tutors/?course_id=${courseId}`
//     );

//     return res.data;

//   } catch (err) {

//     console.error("Error fetching tutors:", err);
//     return [];

//   }
// };

// // export const fetchStudentCourses = async () => {
// //   try {
// //     const res = await axiosInstance.get("/api/student/courses/");
// //     return res.data;
// //   } catch (err) {
// //     console.error("Error fetching student courses:", err);
// //     return [];
// //   }
// // };





// src/api/courseAPI.js
import axiosInstance from "./axiosConfig";

export const fetchCourses = async () => {
  try {
    const res = await axiosInstance.get("/api/courses/");
    return res.data;
  } catch (err) {
    console.error("Error fetching courses:", err);
    return [];
  }
};

// PUBLIC COURSES (demo booking page)
export const fetchPublicCourses = async () => {
  try {
    const res = await axiosInstance.get("/api/public/courses/");
    return res.data;
  } catch (err) {
    console.error("Error fetching public courses:", err);
    return [];
  }
};

// PUBLIC TUTORS (demo booking page)
export const fetchPublicTutors = async (courseId) => {
  try {
    const res = await axiosInstance.get(
      `/api/public/tutors/?course_id=${courseId}`
    );
    return res.data;
  } catch (err) {
    console.error("Error fetching tutors:", err);
    return [];
  }
};

// 🔹 STUDENT ENROLLED COURSES (Fixed Endpoint)
export const fetchStudentCourses = async () => {
  try {
    const res = await axiosInstance.get("/api/student/my-courses/");
    return res.data.results || res.data || [];
  } catch (err) {
    console.error("Error fetching student courses:", err);
    return [];
  }
};