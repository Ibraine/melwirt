// import React, { useState, useContext } from "react";
// import { loginUser } from "../../api/auth";
// import { AuthContext } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const StudentLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const data = await loginUser({ email, password });

//       if (data.user.role !== "student") {
//         setError("You are not authorized to access Student Dashboard!");
//         return;
//       }

//       login(data);
//       navigate("/student/dashboard"); // ✅ FIXED REDIRECT
//     } catch {
//       setError("Invalid credentials!");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white shadow-lg p-8 rounded-xl w-96">
//         <h2 className="text-2xl font-bold mb-5 text-center">Student Login</h2>
//         {error && <p className="text-red-500 text-center">{error}</p>}

//         <label className="block mb-2 font-semibold text-sm">Email</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-2 border rounded mb-3"
//           required
//         />

//         <label className="block mb-2 font-semibold text-sm">Password</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 border rounded mb-5"
//           required
//         />

//         <button type="submit" className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default StudentLogin;


// import React, { useState, useContext } from "react";
// import { loginUser } from "../../api/auth";
// import { AuthContext } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const StudentLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const data = await loginUser({ email, password });

//       if (data.user.role !== "student") {
//         setError("You are not authorized to access Student Dashboard!");
//         return;
//       }

//       login(data);
//       navigate("/student/dashboard");
//     } catch (err) {
//       setError("Invalid credentials!");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-lg p-8 rounded-xl w-96"
//       >
//         <h2 className="text-2xl font-bold mb-5 text-center">
//           Student Login
//         </h2>

//         {error && (
//           <p className="text-red-500 text-center mb-3">{error}</p>
//         )}

//         <label className="block mb-2 font-semibold text-sm">Email</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-2 border rounded mb-3"
//           required
//         />

//         <label className="block mb-2 font-semibold text-sm">
//           Password
//         </label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 border rounded mb-5"
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
//         >
//           Login
//         </button>

//         {/* 🔥 Forgot Password */}
//         <p className="text-sm text-center mt-4">
//           <span
//             className="text-blue-600 cursor-pointer hover:underline"
//             onClick={() => navigate("/forgot-password")}
//           >
//             Forgot Password?
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default StudentLogin;

// import React, { useState, useContext } from "react";
// import { loginUser } from "../../api/auth";
// import { AuthContext } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import studentBg from "../../assets/studentlogin.png";
// import logo from "../../assets/logo.png";
// import "../../styles/adminlogin.css";

// export default function StudentLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const data = await loginUser({ email, password });
//       if (data.user.role !== "student") {
//         setError("You are not authorized to access Student Dashboard!");
//         return;
//       }
//       login(data);
//       navigate("/student/dashboard");
//     } catch {
//       setError("Invalid credentials!");
//     }
//   };

//   return (
//     <div
//       className="admin-login-wrapper"
//       style={{
//         backgroundImage: `url(${studentBg})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="login-right-card">
//         <img src={logo} alt="logo" className="login-logo" />
//         <p className="login-desc">
//           Start learning robotics with fun lessons and exciting projects!
//         </p>

//         {error && <p className="text-red-500 text-center">{error}</p>}

//         <form onSubmit={handleSubmit}>
//           <div className="input-group">
//             <label>Enter Email Address</label>
//             <input
//               type="email"
//               placeholder="Enter Email ID"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="input-group">
//             <label>Enter Password</label>
//             <input
//               type="password"
//               placeholder="Enter Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button className="submit-btn" type="submit">
//             Login
//           </button>
//         </form>

//         {/* <p className="forgot-text">
//           <span onClick={() => navigate("/forgot-password")}>
//             Forgot Password?
//           </span>
//         </p> */}
//       </div>
//     </div>
//   );
// }



import React, { useState, useContext } from "react";
import { loginUser } from "../../api/auth";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import studentBg from "../../assets/studentlogin.png";
import logo from "../../assets/logo.png";
import "../../styles/adminlogin.css";

export default function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 🔹 Eye toggle state
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser({ email, password });
      if (data.user.role !== "student") {
        setError("You are not authorized to access Student Dashboard!");
        return;
      }
      login(data);
      navigate("/student/dashboard");
    } catch {
      setError("Invalid credentials!");
    }
  };

  return (
    <div
      className="admin-login-wrapper"
      style={{
        backgroundImage: `url(${studentBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="login-right-card">
        <img src={logo} alt="Melwirt Logo" className="login-logo" />

        <p className="login-desc">
          Start learning robotics with fun lessons and exciting projects!
        </p>

        {error && <p className="error-msg mb-3">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="input-group-custom">
            <label>Enter Email Address</label>
            <input
              type="email"
              placeholder="Enter Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input with Eye Toggle */}
          <div className="input-group-custom">
            <label>Enter Passwords</label>
            <div className="password-input-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Passwords"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.45 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Orange Pill Submit Button */}
          <button className="admin-login-submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}