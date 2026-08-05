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

import "../styles/trialbooking.css";

export default function DemoBooking() {
  const [step, setStep] = useState(1);

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
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    console.log("📌 Form Updated:", formData);
  }, [formData]);

  return (
    <div className="demo-booking-wrapper">
      {step === 1 && <Step1Phone nextStep={nextStep} handleChange={handleChange} />}
      {step === 2 && <Step2Course nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} />}
      {step === 3 && <Step3TutorSelect nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />}
      {step === 4 && <Step4DateTime nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />}
      {step === 5 && <Step5Email nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />}
    </div>
  );
}