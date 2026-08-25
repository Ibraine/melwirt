// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import Step1Phone from "../components/Step1Phone";
// import Step2Course from "../components/Step2Course";
// import Step3TutorSelect from "../components/step3TutorSelect";
// import Step4DateTime from "../components/Step4DateTime";
// import Step5Email from "../components/Step5Email";

// import "../styles/trialbooking.css";

// export default function DemoBooking() {
//   const [step, setStep] = useState(1);

//   const [formData, setFormData] = useState({
//     phone: "",
//     country: "IN",
//     course: "",
//     tutor: null,
//     date: "",
//     time: "",
//     email: "",
//     timezone: "",
//     student_time: "",
//     student_timezone: "",
//     student_country: "",
//   });

//   const navigate = useNavigate();

//   const nextStep = (apiResponse = null) => {
//     if (apiResponse) {
//       navigate("/success", {
//         state: {
//           formData,
//           apiData: apiResponse,
//         },
//       });
//     } else {
//       setStep((prev) => prev + 1);
//     }
//   };

//   const prevStep = () => setStep((prev) => prev - 1);

//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   useEffect(() => {
//     console.log("📌 Form Updated:", formData);
//   }, [formData]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
//         {step === 1 && <Step1Phone nextStep={nextStep} handleChange={handleChange} />}
//         {step === 2 && <Step2Course nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} />}
//         {step === 3 && <Step3TutorSelect nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />}
//         {step === 4 && <Step4DateTime nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />}
//         {step === 5 && <Step5Email nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />}
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import Step1Phone from "../components/Step1Phone";
// import Step2Course from "../components/Step2Course";
// import Step3TutorSelect from "../components/Step3TutorSelect";
// import Step4DateTime from "../components/Step4DateTime";
// import Step5Email from "../components/Step5Email";

// export default function DemoBooking() {
//   const [step, setStep] = useState(1);

//   const [formData, setFormData] = useState({
//     phone: "",
//     country: "IN",
//     course: "",
//     tutor: null,
//     date: "",
//     time: "",
//     email: "",
//     timezone: "",
//     student_time: "",
//     student_timezone: "",
//     student_country: "",
//   });

//   const navigate = useNavigate();

//   const nextStep = (apiResponse = null) => {
//     if (apiResponse) {
//       navigate("/success", {
//         state: {
//           formData,
//           apiData: apiResponse,
//         },
//       });
//     } else {
//       setStep((prev) => prev + 1);
//     }
//   };

//   const prevStep = () => setStep((prev) => prev - 1);

//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   return (
//     <div className="demo-booking-wrapper">
//       {step === 1 && <Step1Phone nextStep={nextStep} handleChange={handleChange} />}
//       {step === 2 && <Step2Course nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} />}
//       {step === 3 && <Step3TutorSelect nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />}
//       {step === 4 && <Step4DateTime nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />}
//       {step === 5 && <Step5Email nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />}
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Step1Phone from "../components/Step1Phone";
import Step2Course from "../components/Step2Course";
import Step3TutorSelect from "../components/step3TutorSelect";
import Step4DateTime from "../components/Step4DateTime";
import Step5Email from "../components/Step5Email";
import LandingHeader from "../components/LandingPage/LandingHeader";
import Footer from "../components/LandingPage/Footer";

import "../styles/trialbooking.css";
import "../styles/demoflow.css";

export default function DemoBooking() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState("forward");

  const [formData, setFormData] = useState({
    phone: "",
    country: "IN",
    course: "",
    tutor: null,
    date: "",
    time: "",
    email: "",
    timezone: "",
    student_time: "",
    student_timezone: "",
    student_country: "",
  });

  const navigate = useNavigate();

  const nextStep = (apiResponse = null) => {
    if (apiResponse) {
      navigate("/success", {
        state: {
          formData,
          apiData: apiResponse,
        },
      });
    } else {
      setDirection("forward");
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setDirection("backward");
    setStep((prev) => prev - 1);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    console.log("📌 Form Updated:", formData);
  }, [formData]);

  return (
    <div className="demo-booking-page">
      <LandingHeader />

      <main className="demo-booking-wrapper">
        <section className="demo-flow-shell" aria-labelledby="demo-flow-title">
          <div className="demo-flow-intro">
            <p className="demo-eyebrow">MELWIRT TRIAL EXPERIENCE</p>
            <h1 id="demo-flow-title">Book your free demo class</h1>
            <p className="demo-flow-subtitle">A few quick details and we will match you with the right learning experience.</p>
          </div>

          <div className="demo-progress" aria-label={`Step ${step} of 5`}>
            <div className="demo-progress-heading">
              <span>Step {step} of 5</span>
              <strong>{["Phone", "Course", "Tutor", "Date & Time", "Confirm"][step - 1]}</strong>
            </div>
            <div className="demo-progress-track">
              <span style={{ width: `${(step / 5) * 100}%` }} />
            </div>
            <ol className="demo-stepper">
              {["Phone", "Course", "Tutor", "Date & Time", "Confirm"].map((label, index) => (
                <li key={label} className={index + 1 < step ? "complete" : index + 1 === step ? "current" : "upcoming"}>
                  <span>{index + 1}</span>
                  <small>{label}</small>
                </li>
              ))}
            </ol>
          </div>

          <div className={`demo-step-viewport ${direction}`} key={step}>
            {step === 1 && <Step1Phone nextStep={nextStep} handleChange={handleChange} />}
            {step === 2 && <Step2Course nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} />}
            {step === 3 && <Step3TutorSelect nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />}
            {step === 4 && <Step4DateTime nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />}
            {step === 5 && <Step5Email nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}