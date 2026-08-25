// import React, { useState, useEffect, useMemo } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/step4datetime.css";
// import LandingHeader from "../components/LandingPage/LandingHeader";
// import slotDateImg from "../assets/slotdate.png";
// import { DateTime } from "luxon";
// import ct from "countries-and-timezones";

// // Tutor timezone (demo)
// const DEFAULT_TZ = "Asia/Kolkata";
// const FIXED_TUTOR_SLOTS = Array.from({ length: 11 }, (_, i) => 12 + i); // 12..22

// const Step4DateTime = ({ nextStep, prevStep, handleChange, formData = {} }) => {
//   const [selectedDayIndex, setSelectedDayIndex] = useState(0);
//   const [selectedTimeSlotId, setSelectedTimeSlotId] = useState(null);
//   const [days, setDays] = useState([]);
//   const [slotsByDay, setSlotsByDay] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const studentTimeZone = useMemo(() => {
//     const countryCode = formData?.country || "";
//     if (!countryCode) return DEFAULT_TZ;
//     const country = ct.getCountry(countryCode.toUpperCase());
//     if (country && country.timezones?.length > 0) {
//       return country.timezones[0];
//     }
//     return DEFAULT_TZ;
//   }, [formData?.country]);

//   useEffect(() => {
//     const tutorNow = DateTime.now().setZone(DEFAULT_TZ);
//     const next7 = Array.from({ length: 7 }, (_, i) => tutorNow.plus({ days: i }).startOf("day"));
//     setDays(next7);
//     setSelectedDayIndex(0);
//     setSelectedTimeSlotId(null);
//   }, [studentTimeZone]);

//   useEffect(() => {
//     if (!days.length) return;
//     setLoading(true);

//     setTimeout(() => {
//       const studentNow = DateTime.now().setZone(studentTimeZone);
//       const buckets = Array.from({ length: days.length }, () => []);

//       days.forEach((tutorDay, dayIndex) => {
//         FIXED_TUTOR_SLOTS.forEach((hour) => {
//           const tutorTime = tutorDay.set({ hour, minute: 0, second: 0, millisecond: 0 }).setZone(DEFAULT_TZ, { keepLocalTime: true });
//           const studentTime = tutorTime.setZone(studentTimeZone);

//           const tutorISODate = tutorTime.toISODate();
//           const studentISODate = studentTime.toISODate();

//           let targetIndex = dayIndex;
//           if (studentISODate > tutorISODate) targetIndex = dayIndex + 1;
//           else if (studentISODate < tutorISODate) targetIndex = dayIndex - 1;

//           if (targetIndex >= 0 && targetIndex < buckets.length) {
//             const disabled = studentTime <= studentNow;
//             const id = `${tutorTime.toISO()}|tz:${DEFAULT_TZ}`;

//             buckets[targetIndex].push({
//               id,
//               label: studentTime.toFormat("h:mm a"),            // student's display label (7:00 PM)
//               studentISO: studentTime.toISO(),
//               tutorISODate,                                     // e.g. 2025-10-28
//               tutorTime24: tutorTime.toFormat("HH:mm"),
//               utcISO: studentTime.toUTC().toISO(),
//               dtStudent: studentTime,
//               dtTutor: tutorTime,
//               disabled,
//               originalTutorDayIndex: dayIndex,
//               assignedTutorDayIndex: targetIndex,
//             });
//           }
//         });
//       });

//       for (let i = 0; i < buckets.length; i++) {
//         buckets[i].sort((a, b) => DateTime.fromISO(a.dtTutor.toISO()).toMillis() - DateTime.fromISO(b.dtTutor.toISO()).toMillis());
//       }

//       setSlotsByDay(buckets);
//       setLoading(false);
//     }, 200);
//   }, [days, studentTimeZone]);

//   const handleNext = () => {
//     if (!selectedTimeSlotId) {
//       alert("Please select a time slot");
//       return;
//     }
//     const bucket = slotsByDay[selectedDayIndex] || [];
//     const picked = bucket.find((s) => s.id === selectedTimeSlotId);
//     if (!picked) return alert("Please choose a valid slot");

