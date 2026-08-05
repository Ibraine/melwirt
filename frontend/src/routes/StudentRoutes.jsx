import { Routes, Route } from "react-router-dom";
import StudentLayout from "../layout/StudentLayout";
import Dashboard from "../pages/Student/Dashboard";
import Assignment from "../pages/Student/Assignment";
import Chats from "../pages/Student/Chats";
import MyClasses from "../pages/Student/MyClasses";
import RescheduleClass from "../pages/Student/RescheduleClass";
import MyCourses from "../pages/Student/MyCourses";
import Profile from "../pages/Student/Profile";
import Referral from "../pages/Student/Referral";
import CourseContent from "../pages/Student/CourseContent"; // ✅ ADD THIS
import ReSubmitAssignment from "../pages/Student/ReSubmitAssignment"; // ✅ NEW
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyOTP from "../pages/auth/VerifyOTP";
import ResetPassword from "../pages/auth/ResetPassword";


export default function StudentRoutes() {
  console.log("✅ StudentRoutes Loaded");

  return (
    <Routes>
      <Route path="/" element={<StudentLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="assignment" element={<Assignment />} />
        <Route path="assignment/resubmit/:assignmentId" element={<ReSubmitAssignment />} /> {/* ✅ NEW */}

        <Route path="chats" element={<Chats />} />

        <Route path="my-courses" element={<MyCourses />} />

        {/* ✅ THIS WAS MISSING */}
        <Route path="course/:courseId" element={<CourseContent />} />

        <Route path="my-classes" element={<MyClasses />} />
        <Route path="reschedule/:scheduleId"element={<RescheduleClass />}/>
        <Route path="profile" element={<Profile />} />
        <Route path="referral" element={<Referral />} />        
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />

    
      </Route>
    </Routes>
  );
}
