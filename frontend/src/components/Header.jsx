// import React from "react";
// import "../styles/header.css";

// // Local images
// import adminImg from "../assets/admin profile.png";
// import studentImg from "../assets/student profile.png";
// import tutorImg from "../assets/tutor profile.png";

// const Header = ({ role = "admin" }) => {
//   const roleText = {
//     admin: "Home - Admin",
//     student: "Home - Student",
//     tutor: "Home - Tutor",
//   };

//   const profileImages = {
//     admin: adminImg,
//     student: studentImg,
//     tutor: tutorImg,
//   };

//   return (
//     <header className="custom-header d-flex justify-content-between align-items-center px-4 py-2">
//       {/* Left Side */}
//       <div className="header-left d-flex flex-column">
//         <h4 className="mb-0 text-white">Dashboard</h4>
//         <small className="text-white-50">{roleText[role]}</small>
//       </div>

//       {/* Right Side */}
//       <nav className="nav-links d-flex align-items-center gap-4">
//         <a href="#" className="text-white text-decoration-none">Home</a>
//         <a href="#" className="text-white text-decoration-none">About us</a>
//         <a href="#" className="text-white text-decoration-none">My Courses</a>

//         {/* Profile Pic */}
//         <img
//           src={profileImages[role]}
//           alt="profile"
//           className="rounded-circle profile-img"
//         />
//       </nav>
//     </header>
//   );
// };

// export default Header;



// import React, { useState, useEffect } from "react";
// import "../styles/header.css";

// // Local images fallback
// import adminImg from "../assets/admin profile.png";
// import studentImg from "../assets/student profile.png";
// import tutorImg from "../assets/tutor profile.png";

// const Header = ({ role = "admin" }) => {
//   const roleText = {
//     admin: "Home - Admin",
//     student: "Home - Student",
//     tutor: "Home - Tutor",
//   };

//   const defaultProfileImages = {
//     admin: adminImg,
//     student: studentImg,
//     tutor: tutorImg,
//   };

//   const [headerPic, setHeaderPic] = useState(
//     localStorage.getItem("user_profile_img") || defaultProfileImages[role]
//   );

//   // 🔹 Live Event Listener for Profile Image Update
//   useEffect(() => {
//     const updateHeaderImage = () => {
//       const savedImg = localStorage.getItem("user_profile_img");
//       setHeaderPic(savedImg || defaultProfileImages[role]);
//     };

//     updateHeaderImage();

//     // Listen to custom event fired by Profile.jsx
//     window.addEventListener("profileImageUpdated", updateHeaderImage);
//     return () => window.removeEventListener("profileImageUpdated", updateHeaderImage);
//   }, [role]);

//   return (
//     <header className="custom-header d-flex justify-content-between align-items-center px-4 py-2">
//       {/* Left Side */}
//       <div className="header-left d-flex flex-column">
//         <h4 className="mb-0 text-white">Dashboard</h4>
//         <small className="text-white-50">{roleText[role]}</small>
//       </div>

//       {/* Right Side Nav Links & Avatar */}
//       <nav className="nav-links d-flex align-items-center gap-4">
//         <a href="#" className="text-white text-decoration-none">Home</a>
//         <a href="#" className="text-white text-decoration-none">About us</a>
//         <a href="#" className="text-white text-decoration-none">My Courses</a>

//         {/* Profile Pic with Automatic Fallback */}
//         <img
//           src={headerPic}
//           alt="profile"
//           className="rounded-circle profile-img"
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = defaultProfileImages[role];
//           }}
//         />
//       </nav>
//     </header>
//   );
// };

// export default Header;



// import React, { useState, useEffect } from "react";
// import "../styles/header.css";
// import { fetchMyProfile } from "../api/profileAPI";

// // Local images fallback
// import adminImg from "../assets/admin profile.png";
// import studentImg from "../assets/student profile.png";
// import tutorImg from "../assets/tutor profile.png";

// const Header = ({ role = "admin" }) => {
//   const roleText = {
//     admin: "Home - Admin",
//     student: "Home - Student",
//     tutor: "Home - Tutor",
//   };

//   const defaultProfileImages = {
//     admin: adminImg,
//     student: studentImg,
//     tutor: tutorImg,
//   };

//   const [headerPic, setHeaderPic] = useState(defaultProfileImages[role]);

//   // 🔹 Fetch & Sync Saved Profile Photo Across All Pages
//   useEffect(() => {
//     const loadHeaderImage = async () => {
//       const savedImg = localStorage.getItem("user_profile_img");

//       // 1. If valid HTTP image URL exists in storage, use it
//       if (savedImg && !savedImg.startsWith("blob:")) {
//         setHeaderPic(savedImg);
//         return;
//       }