//     // Save values to formData via handleChange
//     handleChange("date", picked.tutorISODate);                      // tutor calendar date (YYYY-MM-DD)
//     handleChange("time", picked.label);                             // save displayed time (7:00 PM) as 'time'
//     handleChange("timezone", studentTimeZone);                      // field you already used earlier
//     handleChange("student_time", picked.label);                     // NEW - student's local display
//     handleChange("student_timezone", studentTimeZone);              // NEW - student's IANA tz
//     handleChange("student_country", formData?.country || "");       // NEW - student's country iso2 if present

//     nextStep();
//   };

//   return (
//     <>
//       <LandingHeader />
//       <div className="container-fluid d-flex justify-content-center">
//         <div className="demo-card shadow-lg" style={{ maxWidth: 980 }}>
//           <div className="headline">📅 Choose Date & Time 📅</div>
//           <div className="row g-0">
//             <div className="col-md-6 left-img d-flex align-items-center justify-content-center">
//               <img src={slotDateImg} alt="Select Slot" className="img-fluid" />
//             </div>

//             <div className="col-md-6 form-side p-4">
//               <h5 className="text-center fw-bold mb-3">Select your preferred time slot</h5>

//               <div className="date-scroll d-flex gap-2 overflow-auto mb-3 pb-2">
//                 {days.map((d, i) => (
//                   <button
//                     key={i}
//                     onClick={() => { setSelectedDayIndex(i); setSelectedTimeSlotId(null); }}
//                     className={`btn day-btn ${selectedDayIndex === i ? "btn-primary text-white" : "btn-outline-primary"}`}
//                   >
//                     <div className="fw-semibold">{d.toFormat("ccc")}</div>
//                     <small>{d.toFormat("dd LLL")}</small>
//                   </button>
//                 ))}
//               </div>

//               {loading ? (
//                 <div className="d-flex align-items-center justify-content-center py-4">
//                   <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
//                 </div>
//               ) : (
//                 <div className="row g-2">
//                   {(slotsByDay[selectedDayIndex] || []).length === 0 ? (
//                     <div className="col-12 text-center text-muted py-3">No available slots for this day.</div>
//                   ) : (
//                     (slotsByDay[selectedDayIndex] || []).map((slot) => (
//                       <div key={slot.id} className="col-4 col-md-3 mb-2">
//                         <button
//                           onClick={() => !slot.disabled && setSelectedTimeSlotId(slot.id)}
//                           disabled={slot.disabled}
//                           title={
//                             slot.disabled
//                               ? "Past time - not available"
//                               : `Tutor time: ${slot.dtTutor.toFormat('dd LLL yyyy, hh:mm a')} (${DEFAULT_TZ})\nYour local: ${slot.dtStudent.toFormat('dd LLL yyyy, hh:mm a')} (${studentTimeZone})`
//                           }
//                           className={`btn w-100 time-btn ${selectedTimeSlotId === slot.id ? "btn-primary text-white" : "btn-outline-primary"}`}
//                           style={{ cursor: slot.disabled ? "not-allowed" : "pointer", opacity: slot.disabled ? 0.55 : 1, whiteSpace: 'pre-line' }}
//                         >
//                           {slot.label}
//                         </button>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               )}

//               <div className="mt-2 text-muted small">
//                 Showing times in <strong>{studentTimeZone}</strong> (your local time). Tutor timezone: <strong>{DEFAULT_TZ}</strong>
//               </div>

//               <div className="d-flex justify-content-between mt-4">
//                 <button className="btn btn-secondary px-4" onClick={prevStep}>⬅ Back</button>
//                 <div>
//                   <button className="btn btn-outline-secondary me-2" onClick={() => { setSelectedTimeSlotId(null); }}>Clear</button>
//                   <button className="btn btn-primary px-4" onClick={handleNext}>Next ➡</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Step4DateTime;




// import React, { useState, useEffect, useMemo } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/step4datetime.css";
// import LandingHeader from "../components/LandingPage/LandingHeader";
// import slotDateImg from "../assets/slotdate.png";
// import { DateTime } from "luxon";
// import ct from "countries-and-timezones";

// import { fetchDemoSlots } from "../api/demobookingAPI";

// const DEFAULT_TZ = "Asia/Kolkata";

// const Step4DateTime = ({ nextStep, prevStep, handleChange, formData = {} }) => {

//   const [selectedDayIndex, setSelectedDayIndex] = useState(0);
//   const [selectedTimeSlotId, setSelectedTimeSlotId] = useState(null);
//   const [days, setDays] = useState([]);
//   const [slotsByDay, setSlotsByDay] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [apiSlots, setApiSlots] = useState([]);

