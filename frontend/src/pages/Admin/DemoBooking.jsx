
// import React, { useState, useEffect } from "react";
// import Sidebar from "../../components/Sidebar";
// import Header from "../../components/Header";
// import axiosInstance from "../../api/axiosConfig";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "../../styles/demobooking.css";
// import roboticsAutomation from "../../assets/robotics automation.png";
// import defaultAvatar from "../../assets/default-avatar.png";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import { useNavigate } from "react-router-dom";

// const DemoBooking = () => {
//   const [activeTab, setActiveTab] = useState("upcoming");
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchBookings(1, activeTab, true);
//     setPage(1);
//   }, [activeTab]);

//   // fetch bookings
//   const fetchBookings = async (pageNum = 1, type = "upcoming", reset = false) => {
//     setLoading(true);
//     try {
//       const res = await axiosInstance.get(
//         `/api/booking/demo-bookings/?status=${type}&page=${pageNum}`
//       );
//       const newData = res.data?.results || [];
//       setBookings((prev) => (reset ? newData : [...prev, ...newData]));
//       setHasMore(!!res.data?.next);
//     } catch (err) {
//       toast.error("Failed to fetch bookings");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // cancel booking
//   const handleCancel = async (bookingId) => {
//     if (!window.confirm("Are you sure you want to cancel this booking?")) return;
//     setActionLoading(true);
//     try {
//       await axiosInstance.post(`/api/booking/demo-bookings/${bookingId}/cancel/`);
//       toast.success("Booking cancelled successfully");
//       setBookings((prev) => prev.filter((b) => b.id !== bookingId));
//     } catch (err) {
//       toast.error("Failed to cancel booking");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // load more
//   const loadMore = () => {
//     const nextPage = page + 1;
//     fetchBookings(nextPage, activeTab);
//     setPage(nextPage);
//   };

//   const renderLoading = () => (
//     <div className="shimmer-wrapper">
//       {Array(2)
//         .fill(0)
//         .map((_, idx) => (
//           <div key={idx} className="booking-card shimmer mb-4 p-3">
//             <Skeleton circle height={40} width={40} />
//             <Skeleton height={20} width="80%" style={{ marginTop: 10 }} />
//             <Skeleton height={20} width="60%" style={{ marginTop: 6 }} />
//           </div>
//         ))}
//     </div>
//   );

//   return (
//     <div className="d-flex">
//       <Sidebar />
//       <div className="flex-grow-1">
//         <Header />

//         <div className="container mt-4" style={{ maxWidth: "960px" }}>
//           <h4 className="fw-bold mb-4">Demo Bookings</h4>

//           {/* Tabs */}
//           <ul className="nav nav-tabs custom-tabs">
//             <li className="nav-item">
//               <button
//                 className={`nav-link ${activeTab === "upcoming" ? "active" : ""}`}
//                 onClick={() => setActiveTab("upcoming")}
//               >
//                 Upcoming Booking
//               </button>
//             </li>
//             <li className="nav-item">
//               <button
//                 className={`nav-link ${activeTab === "past" ? "active" : ""}`}
//                 onClick={() => setActiveTab("past")}
//               >
//                 Past Booking
//               </button>
//             </li>
//           </ul>

//           {/* Booking List */}
//           <div className="row mt-4">
//             {loading
//               ? renderLoading()
//               : bookings.length === 0
//               ? (
//                 <div className="col-12 text-center text-muted">
//                   No bookings found
//                 </div>
//                 )
//               : bookings.map((b) => (
//                   <div key={b.id} className="col-md-12 mb-4">
//                     <div className="booking-card p-3 shadow-sm">
//                       <div className="d-flex align-items-center">
//                         <div className="course-image-wrapper me-3">
//                           <img
//                             src={b.course_image || roboticsAutomation}
//                             alt={b.course}
//                             className="course-image"
//                             onError={(e) => (e.target.src = roboticsAutomation)}
//                           />
//                         </div>
//                         <div className="booking-info flex-grow-1">
//                           <h6>{b.course}</h6>
//                           <span className="text-muted">
//                             {b.tutor_info?.user?.first_name || "N/A"}
//                           </span>

//                           <div className="booking-details mt-1">
//                             <div><strong>Booking Date:</strong> {b.date}</div>
//                             <div><strong>Demo Duration:</strong> {b.time || "TBD"}</div>
//                           </div>
//                         </div>
//                       </div>

//                       {/* bottom buttons */}
//                       <div className="d-flex justify-content-between align-items-center mt-3">
//                         <div className="student-info d-flex align-items-center">
//                           <img
//                             src={b.student_info?.avatar || defaultAvatar}
//                             alt={b.student_info?.username || "Student"}
//                             className="tutor-avatar me-2"
//                             onError={(e) => (e.target.src = defaultAvatar)}
//                           />
//                           <span>
//                             Student: {b.student_info?.username || b.name || "N/A"}
//                           </span>
//                         </div>

//                         {/* update + cancel only for upcoming */}
//                         {activeTab === "upcoming" && (
//                           <div>
//                             <button
//                               className="btn btn-danger me-2"
//                               disabled={actionLoading}
//                               onClick={() => handleCancel(b.id)}
//                             >
//                               Cancel
//                             </button>

//                             <button
//                               className="btn btn-primary"
//                               disabled={actionLoading}
//                               onClick={() =>
//                                 navigate(`/admin/update-schedule/${b.id}`)
//                               }
//                             >
//                               Update Schedule
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//           </div>

