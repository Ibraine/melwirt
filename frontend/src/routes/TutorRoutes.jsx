// src/routes/TutorRoutes.jsx
import { Routes, Route } from "react-router-dom";
import TutorLayout from "../layout/TutorLayout";
import Dashboard from "../pages/Tutor/Dashboard";
import Assignment from "../pages/Tutor/Assignment";
import Chats from "../pages/Tutor/Chats";
import MyClasses from "../pages/Tutor/MyClasses";
import MyCourses from "../pages/Tutor/MyCourses";
import Profile from "../pages/Tutor/Profile";
import Referral from "../pages/Tutor/Referral";
import CourseContent from "../pages/Tutor/CourseContent"; // ✅ NEW ADDED
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyOTP from "../pages/auth/VerifyOTP";
import ResetPassword from "../pages/auth/ResetPassword";


export default function TutorRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TutorLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="assignment" element={<Assignment />} />
        <Route path="chats" element={<Chats />} />

        <Route path="my-courses" element={<MyCourses />} />

        {/* ✅ NEW ROUTE: course content page */}
        <Route path="course/:courseId" element={<CourseContent />} />

        <Route path="my-classes" element={<MyClasses />} />
        <Route path="profile" element={<Profile />} />
        <Route path="referral" element={<Referral />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>
    </Routes>
  );
}