//   const studentTimeZone = useMemo(() => {

//     const countryCode = formData?.country || "";

//     if (!countryCode) return DEFAULT_TZ;

//     const country = ct.getCountry(countryCode.toUpperCase());

//     if (country && country.timezones?.length > 0) {
//       return country.timezones[0];
//     }

//     return DEFAULT_TZ;

//   }, [formData?.country]);

//   // Load slots from API
//   useEffect(() => {

//     const loadSlots = async () => {

//       setLoading(true);

//       try {

//         const data = await fetchDemoSlots();

//         setApiSlots(data);

//       } catch (error) {

//         console.error("Slots load error:", error);

//       }

//       setLoading(false);

//     };

//     loadSlots();

//   }, []);

//   // Build next 7 days
//   useEffect(() => {

//     const tutorNow = DateTime.now().setZone(DEFAULT_TZ);

//     const next7 = Array.from({ length: 7 }, (_, i) =>
//       tutorNow.plus({ days: i }).startOf("day")
//     );

//     setDays(next7);

//     setSelectedDayIndex(0);
//     setSelectedTimeSlotId(null);

//   }, [studentTimeZone]);

//   // Convert slots
//   useEffect(() => {

//     if (!days.length || !apiSlots.length) return;

//     const studentNow = DateTime.now().setZone(studentTimeZone);

//     const buckets = Array.from({ length: days.length }, () => []);

//     apiSlots.forEach((slot) => {

//       const tutorTime = DateTime.fromISO(
//         `${slot.date}T${slot.start_time}`,
//         { zone: DEFAULT_TZ }
//       );

//       const studentTime = tutorTime.setZone(studentTimeZone);

//       const tutorISODate = tutorTime.toISODate();
//       const studentISODate = studentTime.toISODate();

//       let targetIndex = days.findIndex((d) => d.toISODate() === tutorISODate);

//       if (studentISODate > tutorISODate) targetIndex += 1;
//       else if (studentISODate < tutorISODate) targetIndex -= 1;

//       if (targetIndex >= 0 && targetIndex < buckets.length) {

//         const disabled = studentTime <= studentNow;

//         buckets[targetIndex].push({
//           id: slot.id,
//           label: studentTime.toFormat("h:mm a"),
//           studentISO: studentTime.toISO(),
//           tutorISODate,
//           tutorTime24: tutorTime.toFormat("HH:mm"),
//           utcISO: studentTime.toUTC().toISO(),
//           dtStudent: studentTime,
//           dtTutor: tutorTime,
//           disabled
//         });

//       }

//     });

//     buckets.forEach((bucket) => {
//       bucket.sort(
//         (a, b) =>
//           DateTime.fromISO(a.dtTutor.toISO()).toMillis() -
//           DateTime.fromISO(b.dtTutor.toISO()).toMillis()
//       );
//     });

//     setSlotsByDay(buckets);

//   }, [days, apiSlots, studentTimeZone]);

//   const handleNext = () => {

//     if (!selectedTimeSlotId) {

//       alert("Please select a time slot");

//       return;

//     }

//     const bucket = slotsByDay[selectedDayIndex] || [];

//     const picked = bucket.find((s) => s.id === selectedTimeSlotId);

//     if (!picked) return;

//     handleChange("slot", picked.id);
//     handleChange("date", picked.tutorISODate);
//     // handleChange("time", picked.label);
//     handleChange("time", picked.tutorTime24);
//     handleChange("timezone", studentTimeZone);
//     handleChange("student_time", picked.label);
//     handleChange("student_timezone", studentTimeZone);
//     handleChange("student_country", formData?.country || "");

//     nextStep();

//   };

//   return (
//     <>
//       <LandingHeader />

//       <div className="container-fluid d-flex justify-content-center">

//         <div className="demo-card shadow-lg" style={{ maxWidth: 980 }}>

//           <div className="headline">📅 Choose Date & Time 📅</div>

//           <div className="row g-0">

//             <div className="col-md-6 left-img d-flex align-items-center justify-content-center">

//               <img src={slotDateImg} alt="Select Slot" className="img-fluid" />

//             </div>

//             <div className="col-md-6 form-side p-4">

//               <h5 className="text-center fw-bold mb-3">
//                 Select your preferred time slot
//               </h5>

