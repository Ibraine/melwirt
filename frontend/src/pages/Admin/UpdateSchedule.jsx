// // src/pages/Admin/UpdateSchedule.jsx

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axiosInstance from "../../api/axiosConfig";
// import { toast } from "react-toastify";

// export default function UpdateSchedule() {
//   const { bookingId } = useParams();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);
//   const [tutorSlots, setTutorSlots] = useState([]);
//   const [booking, setBooking] = useState(null);
//   const [actionLoading, setActionLoading] = useState(false);

//   useEffect(() => {
//     if (!bookingId) {
//       toast.error("Invalid booking");
//       navigate("/admin/demo-booking");
//       return;
//     }
//     fetchBookingAndSlots();
//     // eslint-disable-next-line
//   }, [bookingId]);

//   // ⭐ FINAL — OPTION-1 FIX APPLIED
//   const fetchBookingAndSlots = async () => {
//     setLoading(true);
//     try {
//       // 1️⃣ Get booking detail
//       const res = await axiosInstance.get(
//         `/api/booking/demo-bookings/${bookingId}/`
//       );
//       setBooking(res.data);

//       // 2️⃣ Tutor ID safe extraction (Option-1)
//       const tutorId =
//         res.data.tutor ||
//         res.data.tutor_id ||
//         res.data.tutor_info?.id;

//       console.log("Tutor ID:", tutorId);

//       if (!tutorId) {
//         toast.error("No tutor assigned for this booking.");
//         setTutorSlots([]);
//         return; // ❗ page yahi ruk jayega
//       }

//       // 3️⃣ Fetch slots for this tutor
//       const slotsRes = await axiosInstance.get(
//         `/api/booking/tutor-slots/?tutor_id=${tutorId}`
//       );

//       const slotsArray = Array.isArray(slotsRes.data)
//         ? slotsRes.data
//         : slotsRes.data?.results || [];

//       // 4️⃣ Keep only free slots
//       setTutorSlots(slotsArray.filter((s) => !s.is_booked));
//     } catch (err) {
//       console.error("Failed to load booking or slots:", err);
//       toast.error("Failed to load booking details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChooseSlot = async (slotId) => {
//     if (!slotId) return toast.warn("Choose a slot");
//     setActionLoading(true);
//     try {
//       // Reassign API
//       await axiosInstance.post(
//         `/api/booking/demo-bookings/${bookingId}/reassign/`,
//         { new_slot_id: slotId }
//       );

//       toast.success("Slot updated successfully!");
//       navigate("/admin/demo-booking");
//     } catch (err) {
//       console.error("Reassign failed:", err);
//       const msg = err?.response?.data?.detail || "Failed to update slot";
//       toast.error(msg);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   if (loading) return <div className="container py-4">Loading...</div>;

//   return (
//     <div className="container py-4" style={{ maxWidth: 900 }}>
//       <h3 className="mb-3">Update Booking Slot</h3>

//       {/* Booking Info Card */}
//       <div className="card p-3 mb-3">
//         <div>
//           <strong>Course:</strong> {booking.course || booking.course_name || "—"}
//         </div>
//         <div>
//           <strong>Student:</strong>{" "}
//           {booking.student_info?.username || booking.name || "—"}
//         </div>
//         <div>
//           <strong>Current Date:</strong> {booking.date || "—"}
//         </div>
//         <div>
//           <strong>Current Time:</strong>{" "}
//           {booking.time || booking.student_time || "—"}
//         </div>
//       </div>

//       <h5>Select a new available slot</h5>

//       {/* No Slots */}
//       {tutorSlots.length === 0 ? (
//         <div className="alert alert-warning">
//           No available slots found for this tutor.
//         </div>
//       ) : (
//         <div className="row">
//           {tutorSlots.map((s) => (
//             <div key={s.id} className="col-md-6 mb-3">
//               <div className="card p-3 d-flex flex-column">
//                 <div className="mb-2">
//                   <strong>{s.date}</strong>
//                 </div>
//                 <div className="mb-2">
//                   {s.start_time || s.time || `${s.start_time} - ${s.end_time}`}
//                 </div>

//                 <button
//                   className="btn btn-primary mt-auto"
//                   disabled={actionLoading}
//                   onClick={() => handleChooseSlot(s.id)}
//                   type="button"
//                 >
//                   {actionLoading ? "Saving..." : "Choose this slot"}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="mt-3">
//         <button
//           className="btn btn-secondary"
//           onClick={() => navigate(-1)}
//           type="button"
//         >
//           Back
//         </button>
//       </div>
//     </div>
//   );
// }





import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import axiosInstance from "../../api/axiosConfig";
import { toast } from "react-toastify";
import "../../styles/demobooking.css";

