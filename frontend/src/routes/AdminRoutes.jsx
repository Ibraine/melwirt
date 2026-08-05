import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";

// Admin Pages
import Dashboard from "../pages/Admin/Dashboard";
import AllUsers from "../pages/Admin/AllUsers";
import TeacherList from "../pages/Admin/TeacherList";
import StudentList from "../pages/Admin/StudentList";
import EditTeacher from "../pages/Admin/EditTeacher";
import EditStudent from "../pages/Admin/EditStudent";
import Courses from "../pages/Admin/Courses";
import CourseContent from "../pages/Admin/CourseContent";
import MyClasses from "../pages/Admin/MyClasses";
import Enrollment from "../pages/Admin/Enrollment"; 
import DemoBooking from "../pages/Admin/DemoBooking";
import UpdateSchedule from "../pages/Admin/UpdateSchedule";
import Coupons from "../pages/Admin/Coupons";
import Referral from "../pages/Admin/Referral";
import Chats from "../pages/Admin/Chats";
import Profile from "../pages/Admin/Profile";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyOTP from "../pages/auth/VerifyOTP";
import ResetPassword from "../pages/auth/ResetPassword";



export default function AdminRoutes() {
  console.log("✅ AdminRoutes Loaded");

  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        {/* Dashboard */}
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />

        {/* Users */}
        <Route path="users" element={<AllUsers />} />
        <Route path="teachers" element={<TeacherList />} />
        <Route path="students" element={<StudentList />} />
        <Route path="edit-teacher/:id" element={<EditTeacher />} />
        <Route path="edit-student/:id" element={<EditStudent />} />

        {/* Courses */}
        <Route path="courses" element={<Courses />} />
        <Route
          path="courses/:courseId/content"
          element={<CourseContent />}
        />

        {/* 🔹 Enrollments */}
        <Route path="enrollment" element={<Enrollment />} />

        {/* Other */}
        <Route path="demo-booking" element={<DemoBooking />} />
        <Route
          path="update-schedule/:bookingId"
          element={<UpdateSchedule />}
        />
         <Route path="my-classes" element={<MyClasses />} />
        <Route path="coupons" element={<Coupons />} />
        <Route path="referral" element={<Referral />} />
        <Route path="chats" element={<Chats />} />
        <Route path="profile" element={<Profile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />

      
      
      </Route>
    </Routes>
  );
}
