// // src/components/Sidebar.jsx
// import { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import "../styles/sidebar.css";

// // Icons
// import logoIcon from "../assets/logo.png";
// import dashboardIcon from "../assets/dashboard.png";
// import usersIcon from "../assets/user.png";
// import coursesIcon from "../assets/courses sidebar.png";
// import demoBookingIcon from "../assets/demo booking.png";
// import couponsIcon from "../assets/coupons.png";
// import referralIcon from "../assets/referral.png";
// import chatsIcon from "../assets/chats.png";
// import profileIcon from "../assets/profile.png";
// import assignmentIcon from "../assets/assignment.png";
// import myClassesIcon from "../assets/my classes.png";

// // import adminProfile from "../assets/admin profile.png";
// // import studentProfile from "../assets/student profile.png";
// // import tutorProfile from "../assets/tutor profile.png";

// // const getProfileImage = (role) => {
// //   switch (role) {
// //     case "admin":
// //       return adminProfile;
// //     case "student":
// //       return studentProfile;
// //     case "tutor":
// //       return tutorProfile;
// //     default:
// //       return profileIcon;
// //   }
// // };

// // ✅ Fixed all base paths (admin → /admin/*, etc.)
// const menuItems = {
//   admin: [
//     { name: "Dashboard", path: "/admin/dashboard", icon: dashboardIcon },
//     {
//       name: "Users",
//       icon: usersIcon,
//       children: [
//         { name: "All Users", path: "/admin/users" },
//         { name: "Teachers", path: "/admin/teachers" },
//         { name: "Students", path: "/admin/students" },
//       ],
//     },
//     { name: "Courses", path: "/admin/courses", icon: coursesIcon },
//     { name: "Demo Booking", path: "/admin/demo-booking", icon: demoBookingIcon },
//     { name: "Coupons", path: "/admin/coupons", icon: couponsIcon },
//     { name: "Referral", path: "/admin/referral", icon: referralIcon },
//     { name: "My Classes", path: "/admin/my-classes", icon: coursesIcon },
//     { name: "Chats", path: "/admin/chats", icon: chatsIcon },
//     { name: "Profile", path: "/admin/profile", icon: profileIcon },
//     { name: "Enrollment", path: "/admin/enrollment", icon: myClassesIcon }, 
//   ],
//   student: [
//     { name: "Dashboard", path: "/student/dashboard", icon: dashboardIcon },
//     { name: "My Classes", path: "/student/my-classes", icon: myClassesIcon },
//     { name: "My Courses", path: "/student/my-courses", icon: myClassesIcon },
//     { name: "Assignment", path: "/student/assignment", icon: assignmentIcon },
//     { name: "Referral", path: "/student/referral", icon: referralIcon },
//     { name: "Chats", path: "/student/chats", icon: chatsIcon },
//     { name: "Profile", path: "/student/profile", icon: profileIcon },
//   ],
//   tutor: [
//     { name: "Dashboard", path: "/tutor/dashboard", icon: dashboardIcon },
//     { name: "My Classes", path: "/tutor/my-classes", icon: coursesIcon },
//     { name: "My Courses", path: "/tutor/my-courses", icon: myClassesIcon },
//     { name: "Assignment", path: "/tutor/assignment", icon: assignmentIcon },
//     { name: "Referral", path: "/tutor/referral", icon: referralIcon },
//     { name: "Chats", path: "/tutor/chats", icon: chatsIcon },
//     { name: "Profile", path: "/tutor/profile", icon: profileIcon },
//   ],
// };

// const Sidebar = ({ role = "admin", userName = "User" }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [openDropdown, setOpenDropdown] = useState(null);