export default function UpdateSchedule() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [tutorSlots, setTutorSlots] = useState([]);
  const [booking, setBooking] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (!bookingId) {
      toast.error("Invalid booking");
      navigate("/admin/demo-booking");
      return;
    }
    fetchBookingAndSlots();
    // eslint-disable-next-line
  }, [bookingId]);

  const fetchBookingAndSlots = async () => {
    setLoading(true);
    try {
      // 1️⃣ Get booking detail
      const res = await axiosInstance.get(
        `/api/booking/demo-bookings/${bookingId}/`
      );
      setBooking(res.data);

      // 2️⃣ Tutor ID safe extraction
      const tutorId =
        res.data.tutor ||
        res.data.tutor_id ||
        res.data.tutor_info?.id;

      if (!tutorId) {
        toast.error("No tutor assigned for this booking.");
        setTutorSlots([]);
        return;
      }

      // 3️⃣ Fetch slots for this tutor
      // const slotsRes = await axiosInstance.get(
      //   `/api/booking/tutor-slots/?tutor_id=${tutorId}`
      // );

      const slotsRes = await axiosInstance.get(
         `/api/booking/public/demo-slots/?tutor_id=${tutorId}`
      );

      const slotsArray = Array.isArray(slotsRes.data)
        ? slotsRes.data
        : slotsRes.data?.results || [];

      // 4️⃣ Keep only free slots
      setTutorSlots(slotsArray.filter((s) => !s.is_booked));
    } catch (err) {
      console.error("Failed to load booking or slots:", err);
      toast.error("Failed to load booking details");
    } finally {
      setLoading(false);
    }
  };

  const handleChooseSlot = async (slotId) => {
    if (!slotId) return toast.warn("Choose a slot");
    setActionLoading(true);
    try {
      await axiosInstance.post(
        `/api/booking/demo-bookings/${bookingId}/reassign/`,
        { new_slot_id: slotId }
      );

      toast.success("Slot updated successfully!");
      navigate("/admin/demo-booking");
    } catch (err) {
      console.error("Reassign failed:", err);
      const msg = err?.response?.data?.detail || "Failed to update slot";
      toast.error(msg);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex demo-booking-page">
        <Sidebar role="admin" />
        <div className="main-content-wrapper flex-grow-1 p-5 text-center text-muted">
          Loading booking details...
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex demo-booking-page">
      <Sidebar role="admin" />

      {/* Main Content Wrapper (Fixed Sidebar & Header Overlap) */}
      <div className="main-content-wrapper flex-grow-1">
        <Header role="admin" />

        <div className="container py-4" style={{ maxWidth: 880 }}>
          
          {/* Back Button & Page Header */}
          <div className="mb-4">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm mb-2"
              onClick={() => navigate("/admin/demo-booking")}
            >
              ← Back to Demo Bookings
            </button>
            <h4 className="fw-bold m-0 page-title">Update Schedule Slot</h4>
            <p className="text-muted small m-0">Reassign or change the date and time slot for this booking</p>
          </div>

          {/* Current Booking Info Card */}
          {booking && (
            <div className="card p-4 shadow-sm mb-4 border-0 rounded-4 bg-white">
              <h6 className="fw-bold text-primary mb-3">Current Booking Details</h6>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="p-3 bg-light rounded-3 border">
                    <small className="text-muted d-block fw-semibold mb-1">Course Name</small>
                    <span className="fw-bold text-dark">{booking.course || booking.course_name || "—"}</span>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 bg-light rounded-3 border">
                    <small className="text-muted d-block fw-semibold mb-1">Student Name</small>
                    <span className="fw-bold text-dark">{booking.student_info?.username || booking.name || "—"}</span>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 bg-light rounded-3 border">
                    <small className="text-muted d-block fw-semibold mb-1">Current Scheduled Date</small>
                    <span className="fw-bold text-dark">📅 {booking.date || "—"}</span>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 bg-light rounded-3 border">
                    <small className="text-muted d-block fw-semibold mb-1">Current Scheduled Time</small>
                    <span className="fw-bold text-dark">🕒 {booking.time || booking.student_time || "—"}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <h6 className="fw-bold mb-3 text-dark">Select a New Available Slot</h6>

          {/* No Slots Alert */}
          {tutorSlots.length === 0 ? (
            <div className="alert alert-warning border-0 shadow-sm rounded-3 py-3">
              ⚠️ No available slots found for this tutor.
            </div>
          ) : (
            <div className="row">
              {tutorSlots.map((s) => (
                <div key={s.id} className="col-md-6 mb-3">
                  <div className="card p-3 shadow-sm border-0 rounded-3 h-100 d-flex flex-column justify-content-between">
                    <div>
                      <div className="fw-bold text-dark mb-1">📅 Date: {s.date}</div>
                      <div className="text-muted small mb-3">
                        🕒 Time: {s.start_time || s.time || `${s.start_time} - ${s.end_time}`}
                      </div>
                    </div>

                    <button
                      className="btn btn-primary btn-sm w-100 fw-semibold"
                      disabled={actionLoading}
                      onClick={() => handleChooseSlot(s.id)}
                      type="button"
                    >
                      {actionLoading ? "Saving Slot..." : "Choose this slot →"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}