//               <div className="date-scroll d-flex gap-2 overflow-auto mb-3 pb-2">

//                 {days.map((d, i) => (

//                   <button
//                     key={i}
//                     onClick={() => {
//                       setSelectedDayIndex(i);
//                       setSelectedTimeSlotId(null);
//                     }}
//                     className={`btn day-btn ${
//                       selectedDayIndex === i
//                         ? "btn-primary text-white"
//                         : "btn-outline-primary"
//                     }`}
//                   >
//                     <div className="fw-semibold">{d.toFormat("ccc")}</div>
//                     <small>{d.toFormat("dd LLL")}</small>
//                   </button>

//                 ))}

//               </div>

//               {loading ? (

//                 <div className="d-flex justify-content-center py-4">

//                   <div className="spinner-border"></div>

//                 </div>

//               ) : (

//                 <div className="row g-2">

//                   {(slotsByDay[selectedDayIndex] || []).map((slot) => (

//                     <div key={slot.id} className="col-4 col-md-3 mb-2">

//                       <button
//                         onClick={() =>
//                           !slot.disabled && setSelectedTimeSlotId(slot.id)
//                         }
//                         disabled={slot.disabled}
//                         className={`btn w-100 time-btn ${
//                           selectedTimeSlotId === slot.id
//                             ? "btn-primary text-white"
//                             : "btn-outline-primary"
//                         }`}
//                       >
//                         {slot.label}
//                       </button>

//                     </div>

//                   ))}

//                 </div>

//               )}

//               <div className="d-flex justify-content-between mt-4">

//                 <button className="btn btn-secondary px-4" onClick={prevStep}>
//                   ⬅ Back
//                 </button>

//                 <button className="btn btn-primary px-4" onClick={handleNext}>
//                   Next ➡
//                 </button>

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>
//     </>
//   );
// };

// export default Step4DateTime;


