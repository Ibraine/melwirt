// import React, { useState } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/step5email.css";
// import LandingHeader from "../components/LandingPage/LandingHeader";
// import emailImg from "../assets/email.png";
// import { useNavigate } from "react-router-dom";

// const Step5Email = ({ prevStep, handleChange, formData }) => {
//   const [email, setEmail] = useState(formData.email || "");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // ✅ Convert "7:00 PM" -> "19:00" (24 hr format)
//   function convertTo24Hour(timeString) {
//     if (!timeString) return "";
//     const [time, modifier] = timeString.split(" ");
//     let [hours, minutes] = time.split(":");
//     if (modifier === "PM" && hours !== "12") {
//       hours = parseInt(hours) + 12;
//     }
//     if (modifier === "AM" && hours === "12") {
//       hours = "00";
//     }
//     return `${hours}:${minutes}`;
//   }

//   const handleNext = async (e) => {
//     e.preventDefault();
//     if (!email.includes("@") || !email.includes(".")) {
//       alert("Please enter a valid email address.");
//       return;
//     }

//     setLoading(true);
//     handleChange("email", email);

//     // ✅ Convert time before sending to backend
//     const formattedTime = convertTo24Hour(formData.time);

//     const payload = {
//       name: formData.name,
//       mobile: formData.phone,
//       course: formData.course,
//       tutor_name: formData.tutor?.name || formData.tutor || "",
//       date: formData.date,
//       time: formattedTime, // ✅ backend-safe format
//       student_time: formData.time, // original human readable
//       student_timezone:
//         formData.student_timezone ||
//         formData.timezone ||
//         Intl.DateTimeFormat().resolvedOptions().timeZone,
//       student_country: formData.student_country || formData.country || "",
//       email,
//     };

//     try {
//       const res = await axios.post(
//         "http://localhost:8000/api/booking/book-demo/",
//         payload
//       );

//       navigate("/success", {
//         state: {
//           formData: formData,
//           apiData: res.data,
//         },
//       });
//     } catch (err) {
//       console.error("❌ Axios Error:", err.response?.data || err.message);
//       alert("Something went wrong. Check backend logs.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <LandingHeader />
//       <div className="container-fluid d-flex justify-content-center">
//         <div className="demo-card animated-card shadow-lg">
//           <div className="headline">📧 Enter Your Email</div>
//           <div className="row g-0">
//             <div className="col-md-6 left-img">
//               <img src={emailImg} alt="Email" />
//             </div>
//             <div className="col-md-6 form-side d-flex align-items-center justify-content-center p-4">
//               <div className="w-100 text-center">
//                 <h5 className="mb-3 fw-bold">We will send confirmation</h5>

//                 <form onSubmit={handleNext}>
//                   <input
//                     type="email"
//                     className="form-control mb-4"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />

//                   <div className="d-flex justify-content-between">
//                     <button
//                       type="button"
//                       onClick={prevStep}
//                       className="btn btn-secondary px-4"
//                       disabled={loading}
//                     >
//                       ⬅ Back
//                     </button>

//                     <button
//                       type="submit"
//                       className="btn btn-primary px-4 d-flex align-items-center"
//                       disabled={loading}
//                     >
//                       {loading ? (
//                         <>
//                           <span className="spinner-border spinner-border-sm me-2" />
//                           Submitting...
//                         </>
//                       ) : (
//                         "Confirm ✅"
//                       )}
//                     </button>
//                   </div>
//                 </form>

//                 <div className="summary mt-4 text-start p-3 border rounded">
//                   <h6>Booking Summary:</h6>
//                   <p><strong>Phone:</strong> {formData.phone}</p>
//                   <p><strong>Course:</strong> {formData.course}</p>
//                   <p><strong>Tutor:</strong> {formData.tutor?.name || formData.tutor}</p>
//                   <p><strong>Date:</strong> {formData.date}</p>
//                   <p><strong>Time:</strong> {formData.time}</p>
//                   <p><strong>Country:</strong> {formData.country}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Step5Email;




import React, { useState } from "react";
import axiosInstance from "../api/axiosConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/step5email.css";
import { ArrowLeft, CalendarDays, CheckCircle2, Clock3, Globe2, Mail, Phone, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Step5Email = ({ prevStep, handleChange, formData }) => {

  const [email, setEmail] = useState(formData.email || "");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleNext = async (e) => {
    e.preventDefault();

    if (!email.includes("@") || !email.includes(".")) {
      alert("Please enter valid email");
      return;
    }

    setLoading(true);

    handleChange("email", email);

    const payload = {
      slot: formData.slot,   // ⭐ IMPORTANT
      name: formData.name,
      email: email,
      mobile: formData.phone,
      course: formData.course,
      student_timezone:
        formData.student_timezone ||
        Intl.DateTimeFormat().resolvedOptions().timeZone,
      student_country: formData.country || "",
    };

    try {

      const res = await axiosInstance.post(
        "/api/booking/book-demo/",
        payload
      );

      navigate("/success", {
        state: {
          formData: formData,
          apiData: res.data,
        },
      });

    } catch (err) {

      console.error("Booking error:", err.response?.data || err.message);
      alert("Booking failed. Please try again.");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center">

        <div className="demo-card animated-card shadow-lg">

          <div className="headline">
            <span className="step-heading-icon"><Mail size={20} /></span>
            Enter Your Email
          </div>

          <div className="step-form-panel">
            <div className="form-side d-flex align-items-center justify-content-center p-4">

              <div className="w-100 text-center">

                <h5 className="mb-3 fw-bold">We will send confirmation</h5>
                <p className="step-helper-text">Enter your email to receive the demo booking details.</p>

                <form onSubmit={handleNext}>

                  <input
                    type="email"
                    className="form-control mb-4"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <div className="d-flex justify-content-between">

                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn btn-secondary px-4"
                      disabled={loading}
                    >
                      <ArrowLeft size={16} aria-hidden="true" /> Back
                    </button>

                    <button
                      type="submit"
                      className="btn btn-primary px-4 d-flex align-items-center"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"/>
                          Submitting...
                        </>
                      ) : (
                        <>Confirm Booking <CheckCircle2 size={16} aria-hidden="true" /></>
                      )}
                    </button>

                  </div>

                </form>

                <div className="summary mt-4 text-start p-3 border rounded">

                  <h6>Booking Summary:</h6>

                  <p><Phone size={15} aria-hidden="true" /><strong>Phone</strong><span>{formData.phone}</span></p>
                  <p><Mail size={15} aria-hidden="true" /><strong>Course</strong><span>{formData.course}</span></p>
                  <p><UserRound size={15} aria-hidden="true" /><strong>Tutor</strong><span>{formData.tutor?.name || formData.tutor}</span></p>
                  <p><CalendarDays size={15} aria-hidden="true" /><strong>Date</strong><span>{formData.date}</span></p>
                  <p><Clock3 size={15} aria-hidden="true" /><strong>Time</strong><span>{formData.time}</span></p>
                  <p><Globe2 size={15} aria-hidden="true" /><strong>Country</strong><span>{formData.country}</span></p>

                </div>

              </div>

            </div>

          </div>

        </div>

    </div>
  );
};

export default Step5Email;