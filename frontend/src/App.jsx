// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "./context/AuthContext";

// // Routes
// import AdminRoutes from "./routes/AdminRoutes";
// import StudentRoutes from "./routes/StudentRoutes";
// import TutorRoutes from "./routes/TutorRoutes";

// // Pages
// import Landing from "./pages/Landing";
// import DemoBooking from "./pages/DemoBooking";
// import SuccessPage from "./pages/SuccessPage";

// // Logins
// import AdminLogin from "./pages/Admin/AdminLogin";
// import TutorLogin from "./pages/Tutor/TutorLogin";
// import StudentLogin from "./pages/Student/StudentLogin";
// import Register from "./pages/Register";

// // ✅ FORGOT PASSWORD (AUTH FOLDER SE)
// import ForgotPassword from "./pages/auth/ForgotPassword";
// import VerifyOTP from "./pages/auth/VerifyOTP";
// import ResetPassword from "./pages/auth/ResetPassword";

// // 📝 Courses Pages
// import PythonCourses from "./pages/PythonCourses";
// import RoboticCourses from "./pages/RoboticCourses"; // ⚠ Corrected name
// import PublicSpeakingCourses from "./pages/PublicSpeakingCourses";
// import CourseDetail from "./pages/CourseDetail";

// function App() {
//   const { user, loading } = useContext(AuthContext || {});

//   if (loading) return <div>Loading...</div>;

//   const role =
//     (user && (user.role || (user.user && user.user.role))) || null;

//   let baseRoute = "/";
//   if (role === "admin") baseRoute = "/admin/dashboard";
//   else if (role === "student") baseRoute = "/student/dashboard";
//   else if (role === "tutor") baseRoute = "/tutor/dashboard";

//   return (
//     <Router>
//       <Routes>
//         {/* 🌐 PUBLIC ROUTES */}
//         {!role && (
//           <>
//             {/* Landing & Demo */}
//             <Route path="/" element={<Landing />} />
//             <Route path="/demo" element={<DemoBooking />} />
//             <Route path="/success" element={<SuccessPage />} />

//             {/* Courses */}
//             <Route path="/courses/python" element={<PythonCourses />} />
//             <Route path="/courses/robotics" element={<RoboticCourses />} />  // ⚠ Name updated
//             <Route path="/courses/public-speaking" element={<PublicSpeakingCourses />} />
//              <Route path="/courses/:courseSlug" element={<CourseDetail />} />

//             {/* Logins */}
//             <Route path="/admin/login" element={<AdminLogin />} />
//             <Route path="/tutor/login" element={<TutorLogin />} />
//             <Route path="/student/login" element={<StudentLogin />} />
//             <Route path="/student/register" element={<Register />} />

//             {/* 🔥 FORGOT FLOW */}
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//             <Route path="/verify-otp" element={<VerifyOTP />} />
//             <Route path="/reset-password" element={<ResetPassword />} />
//           </>
//         )}

//         {/* ROLE BASED */}
//         {role === "admin" && <Route path="/admin/*" element={<AdminRoutes />} />}
//         {role === "student" && <Route path="/student/*" element={<StudentRoutes />} />}
//         {role === "tutor" && <Route path="/tutor/*" element={<TutorRoutes />} />}

//         {/* FALLBACK */}
//         <Route path="*" element={<Navigate to={baseRoute} replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;




import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

// Routes
import AdminRoutes from "./routes/AdminRoutes";
import StudentRoutes from "./routes/StudentRoutes";
import TutorRoutes from "./routes/TutorRoutes";

// Pages
import Landing from "./pages/Landing";
import DemoBooking from "./pages/DemoBooking";
import SuccessPage from "./pages/SuccessPage";

// Logins
import AdminLogin from "./pages/Admin/AdminLogin";
import TutorLogin from "./pages/Tutor/TutorLogin";
import StudentLogin from "./pages/Student/StudentLogin";
import Register from "./pages/Register";

// Forgot flow
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyOTP from "./pages/auth/VerifyOTP";
import ResetPassword from "./pages/auth/ResetPassword";

// Courses Pages
import PythonCourses from "./pages/PythonCourses";
import RoboticCourses from "./pages/RoboticCourses";
import PublicSpeakingCourses from "./pages/PublicSpeakingCourses";
import CourseDetail from "./pages/CourseDetail";

function App() {
  const { user, loading } = useContext(AuthContext || {});

  if (loading) return <div>Loading...</div>;

  const role =
    (user && (user.role || (user.user && user.user.role))) || null;

  let baseRoute = "/";
  if (role === "admin") baseRoute = "/admin/dashboard";
  else if (role === "student") baseRoute = "/student/dashboard";
  else if (role === "tutor") baseRoute = "/tutor/dashboard";

  return (
    <Router>
      <Routes>

        {!role && (
          <>
            <Route path="/" element={<Landing />} />
            <Route path="/demo" element={<DemoBooking />} />
            <Route path="/success" element={<SuccessPage />} />

            {/* Course Lists */}
            {/* <Route path="/courses/python" element={<PythonCourses />} />
            <Route path="/courses/robotics" element={<RoboticCourses />} />
            <Route path="/courses/public-speaking" element={<PublicSpeakingCourses />} /> */}

            {/* ✅ FIXED Course Detail Route */}
            <Route path="/courses/:category/:courseId" element={<CourseDetail />} />

            {/* Auth */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/tutor/login" element={<TutorLogin />} />
            <Route path="/student/login" element={<StudentLogin />} />
            <Route path="/student/register" element={<Register />} />

            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </>
        )}

        {role === "admin" && <Route path="/admin/*" element={<AdminRoutes />} />}
        {role === "student" && <Route path="/student/*" element={<StudentRoutes />} />}
        {role === "tutor" && <Route path="/tutor/*" element={<TutorRoutes />} />}

        <Route path="*" element={<Navigate to={baseRoute} replace />} />

      </Routes>
    </Router>
  );
}

export default App;