import React, { useState, useEffect, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/step4datetime.css";
import { AlertCircle, ArrowLeft, ArrowRight, CalendarDays } from "lucide-react";
import { DateTime } from "luxon";
import ct from "countries-and-timezones";

import { fetchDemoSlots } from "../api/demobookingAPI";

const DEFAULT_TZ = "Asia/Kolkata";

const Step4DateTime = ({ nextStep, prevStep, handleChange, formData = {} }) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState(null);
  const [days, setDays] = useState([]);
  const [slotsByDay, setSlotsByDay] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiSlots, setApiSlots] = useState([]);

  const studentTimeZone = useMemo(() => {
    const countryCode = formData?.country || "";
    if (!countryCode) return DEFAULT_TZ;
    const country = ct.getCountry(countryCode.toUpperCase());
    if (country && country.timezones?.length > 0) {
      return country.timezones[0];
    }
    return DEFAULT_TZ;
  }, [formData?.country]);

  // Load slots from API
  useEffect(() => {
    const loadSlots = async () => {
      setLoading(true);
      try {
        const data = await fetchDemoSlots();
        setApiSlots(data || []);
      } catch (error) {
        console.error("Slots load error:", error);
      }
      setLoading(false);
    };
    loadSlots();
  }, []);

  // Build next 7 days
  useEffect(() => {
    const tutorNow = DateTime.now().setZone(DEFAULT_TZ);
    const next7 = Array.from({ length: 7 }, (_, i) =>
      tutorNow.plus({ days: i }).startOf("day")
    );
    setDays(next7);
    setSelectedDayIndex(0);
    setSelectedTimeSlotId(null);
  }, [studentTimeZone]);

  // Convert slots
  useEffect(() => {
    if (!days.length || !apiSlots.length) return;

    const studentNow = DateTime.now().setZone(studentTimeZone);
    const buckets = Array.from({ length: days.length }, () => []);

    apiSlots.forEach((slot) => {
      const tutorTime = DateTime.fromISO(
        `${slot.date}T${slot.start_time}`,
        { zone: DEFAULT_TZ }
      );
      const studentTime = tutorTime.setZone(studentTimeZone);

      const tutorISODate = tutorTime.toISODate();
      const studentISODate = studentTime.toISODate();

      let targetIndex = days.findIndex((d) => d.toISODate() === tutorISODate);

      if (studentISODate > tutorISODate) targetIndex += 1;
      else if (studentISODate < tutorISODate) targetIndex -= 1;

      if (targetIndex >= 0 && targetIndex < buckets.length) {
        const disabled = studentTime <= studentNow;

        buckets[targetIndex].push({
          id: slot.id,
          label: studentTime.toFormat("h:mm a"),
          studentISO: studentTime.toISO(),
          tutorISODate,
          tutorTime24: tutorTime.toFormat("HH:mm"),
          utcISO: studentTime.toUTC().toISO(),
          dtStudent: studentTime,
          dtTutor: tutorTime,
          disabled
        });
      }
    });

    buckets.forEach((bucket) => {
      bucket.sort(
        (a, b) =>
          DateTime.fromISO(a.dtTutor.toISO()).toMillis() -
          DateTime.fromISO(b.dtTutor.toISO()).toMillis()
      );
    });

    setSlotsByDay(buckets);
  }, [days, apiSlots, studentTimeZone]);

  const handleNext = () => {
    if (!selectedTimeSlotId) {
      alert("Please select a time slot");
      return;
    }

    const bucket = slotsByDay[selectedDayIndex] || [];
    const picked = bucket.find((s) => s.id === selectedTimeSlotId);
    if (!picked) return;

    handleChange("slot", picked.id);
    handleChange("date", picked.tutorISODate);
    handleChange("time", picked.tutorTime24);
    handleChange("timezone", studentTimeZone);
    handleChange("student_time", picked.label);
    handleChange("student_timezone", studentTimeZone);
    handleChange("student_country", formData?.country || "");

    nextStep();
  };

  const currentDaySlots = slotsByDay[selectedDayIndex] || [];

  return (
    <div className="container-fluid d-flex justify-content-center">
        <div className="demo-card shadow-lg" style={{ maxWidth: 880 }}>
          <div className="headline">
            <span className="step-heading-icon"><CalendarDays size={20} /></span>
            Choose Date &amp; Time
          </div>

          <div className="step-form-panel">
            <div className="form-side p-4">
              <h5 className="text-center fw-bold mb-3">
                Select your preferred time slot
              </h5>
              <p className="step-helper-text text-center">Pick a day and time that works best for you.</p>

              {/* Date Horizontal Scroll */}
              <div className="date-strip-shell">
              <div className="date-scroll d-flex gap-2 overflow-auto mb-3 pb-2">
                {days.map((d, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setSelectedDayIndex(i);
                      setSelectedTimeSlotId(null);
                    }}
                    className={`btn day-btn ${
                      selectedDayIndex === i
                        ? "btn-primary text-white"
                        : "btn-outline-primary"
                    }`}
                  >
                    <div className="fw-semibold">{d.toFormat("ccc")}</div>
                    <small>{d.toFormat("dd LLL")}</small>
                  </button>
                ))}
              </div>
              </div>

              {/* Time Slots Grid or Empty Message */}
              {loading ? (
                <div className="d-flex justify-content-center py-4">
                  <div className="spinner-border text-primary"></div>
                </div>
              ) : currentDaySlots.length === 0 ? (
                /* 🔥 NO SLOTS AVAILABLE MESSAGE */
                <div className="text-center py-4 px-2 my-2 border rounded bg-light">
                  <p className="fw-semibold text-danger m-0" style={{ fontSize: "14px" }}>
                    <AlertCircle size={18} aria-hidden="true" /> No slots available for this date.
                  </p>
                  <small className="text-muted">Please select another date above.</small>
                </div>
              ) : (
                <div className="row g-2">
                  {currentDaySlots.map((slot) => (
                    <div key={slot.id} className="col-6 col-md-4 mb-2">
                      <button
                        type="button"
                        onClick={() =>
                          !slot.disabled && setSelectedTimeSlotId(slot.id)
                        }
                        disabled={slot.disabled}
                        className={`btn w-100 time-btn ${
                          selectedTimeSlotId === slot.id
                            ? "btn-primary text-white"
                            : "btn-outline-primary"
                        }`}
                      >
                        {slot.label}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="d-flex justify-content-between mt-4">
                <button type="button" className="btn btn-secondary px-4" onClick={prevStep}>
                  <ArrowLeft size={16} aria-hidden="true" /> Back
                </button>
                <button
                  type="button"
                  className="btn btn-primary px-4"
                  onClick={handleNext}
                  disabled={!selectedTimeSlotId}
                >
                  Next <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>

            </div>
          </div>
        </div>
    </div>
  );
};

export default Step4DateTime;