//       // 2. Fetch directly from backend API
//       try {
//         const data = await fetchMyProfile();
//         if (data?.profile_image) {
//           let fullImg = data.profile_image;
//           if (!fullImg.startsWith("http://") && !fullImg.startsWith("https://")) {
//             fullImg = `http://127.0.0.1:8000${fullImg.startsWith("/") ? "" : "/"}${fullImg}`;
//           }
//           localStorage.setItem("user_profile_img", fullImg);
//           setHeaderPic(fullImg);
//         } else {
//           setHeaderPic(defaultProfileImages[role]);
//         }
//       } catch (err) {
//         console.error("Header image load error:", err);
//         setHeaderPic(defaultProfileImages[role]);
//       }
//     };

//     loadHeaderImage();

//     // Event listener when profile is updated from Profile.jsx
//     window.addEventListener("profileImageUpdated", loadHeaderImage);
//     return () => window.removeEventListener("profileImageUpdated", loadHeaderImage);
//   }, [role]);

//   return (
//     <header className="custom-header d-flex justify-content-between align-items-center px-4 py-2">
//       {/* Left Side */}
//       <div className="header-left d-flex flex-column">
//         <h4 className="mb-0 text-white">Dashboard</h4>
//         <small className="text-white-50">{roleText[role]}</small>
//       </div>

//       {/* Right Side Nav Links & Avatar */}
//       <nav className="nav-links d-flex align-items-center gap-4">
//         <a href="#" className="text-white text-decoration-none">Home</a>
//         <a href="#" className="text-white text-decoration-none">About us</a>
//         <a href="#" className="text-white text-decoration-none">My Courses</a>

//         {/* Profile Pic with Automatic Fallback */}
//         <img
//           src={headerPic}
//           alt="profile"
//           className="rounded-circle profile-img"
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = defaultProfileImages[role];
//           }}
//         />
//       </nav>
//     </header>
//   );
// };

// export default Header;


import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/header.css";
import { fetchMyProfile } from "../api/profileAPI";

// Local images fallback
import adminImg from "../assets/admin profile.png";
import studentImg from "../assets/student profile.png";
import tutorImg from "../assets/tutor profile.png";

const Header = ({ role: customRole }) => {
  const location = useLocation();

  // 🔹 SMART ROLE DETECTION: Automatically detects role from URL path
  const currentRole = location.pathname.startsWith("/tutor")
    ? "tutor"
    : location.pathname.startsWith("/student")
    ? "student"
    : customRole || "admin";

  const roleText = {
    admin: "Home - Admin",
    student: "Home - Student",
    tutor: "Home - Tutor",
  };

  const defaultProfileImages = {
    admin: adminImg,
    student: studentImg,
    tutor: tutorImg,
  };

  const [headerPic, setHeaderPic] = useState(defaultProfileImages[currentRole]);

  // Fetch & Sync Saved Profile Photo
  useEffect(() => {
    const loadHeaderImage = async () => {
      const savedImg = localStorage.getItem("user_profile_img");

      if (savedImg && !savedImg.startsWith("blob:")) {
        setHeaderPic(savedImg);
        return;
      }

      try {
        const data = await fetchMyProfile();
        if (data?.profile_image) {
          let fullImg = data.profile_image;
          if (!fullImg.startsWith("http://") && !fullImg.startsWith("https://")) {
            fullImg = `http://127.0.0.1:8000${fullImg.startsWith("/") ? "" : "/"}${fullImg}`;
          }
          localStorage.setItem("user_profile_img", fullImg);
          setHeaderPic(fullImg);
        } else {
          setHeaderPic(defaultProfileImages[currentRole]);
        }
      } catch (err) {
        setHeaderPic(defaultProfileImages[currentRole]);
      }
    };

    loadHeaderImage();

    window.addEventListener("profileImageUpdated", loadHeaderImage);
    return () => window.removeEventListener("profileImageUpdated", loadHeaderImage);
  }, [currentRole]);

  return (
    <header className="custom-header d-flex justify-content-between align-items-center px-4 py-2">
      {/* Left Side */}
      <div className="header-left d-flex flex-column">
        <h4 className="mb-0 text-white">Dashboard</h4>
        <small className="text-white-50">{roleText[currentRole]}</small>
      </div>

      {/* Right Side Nav Links & Avatar */}
      <nav className="nav-links d-flex align-items-center gap-4">
        <a href="#" className="text-white text-decoration-none">Home</a>
        <a href="#" className="text-white text-decoration-none">About us</a>
        <a href="#" className="text-white text-decoration-none">My Courses</a>

        <img
          src={headerPic}
          alt="profile"
          className="rounded-circle profile-img"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultProfileImages[currentRole];
          }}
        />
      </nav>
    </header>
  );
};

export default Header;