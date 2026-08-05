// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/step2course.css";
// import LandingHeader from "../components/LandingPage/LandingHeader";
// import selectCourseImg from "../assets/selectcourse.png";

// const Step2Course = ({ nextStep, prevStep, handleChange }) => {
//   const [selectedCourse, setSelectedCourse] = useState("");

//   const courses = [
//     "Creative Coding Adventures Designed",
//     "Robotics and STEM Projects",
//     "Design and Innovation Lab for Curious",
//   ];

//   const handleNext = () => {
//     if (!selectedCourse) {
//       alert("Please select a course.");
//       return;
//     }
//     handleChange("course", selectedCourse);
//     nextStep();
//   };

//   return (
//     <>
//       <LandingHeader />
//       <div className="container-fluid d-flex justify-content-center">
//         <div className="demo-card animated-card shadow-lg">
//           <div className="headline">🎓 Select a Course 🎓</div>
//           <div className="row g-0">
//             <div className="col-md-6 left-img">
//               <img src={selectCourseImg} alt="Select Course" />
//             </div>
//             <div className="col-md-6 form-side d-flex align-items-center justify-content-center p-4">
//               <div className="w-100 text-center">
//                 <h5 className="mb-3 fw-bold">Choose your course</h5>
//                 <select
//                   className="form-select mb-4"
//                   value={selectedCourse}
//                   onChange={(e) => setSelectedCourse(e.target.value)}
//                 >
//                   <option value="">-- Choose a course --</option>
//                   {courses.map((course, idx) => (
//                     <option key={idx} value={course}>
//                       {course}
//                     </option>
//                   ))}
//                 </select>
//                 <div className="d-flex justify-content-between">
//                   <button onClick={prevStep} className="btn btn-secondary px-4">
//                     ⬅ Back
//                   </button>
//                   <button onClick={handleNext} className="btn btn-primary px-4">
//                     Next ➡
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Step2Course;




import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/step2course.css";
import LandingHeader from "../components/LandingPage/LandingHeader";
import selectCourseImg from "../assets/selectcourse.png";

import { fetchPublicCourses } from "../api/courseAPI";

const Step2Course = ({ nextStep, prevStep, handleChange }) => {

  const [selectedCourse, setSelectedCourse] = useState("");
  const [courses, setCourses] = useState([]);

  // LOAD COURSES FROM BACKEND
  useEffect(() => {

    const loadCourses = async () => {
      const data = await fetchPublicCourses();
      setCourses(data);
    };

    loadCourses();

  }, []);

  const handleNext = () => {

    if (!selectedCourse) {
      alert("Please select a course.");
      return;
    }

    handleChange("course", selectedCourse);
    nextStep();
  };

  return (
    <>
      <LandingHeader />

      <div className="container-fluid d-flex justify-content-center">
        <div className="demo-card animated-card shadow-lg">

          <div className="headline">🎓 Select a Course 🎓</div>

          <div className="row g-0">

            <div className="col-md-6 left-img">
              <img src={selectCourseImg} alt="Select Course" />
            </div>

            <div className="col-md-6 form-side d-flex align-items-center justify-content-center p-4">

              <div className="w-100 text-center">

                <h5 className="mb-3 fw-bold">Choose your course</h5>

                <select
                  className="form-select mb-4"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  <option value="">-- Choose a course --</option>

                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}

                </select>

                <div className="d-flex justify-content-between">

                  <button
                    onClick={prevStep}
                    className="btn btn-secondary px-4"
                  >
                    ⬅ Back
                  </button>

                  <button
                    onClick={handleNext}
                    className="btn btn-primary px-4"
                  >
                    Next ➡
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default Step2Course;