//   const toggleDropdown = (name) => {
//     setOpenDropdown(openDropdown === name ? null : name);
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   return (
//     <div className="sidebar">
//       <div className="sidebar-header">
//         {/* <img src={logoIcon} alt="Logo" className="sidebar-logo" /> */}
//         <div className="profile-info">
//           <img
//             // src={getProfileImage(role)}
//             // alt={`${role} profile`}
//             // className="rounded-circle"
//           />
//           <p className="admin-name">
//             {userName}
//             <br />
//             <span className="role">{role}</span>
//           </p>
//         </div>
//       </div>

//       <ul className="menu">
//         {menuItems[role]?.map((item, index) => (
//           <li key={index} className={item.children ? "has-children" : ""}>
//             {item.children ? (
//               <>
//                 <div
//                   className="dropdown-toggle"
//                   onClick={() => toggleDropdown(item.name)}
//                 >
//                   <img src={item.icon} alt={item.name} className="sidebar-icon" />
//                   <span>{item.name}</span>
//                 </div>
//                 <ul
//                   className={`submenu ${openDropdown === item.name ? "open" : ""}`}
//                 >
//                   {item.children.map((sub, subIndex) => (
//                     <li
//                       key={subIndex}
//                       className={
//                         location.pathname.startsWith(sub.path) ? "active" : ""
//                       }
//                     >
//                       <Link to={sub.path}>{sub.name}</Link>
//                     </li>
//                   ))}
//                 </ul>
//               </>
//             ) : (
//               <Link
//                 to={item.path}
//                 className={location.pathname.startsWith(item.path) ? "active" : ""}
//               >
//                 <img src={item.icon} alt={item.name} className="sidebar-icon" />
//                 <span>{item.name}</span>
//               </Link>
//             )}
//           </li>
//         ))}
//       </ul>

//       <div className="logout" onClick={handleLogout}>
//         Log Out
//       </div>
//     </div>
//   );
// };

// export default Sidebar;






// import { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import "../styles/sidebar.css";

// // Icons
// import logoIcon from "../assets/logo.png";
// import dashboardIcon from "../assets/dashboard.png";
// import usersIcon from "../assets/user.png";
// import coursesIcon from "../assets/courses sidebar.png";
// import demoBookingIcon from "../assets/demo booking.png";
// import couponsIcon from "../assets/coupons.png";
// import referralIcon from "../assets/referral.png";
// import chatsIcon from "../assets/chats.png";
// import profileIcon from "../assets/profile.png";
// import assignmentIcon from "../assets/assignment.png";
// import myClassesIcon from "../assets/my classes.png";

// // import adminProfile from "../assets/admin profile.png";
// // import studentProfile from "../assets/student profile.png";
// // import tutorProfile from "../assets/tutor profile.png";

// // const getProfileImage = (role) => {
// //   switch (role) {
// //     case "admin":
// //       return adminProfile;
// //     case "student":
// //       return studentProfile;
// //     case "tutor":
// //       return tutorProfile;
// //     default:
// //       return profileIcon;
// //   }
// // };

// // ✅ Fixed all base paths (admin → /admin/*, etc.)
// const menuItems = {
//   admin: [
//     { name: "Dashboard", path: "/admin/dashboard", icon: dashboardIcon },
//     {
//       name: "Users",
//       icon: usersIcon,
//       children: [
//         { name: "All Users", path: "/admin/users" },
//         { name: "Teachers", path: "/admin/teachers" },
//         { name: "Students", path: "/admin/students" },
//       ],
//     },
//     { name: "Courses", path: "/admin/courses", icon: coursesIcon },
//     { name: "Demo Booking", path: "/admin/demo-booking", icon: demoBookingIcon },
//     { name: "Coupons", path: "/admin/coupons", icon: couponsIcon },
//     { name: "Referral", path: "/admin/referral", icon: referralIcon },
//     { name: "My Classes", path: "/admin/my-classes", icon: coursesIcon },
//     { name: "Chats", path: "/admin/chats", icon: chatsIcon },
//     { name: "Profile", path: "/admin/profile", icon: profileIcon },
//     { name: "Enrollment", path: "/admin/enrollment", icon: myClassesIcon }, 
//   ],
//   student: [
//     { name: "Dashboard", path: "/student/dashboard", icon: dashboardIcon },
//     { name: "My Classes", path: "/student/my-classes", icon: myClassesIcon },
//     { name: "My Courses", path: "/student/my-courses", icon: myClassesIcon },
//     { name: "Assignment", path: "/student/assignment", icon: assignmentIcon },
//     { name: "Referral", path: "/student/referral", icon: referralIcon },
//     { name: "Chats", path: "/student/chats", icon: chatsIcon },
//     { name: "Profile", path: "/student/profile", icon: profileIcon },
//   ],
//   tutor: [
//     { name: "Dashboard", path: "/tutor/dashboard", icon: dashboardIcon },
//     { name: "My Classes", path: "/tutor/my-classes", icon: coursesIcon },
//     { name: "My Courses", path: "/tutor/my-courses", icon: myClassesIcon },
//     { name: "Assignment", path: "/tutor/assignment", icon: assignmentIcon },
//     { name: "Referral", path: "/tutor/referral", icon: referralIcon },
//     { name: "Chats", path: "/tutor/chats", icon: chatsIcon },
//     { name: "Profile", path: "/tutor/profile", icon: profileIcon },
//   ],
// };

// const Sidebar = ({ role = "admin", userName = "User" }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [openDropdown, setOpenDropdown] = useState(null);

//   const toggleDropdown = (name) => {
//     setOpenDropdown(openDropdown === name ? null : name);
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   return (
//     <div className="sidebar">
//       <div className="sidebar-header">
//         {/* <img src={logoIcon} alt="Logo" className="sidebar-logo" /> */}
//         <div className="profile-info">
//           <img
//             // src={getProfileImage(role)}
//             // alt={`${role} profile`}
//             // className="rounded-circle"
//           />
//           <p className="admin-name">
//             {userName}
//             <br />
//             <span className="role">{role}</span>
//           </p>
//         </div>
//       </div>

//       <ul className="menu">
//         {menuItems[role]?.map((item, index) => (
//           <li key={index} className={item.children ? "has-children" : ""}>
//             {item.children ? (
//               <>
//                 <div
//                   className="dropdown-toggle"
//                   onClick={() => toggleDropdown(item.name)}
//                 >
//                   <img src={item.icon} alt={item.name} className="sidebar-icon" />
//                   <span>{item.name}</span>
//                 </div>
//                 <ul
//                   className={`submenu ${openDropdown === item.name ? "open" : ""}`}
//                 >
//                   {item.children.map((sub, subIndex) => (
//                     <li
//                       key={subIndex}
//                       className={
//                         location.pathname.startsWith(sub.path) ? "active" : ""
//                       }
//                     >
//                       <Link to={sub.path}>{sub.name}</Link>
//                     </li>
//                   ))}
//                 </ul>
//               </>
//             ) : (
//               <Link
//                 to={item.path}
//                 className={location.pathname.startsWith(item.path) ? "active" : ""}
//               >
//                 <img src={item.icon} alt={item.name} className="sidebar-icon" />
//                 <span>{item.name}</span>
//               </Link>
//             )}
//           </li>
//         ))}
//       </ul>

//       <div className="logout" onClick={handleLogout}>
//         Log Out
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// import { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import "../styles/sidebar.css";

// // Icons
// import logoIcon from "../assets/logo.png";
// import dashboardIcon from "../assets/dashboard.png";
// import usersIcon from "../assets/user.png";
// import coursesIcon from "../assets/courses sidebar.png";
// import demoBookingIcon from "../assets/demo booking.png";
// import couponsIcon from "../assets/coupons.png";
// import referralIcon from "../assets/referral.png";
// import chatsIcon from "../assets/chats.png";
// import profileIcon from "../assets/profile.png";
// import assignmentIcon from "../assets/assignment.png";
// import myClassesIcon from "../assets/my classes.png";

// const menuItems = {
//   admin: [
//     { name: "Dashboard", path: "/admin/dashboard", icon: dashboardIcon },
//     {
//       name: "Users",
//       icon: usersIcon,
//       children: [
//         { name: "All Users", path: "/admin/users" },
//         { name: "Teachers", path: "/admin/teachers" },
//         { name: "Students", path: "/admin/students" },
//       ],
//     },
//     { name: "Courses", path: "/admin/courses", icon: coursesIcon },
//     { name: "Demo Booking", path: "/admin/demo-booking", icon: demoBookingIcon },
//     { name: "Coupons", path: "/admin/coupons", icon: couponsIcon },
//     { name: "Referral", path: "/admin/referral", icon: referralIcon },
//     { name: "My Classes", path: "/admin/my-classes", icon: coursesIcon },
//     { name: "Chats", path: "/admin/chats", icon: chatsIcon },
//     { name: "Profile", path: "/admin/profile", icon: profileIcon },
//     { name: "Enrollment", path: "/admin/enrollment", icon: myClassesIcon }, 
//   ],
//   student: [
//     { name: "Dashboard", path: "/student/dashboard", icon: dashboardIcon },
//     { name: "My Classes", path: "/student/my-classes", icon: myClassesIcon },
//     { name: "My Courses", path: "/student/my-courses", icon: myClassesIcon },
//     { name: "Assignment", path: "/student/assignment", icon: assignmentIcon },
//     { name: "Referral", path: "/student/referral", icon: referralIcon },
//     { name: "Chats", path: "/student/chats", icon: chatsIcon },
//     { name: "Profile", path: "/student/profile", icon: profileIcon },
//   ],
//   tutor: [
//     { name: "Dashboard", path: "/tutor/dashboard", icon: dashboardIcon },
//     { name: "My Classes", path: "/tutor/my-classes", icon: coursesIcon },
//     { name: "My Courses", path: "/tutor/my-courses", icon: myClassesIcon },
//     { name: "Assignment", path: "/tutor/assignment", icon: assignmentIcon },
//     { name: "Referral", path: "/tutor/referral", icon: referralIcon },
//     { name: "Chats", path: "/tutor/chats", icon: chatsIcon },
//     { name: "Profile", path: "/tutor/profile", icon: profileIcon },
//   ],
// };

// const Sidebar = ({ role = "admin", userName = "User" }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [openDropdown, setOpenDropdown] = useState(null);

//   const toggleDropdown = (name) => {
//     setOpenDropdown(openDropdown === name ? null : name);
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   return (
//     <div className="sidebar">
//       <div className="sidebar-header">
//         <div className="profile-info">
//           <img />
//           <p className="admin-name">
//             {userName}
//             <br />
//             <span className="role">{role}</span>
//           </p>
//         </div>
//       </div>

//       <ul className="menu">
//         {menuItems[role]?.map((item, index) => (
//           <li key={index} className={item.children ? "has-children" : ""}>
//             {item.children ? (
//               <>
//                 <div
//                   className="dropdown-toggle"
//                   onClick={() => toggleDropdown(item.name)}
//                 >
//                   <img src={item.icon} alt={item.name} className="sidebar-icon" />
//                   <span>{item.name}</span>
//                 </div>
//                 <ul
//                   className={`submenu ${openDropdown === item.name ? "open" : ""}`}
//                 >
//                   {item.children.map((sub, subIndex) => (
//                     <li
//                       key={subIndex}
//                       className={
//                         location.pathname.startsWith(sub.path) ? "active" : ""
//                       }
//                     >
//                       <Link to={sub.path}>{sub.name}</Link>
//                     </li>
//                   ))}
//                 </ul>
//               </>
//             ) : (
//               <Link
//                 to={item.path}
//                 className={location.pathname.startsWith(item.path) ? "active" : ""}
//               >
//                 <img src={item.icon} alt={item.name} className="sidebar-icon" />
//                 <span>{item.name}</span>
//               </Link>
//             )}
//           </li>
//         ))}
//       </ul>

//       <div className="logout" onClick={handleLogout}>
//         Log Out
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


// import { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import "../styles/sidebar.css";

// // Icons
// import logoIcon from "../assets/logo.png";
// import dashboardIcon from "../assets/dashboard.png";
// import usersIcon from "../assets/user.png";
// import coursesIcon from "../assets/courses sidebar.png";
// import demoBookingIcon from "../assets/demo booking.png";
// import couponsIcon from "../assets/coupons.png";
// import referralIcon from "../assets/referral.png";
// import chatsIcon from "../assets/chats.png";
// import profileIcon from "../assets/profile.png";
// import assignmentIcon from "../assets/assignment.png";
// import myClassesIcon from "../assets/my classes.png";

// const menuItems = {
//   admin: [
//     { name: "Dashboard", path: "/admin/dashboard", icon: dashboardIcon },
//     {
//       name: "Users",
//       icon: usersIcon,
//       children: [
//         { name: "All Users", path: "/admin/users" },
//         { name: "Teachers", path: "/admin/teachers" },
//         { name: "Students", path: "/admin/students" },
//       ],
//     },
//     { name: "Courses", path: "/admin/courses", icon: coursesIcon },
//     { name: "Demo Booking", path: "/admin/demo-booking", icon: demoBookingIcon },
//     { name: "Coupons", path: "/admin/coupons", icon: couponsIcon },
//     { name: "Referral", path: "/admin/referral", icon: referralIcon },
//     { name: "My Classes", path: "/admin/my-classes", icon: coursesIcon },
//     { name: "Chats", path: "/admin/chats", icon: chatsIcon },
//     { name: "Profile", path: "/admin/profile", icon: profileIcon },
//     { name: "Enrollment", path: "/admin/enrollment", icon: myClassesIcon }, 
//   ],
//   student: [
//     { name: "Dashboard", path: "/student/dashboard", icon: dashboardIcon },
//     { name: "My Classes", path: "/student/my-classes", icon: myClassesIcon },
//     { name: "My Courses", path: "/student/my-courses", icon: myClassesIcon },
//     { name: "Assignment", path: "/student/assignment", icon: assignmentIcon },
//     { name: "Referral", path: "/student/referral", icon: referralIcon },
//     { name: "Chats", path: "/student/chats", icon: chatsIcon },
//     { name: "Profile", path: "/student/profile", icon: profileIcon },
//   ],
//   tutor: [
//     { name: "Dashboard", path: "/tutor/dashboard", icon: dashboardIcon },
//     { name: "My Classes", path: "/tutor/my-classes", icon: coursesIcon },
//     { name: "My Courses", path: "/tutor/my-courses", icon: myClassesIcon },
//     { name: "Assignment", path: "/tutor/assignment", icon: assignmentIcon },
//     { name: "Referral", path: "/tutor/referral", icon: referralIcon },
//     { name: "Chats", path: "/tutor/chats", icon: chatsIcon },
//     { name: "Profile", path: "/tutor/profile", icon: profileIcon },
//   ],
// };

// const Sidebar = ({ role = "admin", userName = "User" }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [showLogoutModal, setShowLogoutModal] = useState(false);

//   const toggleDropdown = (name) => {
//     setOpenDropdown(openDropdown === name ? null : name);
//   };

//   const handleLogoutClick = () => {
//     setShowLogoutModal(true);
//   };

//   // 🔹 FIX: Hard Redirect to Landing Page
//   const confirmLogout = () => {
//     localStorage.clear();
//     sessionStorage.clear();
//     setShowLogoutModal(false);
    
//     // 🔥 Guarantees direct redirection to landing page
//     window.location.href = "/";
//   };

//   return (
//     <>
//       <div className="sidebar">
//         <div className="sidebar-header">
//           <div className="profile-info">
//             <img alt="profile" />
//             <p className="admin-name">
//               {userName}
//               <br />
//               <span className="role">{role}</span>
//             </p>
//           </div>
//         </div>

//         <ul className="menu">
//           {menuItems[role]?.map((item, index) => (
//             <li key={index} className={item.children ? "has-children" : ""}>
//               {item.children ? (
//                 <>
//                   <div
//                     className="dropdown-toggle"
//                     onClick={() => toggleDropdown(item.name)}
//                   >
//                     <img src={item.icon} alt={item.name} className="sidebar-icon" />
//                     <span>{item.name}</span>
//                   </div>
//                   <ul
//                     className={`submenu ${openDropdown === item.name ? "open" : ""}`}
//                   >
//                     {item.children.map((sub, subIndex) => (
//                       <li
//                         key={subIndex}
//                         className={
//                           location.pathname.startsWith(sub.path) ? "active" : ""
//                         }
//                       >
//                         <Link to={sub.path}>{sub.name}</Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </>
//               ) : (
//                 <Link
//                   to={item.path}
//                   className={location.pathname.startsWith(item.path) ? "active" : ""}
//                 >
//                   <img src={item.icon} alt={item.name} className="sidebar-icon" />
//                   <span>{item.name}</span>
//                 </Link>
//               )}
//             </li>
//           ))}
//         </ul>

//         <div className="logout" onClick={handleLogoutClick}>
//           Log Out
//         </div>
//       </div>

//       {/* Logout Confirmation Modal */}
//       {showLogoutModal && (
//         <div className="logout-modal-overlay" onClick={() => setShowLogoutModal(false)}>
//           <div className="logout-modal-card" onClick={(e) => e.stopPropagation()}>
//             <div className="logout-modal-icon">
//               <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
//                 <polyline points="16 17 21 12 16 7"></polyline>
//                 <line x1="21" y1="12" x2="9" y2="12"></line>
//               </svg>
//             </div>

//             <h4 className="logout-modal-title">Logging Out?</h4>
//             <p className="logout-modal-sub">
//               Are you sure you want to log out of your session? You will need to log back in to access your dashboard.
//             </p>

//             <div className="logout-modal-actions">
//               <button
//                 type="button"
//                 className="btn-logout-cancel"
//                 onClick={() => setShowLogoutModal(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 className="btn-logout-confirm"
//                 onClick={confirmLogout}
//               >
//                 Yes, Log Out
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Sidebar;


// import { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import "../styles/sidebar.css";

// // Icons
// import logoIcon from "../assets/logo.png";
// import dashboardIcon from "../assets/dashboard.png";
// import usersIcon from "../assets/user.png";
// import coursesIcon from "../assets/courses sidebar.png";
// import demoBookingIcon from "../assets/demo booking.png";
// import couponsIcon from "../assets/coupons.png";
// import referralIcon from "../assets/referral.png";
// import chatsIcon from "../assets/chats.png";
// import profileIcon from "../assets/profile.png";
// import assignmentIcon from "../assets/assignment.png";
// import myClassesIcon from "../assets/my classes.png";

// const menuItems = {
//   admin: [
//     { name: "Dashboard", path: "/admin/dashboard", icon: dashboardIcon },
//     {
//       name: "Users",
//       icon: usersIcon,
//       children: [
//         { name: "All Users", path: "/admin/users" },
//         { name: "Teachers", path: "/admin/teachers" },
//         { name: "Students", path: "/admin/students" },
//       ],
//     },
//     { name: "Courses", path: "/admin/courses", icon: coursesIcon },
//     { name: "Demo Booking", path: "/admin/demo-booking", icon: demoBookingIcon },
//     { name: "Coupons", path: "/admin/coupons", icon: couponsIcon },
//     { name: "Referral", path: "/admin/referral", icon: referralIcon },
//     { name: "My Classes", path: "/admin/my-classes", icon: coursesIcon },
//     { name: "Chats", path: "/admin/chats", icon: chatsIcon },
//     { name: "Profile", path: "/admin/profile", icon: profileIcon },
//     { name: "Enrollment", path: "/admin/enrollment", icon: myClassesIcon }, 
//   ],
//   student: [
//     { name: "Dashboard", path: "/student/dashboard", icon: dashboardIcon },
//     { name: "My Classes", path: "/student/my-classes", icon: myClassesIcon },
//     { name: "My Courses", path: "/student/my-courses", icon: myClassesIcon },
//     { name: "Assignment", path: "/student/assignment", icon: assignmentIcon },
//     { name: "Referral", path: "/student/referral", icon: referralIcon },
//     { name: "Chats", path: "/student/chats", icon: chatsIcon },
//     { name: "Profile", path: "/student/profile", icon: profileIcon },
//   ],
//   tutor: [
//     { name: "Dashboard", path: "/tutor/dashboard", icon: dashboardIcon },
//     { name: "My Classes", path: "/tutor/my-classes", icon: coursesIcon },
//     { name: "My Courses", path: "/tutor/my-courses", icon: myClassesIcon },
//     { name: "Assignment", path: "/tutor/assignment", icon: assignmentIcon },
//     { name: "Referral", path: "/tutor/referral", icon: referralIcon },
//     { name: "Chats", path: "/tutor/chats", icon: chatsIcon },
//     { name: "Profile", path: "/tutor/profile", icon: profileIcon },
//   ],
// };

// const Sidebar = ({ role = "admin", userName = "User" }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [showLogoutModal, setShowLogoutModal] = useState(false);

//   const toggleDropdown = (name) => {
//     setOpenDropdown(openDropdown === name ? null : name);
//   };

//   const handleLogoutClick = () => {
//     setShowLogoutModal(true);
//   };

//   const confirmLogout = () => {
//     localStorage.clear();
//     sessionStorage.clear();
//     setShowLogoutModal(false);
//     window.location.href = "/";
//   };

//   return (
//     <>
//       <div className="sidebar">
//         {/* Sidebar Header (Profile Image Removed as requested) */}
//         <div className="sidebar-header">
//           <div className="profile-info">
//             <p className="admin-name">
//               {userName}
//               <br />
//               <span className="role">{role}</span>
//             </p>
//           </div>
//         </div>

//         <ul className="menu">
//           {menuItems[role]?.map((item, index) => (
//             <li key={index} className={item.children ? "has-children" : ""}>
//               {item.children ? (
//                 <>
//                   <div
//                     className="dropdown-toggle"
//                     onClick={() => toggleDropdown(item.name)}
//                   >
//                     <img src={item.icon} alt={item.name} className="sidebar-icon" />
//                     <span>{item.name}</span>
//                   </div>
//                   <ul
//                     className={`submenu ${openDropdown === item.name ? "open" : ""}`}
//                   >
//                     {item.children.map((sub, subIndex) => (
//                       <li
//                         key={subIndex}
//                         className={
//                           location.pathname.startsWith(sub.path) ? "active" : ""
//                         }
//                       >
//                         <Link to={sub.path}>{sub.name}</Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </>
//               ) : (
//                 <Link
//                   to={item.path}
//                   className={location.pathname.startsWith(item.path) ? "active" : ""}
//                 >
//                   <img src={item.icon} alt={item.name} className="sidebar-icon" />
//                   <span>{item.name}</span>
//                 </Link>
//               )}
//             </li>
//           ))}
//         </ul>

//         <div className="logout" onClick={handleLogoutClick}>
//           Log Out
//         </div>
//       </div>

//       {/* Logout Confirmation Modal */}
//       {showLogoutModal && (
//         <div className="logout-modal-overlay" onClick={() => setShowLogoutModal(false)}>
//           <div className="logout-modal-card" onClick={(e) => e.stopPropagation()}>
//             <div className="logout-modal-icon">
//               <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
//                 <polyline points="16 17 21 12 16 7"></polyline>
//                 <line x1="21" y1="12" x2="9" y2="12"></line>
//               </svg>
//             </div>

//             <h4 className="logout-modal-title">Logging Out?</h4>
//             <p className="logout-modal-sub">
//               Are you sure you want to log out of your session? You will need to log back in to access your dashboard.
//             </p>

//             <div className="logout-modal-actions">
//               <button
//                 type="button"
//                 className="btn-logout-cancel"
//                 onClick={() => setShowLogoutModal(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 className="btn-logout-confirm"
//                 onClick={confirmLogout}
//               >
//                 Yes, Log Out
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Sidebar;



import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";

// Icons
import dashboardIcon from "../assets/dashboard.png";
import usersIcon from "../assets/user.png";
import coursesIcon from "../assets/courses sidebar.png";
import demoBookingIcon from "../assets/demo booking.png";
import couponsIcon from "../assets/coupons.png";
import referralIcon from "../assets/referral.png";
import chatsIcon from "../assets/chats.png";
import profileIcon from "../assets/profile.png";
import assignmentIcon from "../assets/assignment.png";
import myClassesIcon from "../assets/my classes.png";

const menuItems = {
  admin: [
    { name: "Dashboard", path: "/admin/dashboard", icon: dashboardIcon },
    {
      name: "Users",
      icon: usersIcon,
      children: [
        { name: "All Users", path: "/admin/users" },
        { name: "Teachers", path: "/admin/teachers" },
        { name: "Students", path: "/admin/students" },
      ],
    },
    { name: "Courses", path: "/admin/courses", icon: coursesIcon },
    { name: "Demo Booking", path: "/admin/demo-booking", icon: demoBookingIcon },
    { name: "Coupons", path: "/admin/coupons", icon: couponsIcon },
    { name: "Referral", path: "/admin/referral", icon: referralIcon },
    { name: "My Classes", path: "/admin/my-classes", icon: coursesIcon },
    { name: "Chats", path: "/admin/chats", icon: chatsIcon },
    { name: "Profile", path: "/admin/profile", icon: profileIcon },
    { name: "Enrollment", path: "/admin/enrollment", icon: myClassesIcon }, 
  ],
  student: [
    { name: "Dashboard", path: "/student/dashboard", icon: dashboardIcon },
    { name: "My Classes", path: "/student/my-classes", icon: myClassesIcon },
    { name: "My Courses", path: "/student/my-courses", icon: myClassesIcon },
    { name: "Assignment", path: "/student/assignment", icon: assignmentIcon },
    { name: "Referral", path: "/student/referral", icon: referralIcon },
    { name: "Chats", path: "/student/chats", icon: chatsIcon },
    { name: "Profile", path: "/student/profile", icon: profileIcon },
  ],
  tutor: [
    { name: "Dashboard", path: "/tutor/dashboard", icon: dashboardIcon },
    { name: "My Classes", path: "/tutor/my-classes", icon: coursesIcon },
    { name: "My Courses", path: "/tutor/my-courses", icon: myClassesIcon },
    { name: "Assignment", path: "/tutor/assignment", icon: assignmentIcon },
    { name: "Referral", path: "/tutor/referral", icon: referralIcon },
    { name: "Chats", path: "/tutor/chats", icon: chatsIcon },
    { name: "Profile", path: "/tutor/profile", icon: profileIcon },
  ],
};

const Sidebar = ({ role: customRole, userName = "User" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // 🔹 SMART ROLE DETECTION: Automatically detects role from URL path
  const currentRole = location.pathname.startsWith("/tutor")
    ? "tutor"
    : location.pathname.startsWith("/student")
    ? "student"
    : customRole || "admin";

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setShowLogoutModal(false);
    window.location.href = "/";
  };

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="profile-info">
            <p className="admin-name">
              {userName}
              <br />
              <span className="role">{currentRole}</span>
            </p>
          </div>
        </div>

        <ul className="menu">
          {menuItems[currentRole]?.map((item, index) => (
            <li key={index} className={item.children ? "has-children" : ""}>
              {item.children ? (
                <>
                  <div
                    className="dropdown-toggle"
                    onClick={() => toggleDropdown(item.name)}
                  >
                    <img src={item.icon} alt={item.name} className="sidebar-icon" />
                    <span>{item.name}</span>
                  </div>
                  <ul
                    className={`submenu ${openDropdown === item.name ? "open" : ""}`}
                  >
                    {item.children.map((sub, subIndex) => (
                      <li
                        key={subIndex}
                        className={
                          location.pathname.startsWith(sub.path) ? "active" : ""
                        }
                      >
                        <Link to={sub.path}>{sub.name}</Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                  to={item.path}
                  className={location.pathname.startsWith(item.path) ? "active" : ""}
                >
                  <img src={item.icon} alt={item.name} className="sidebar-icon" />
                  <span>{item.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="logout" onClick={handleLogoutClick}>
          Log Out
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="logout-modal-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="logout-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="logout-modal-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </div>

            <h4 className="logout-modal-title">Logging Out?</h4>
            <p className="logout-modal-sub">
              Are you sure you want to log out of your session? You will need to log back in to access your dashboard.
            </p>

            <div className="logout-modal-actions">
              <button
                type="button"
                className="btn-logout-cancel"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-logout-confirm"
                onClick={confirmLogout}
              >
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;