//           {hasMore && !loading && (
//             <div className="text-center mb-4">
//               <button
//                 className="btn btn-outline-primary"
//                 onClick={loadMore}
//               >
//                 Load More
//               </button>
//             </div>
//           )}
//         </div>

//         <ToastContainer position="top-right" autoClose={3000} />
//       </div>
//     </div>
//   );
// };

// export default DemoBooking;


import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import axiosInstance from "../../api/axiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/demobooking.css";
import roboticsAutomation from "../../assets/robotics automation.png";
import defaultAvatar from "../../assets/default-avatar.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";

const DemoBooking = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings(1, activeTab, true);
    setPage(1);
  }, [activeTab]);

  const fetchBookings = async (pageNum = 1, type = "upcoming", reset = false) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `/api/booking/demo-bookings/?status=${type}&page=${pageNum}`
      );
      const newData = res.data?.results || [];
      setBookings((prev) => (reset ? newData : [...prev, ...newData]));
      setHasMore(!!res.data?.next);
    } catch (err) {
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    setActionLoading(true);
    try {
      await axiosInstance.post(`/api/booking/demo-bookings/${bookingId}/cancel/`);
      toast.success("Booking cancelled successfully");
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    } catch (err) {
      toast.error("Failed to cancel booking");
    } finally {
      setActionLoading(false);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    fetchBookings(nextPage, activeTab);
    setPage(nextPage);
  };

  const renderLoading = () => (
    <div className="shimmer-wrapper">
      {Array(2)
        .fill(0)
        .map((_, idx) => (
          <div key={idx} className="premium-booking-card shimmer mb-4 p-3">
            <Skeleton height={100} width={140} borderRadius={12} />
            <div style={{ flex: 1, marginLeft: 16 }}>
              <Skeleton height={22} width="60%" />
              <Skeleton height={16} width="40%" style={{ marginTop: 8 }} />
              <Skeleton height={32} width="80%" style={{ marginTop: 12 }} />
            </div>
          </div>
        ))}
    </div>
  );

  return (
    <div className="d-flex demo-booking-page">
      <Sidebar />
      <div className="main-content-wrapper flex-grow-1">
        <Header />

        <div className="container py-4" style={{ maxWidth: "980px" }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h4 className="fw-bold m-0 page-title">Demo Bookings</h4>
              <p className="text-muted small m-0">Manage and update all scheduled demo sessions</p>
            </div>
          </div>

          {/* Premium Tabs */}
          <div className="premium-tabs-container mb-4">
            <button
              className={`tab-btn ${activeTab === "upcoming" ? "active" : ""}`}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming Sessions
            </button>
            <button
              className={`tab-btn ${activeTab === "past" ? "active" : ""}`}
              onClick={() => setActiveTab("past")}
            >
              Past Sessions
            </button>
          </div>

          {/* Booking Cards */}
          <div className="row">
            {loading
              ? renderLoading()
              : bookings.length === 0
              ? (
                <div className="col-12 text-center text-muted py-5 empty-state-box">
                  <p className="m-0 fw-semibold">No booking records found</p>
                </div>
                )
              : bookings.map((b) => (
                  <div key={b.id} className="col-md-12 mb-3">
                    <div className="premium-booking-card">
                      
                      {/* Top Header Row of Card */}
                      <div className="card-top-header">
                        <div className="d-flex align-items-center gap-3">
                          <div className="card-image-box">
                            <img
                              src={b.course_image || roboticsAutomation}
                              alt={b.course}
                              onError={(e) => (e.target.src = roboticsAutomation)}
                            />
                          </div>

                          <div className="card-main-info">
                            <h5 className="course-name">{b.course || "Course Title"}</h5>
                            <span className="tutor-badge">
                              Tutor: <strong>{b.tutor_info?.first_name || "N/A"}</strong>
                            </span>

                            {/* Date & Time Pills */}
                            <div className="schedule-pills-row">
                              <div className="schedule-pill">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                <span>{b.date || "N/A"}</span>
                              </div>
                              <div className="schedule-pill">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                <span>{b.time || "TBD"}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Status Tag */}
                        <div className={`status-tag ${activeTab === "upcoming" ? "upcoming" : "past"}`}>
                          <span className="status-dot"></span>
                          {activeTab === "upcoming" ? "Upcoming" : "Completed"}
                        </div>
                      </div>

                      {/* Bottom Footer Row of Card */}
                      <div className="card-bottom-footer">
                        {/* Student Badge Capsule */}
                        <div className="student-capsule">
                          <img
                            src={b.student_info?.avatar || defaultAvatar}
                            alt={b.student_info?.username || "Student"}
                            onError={(e) => (e.target.src = defaultAvatar)}
                          />
                          <div className="student-meta">
                            <span className="label">Student</span>
                            <span className="name">{b.student_info?.username || b.name || "N/A"}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        {activeTab === "upcoming" && (
                          <div className="btn-group-custom">
                            <button
                              className="btn-cancel"
                              disabled={actionLoading}
                              onClick={() => handleCancel(b.id)}
                            >
                              Cancel
                            </button>

                            <button
                              className="btn-update"
                              disabled={actionLoading}
                              onClick={() =>
                                navigate(`/admin/update-schedule/${b.id}`)
                              }
                            >
                              Update Schedule
                            </button>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                ))}
          </div>

          {hasMore && !loading && (
            <div className="text-center my-4">
              <button
                className="btn-load-more"
                onClick={loadMore}
              >
                Load More Bookings
              </button>
            </div>
          )}
        </div>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default DemoBooking;