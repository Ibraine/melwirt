// import React, { useEffect, useState } from "react";
// import { FaStar } from "react-icons/fa";
// import LandingHeader from "../components/LandingPage/LandingHeader";
// import "../styles/step3tutor.css";

// const SelectTutor = ({ nextStep, prevStep, handleChange, formData = {} }) => {
//   const [tutors, setTutors] = useState([]);
//   const [selectedTutor, setSelectedTutor] = useState(formData.tutor || null);

//   // 3 courses, each 4 tutors (2 Active, 2 Inactive)
//   const coursesTutors = {
//     "Creative Coding Adventures Designed": [
//       {
//         id: 1,
//         name: "Alice Johnson",
//         age: 28,
//         qualification: "MSc CS",
//         rating: 4.8,
//         status: "Active",
//         image:
//           "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80&auto=format&fit=crop"
//       },
//       {
//         id: 2,
//         name: "Bob Smith",
//         age: 32,
//         qualification: "BSc Design",
//         rating: 4.5,
//         status: "Active",
//         image:
//           "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=800&q=80&auto=format&fit=crop"
//       },
//       {
//         id: 3,
//         name: "Karen Blake",
//         age: 29,
//         qualification: "MIT AI",
//         rating: 4.3,
//         status: "Inactive",
//         image:
//           "https://images.unsplash.com/photo-1545996124-1f87f5f4d2c9?w=800&q=80&auto=format&fit=crop"
//       },
//       {
//         id: 4,
//         name: "Jason Roy",
//         age: 31,
//         qualification: "Harvard CS",
//         rating: 4.2,
//         status: "Inactive",
//         image:
//           "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=800&q=80&auto=format&fit=crop"
//       }
//     ],
//     "Robotics and STEM Projects": [
//       {
//         id: 5,
//         name: "Charlie Lee",
//         age: 30,
//         qualification: "MEng Robotics",
//         rating: 4.9,
//         status: "Active",
//         image:
//           "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=800&q=80&auto=format&fit=crop"
//       },
//       {
//         id: 6,
//         name: "Emily Watson",
//         age: 27,
//         qualification: "B.Tech ECE",
//         rating: 4.7,
//         status: "Active",
//         image:
//           "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80&auto=format&fit=crop"
//       },
//       {
//         id: 7,
//         name: "David Kim",
//         age: 34,
//         qualification: "PhD Robotics",
//         rating: 4.4,
//         status: "Inactive",
//         image:
//           "https://images.unsplash.com/photo-1545996124-1f87f5f4d2c9?w=800&q=80&auto=format&fit=crop"
//       },
//       {
//         id: 8,
//         name: "Sara Brooks",
//         age: 29,
//         qualification: "NASA Trainer",
//         rating: 4.1,
//         status: "Inactive",
//         image:
//           "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80&auto=format&fit=crop"
//       }
//     ],
//     "Design and Innovation Lab for Curious": [
//       {
//         id: 9,
//         name: "Evan Brown",
//         age: 29,
//         qualification: "MDes Innovation",
//         rating: 4.7,
//         status: "Active",
//         image:
//           "https://images.unsplash.com/photo-1545996124-1f87f5f4d2c9?w=800&q=80&auto=format&fit=crop"
//       },
//       {
//         id: 10,
//         name: "Fiona Green",
//         age: 31,
//         qualification: "BDes Creative",
//         rating: 4.6,
//         status: "Active",
//         image:
//           "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=800&q=80&auto=format&fit=crop"
//       },
//       {
//         id: 11,
//         name: "Chris Nolan",
//         age: 33,
//         qualification: "UX Researcher",
//         rating: 4.2,
//         status: "Inactive",
//         image:
//           "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80&auto=format&fit=crop"
//       },
//       {
//         id: 12,
//         name: "Natalie Reed",
//         age: 30,
//         qualification: "Designer Lead",
//         rating: 4.3,
//         status: "Inactive",
//         image:
//           "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80&auto=format&fit=crop"
//       }
//     ]
//   };

//   useEffect(() => {
//     if (formData?.course) {
//       setTutors(coursesTutors[formData.course] || []);
//       setSelectedTutor(formData.tutor || null); // keep previous selection if any
//     } else {
//       setTutors([]);
//       setSelectedTutor(null);
//     }
//   }, [formData?.course]);

//   const handleCardClick = (tutor) => {
//     if (tutor.status === "Inactive") return;
//     setSelectedTutor(tutor);
//   };

//   const handleNext = () => {
//     if (!selectedTutor) return;
//     handleChange("tutor", selectedTutor);
//     nextStep();
//   };

//   return (
//     <>
//       <LandingHeader />
//       <div className="select-tutor-wrap container my-5">
//         <h3 className="select-title text-center">👨‍🏫 Select Your Tutor 👨‍🏫</h3>

//         {!formData?.course && (
//           <div className="alert alert-info mt-4">
//             Please select a course first to see available tutors.
//           </div>
//         )}

//         <div className="tutor-cards mt-4">
//           {tutors.map((tutor) => {
//             const isSelected = selectedTutor?.id === tutor.id;
//             return (
//               <div
//                 key={tutor.id}
//                 className={`tutor-card-full ${tutor.status === "Inactive" ? "tutor-inactive" : ""} ${
//                   isSelected ? "tutor-selected" : ""
//                 }`}
//                 onClick={() => handleCardClick(tutor)}
//                 role="button"
//                 aria-pressed={isSelected}
//                 tabIndex={tutor.status === "Inactive" ? -1 : 0}
//                 onKeyDown={(e) => {
//                   if ((e.key === "Enter" || e.key === " ") && tutor.status !== "Inactive") {
//                     handleCardClick(tutor);
//                   }
//                 }}
//               >
//                 <div className="tutor-left">
//                   <img src={tutor.image} alt={tutor.name} className="tutor-photo" />
//                 </div>

//                 <div className="tutor-middle">
//                   <div className="tutor-top">
//                     <h4 className="tutor-name mb-1">{tutor.name} <span className="tutor-age">({tutor.age} yrs)</span></h4>
//                     <div className="tutor-qual">{tutor.qualification}</div>
//                   </div>

//                   <div className="tutor-bottom">
//                     <div className="rating-wrap" aria-label={`Rating ${tutor.rating}`}>
//                       {[...Array(5)].map((_, i) => (
//                         <FaStar
//                           key={i}
//                           size={14}
//                           color={i < Math.round(tutor.rating) ? "#ffc107" : "#e4e5e9"}
//                           style={{ marginRight: 4 }}
//                         />
//                       ))}
//                       <span className="rating-number ms-2">{tutor.rating}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="tutor-right">
//                   <span className={`status-tag ${tutor.status === "Active" ? "status-active" : "status-inactive"}`}>
//                     {tutor.status}
//                   </span>
//                 </div>

//                 {/* overlay (shown on hover for active tutors) */}
//                 {tutor.status === "Active" && (
//                   <div className={`card-overlay ${isSelected ? "overlay-selected" : ""}`}>
//                     <div className="overlay-text">Select Tutor</div>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>

//         <div className="d-flex justify-content-between align-items-center mt-4">
//           <button className="btn btn-secondary px-4" onClick={prevStep}>⬅ Back</button>
//           <button
//             className={`btn btn-primary px-4 ${!selectedTutor ? "btn-disabled" : ""}`}
//             onClick={handleNext}
//             disabled={!selectedTutor}
//           >
//             Next ➡
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SelectTutor;




import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import "../styles/step3tutor.css";

import { fetchPublicTutors } from "../api/courseAPI";

const SelectTutor = ({ nextStep, prevStep, handleChange, formData = {} }) => {
  const [tutors, setTutors] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState(formData.tutor || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const loadTutors = async () => {

      if (!formData?.course) {
        setTutors([]);
        return;
      }

      setLoading(true);
      try {

        const data = await fetchPublicTutors(formData.course);

        // Backend tutor → UI format convert
        const formattedTutors = data.map((t) => ({
          id: t.id,
          name: t.name,
          age: 30, // dummy
          qualification: "Expert Tutor",
          rating: 4.8,
          status: "Active",
          image:
            "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=800&q=80&auto=format&fit=crop"
        }));

        setTutors(formattedTutors);

      } catch (error) {

        console.error("Tutor load error:", error);
        setTutors([]);
      } finally {
        setLoading(false);

      }

    };

    loadTutors();

  }, [formData?.course]);

  const handleCardClick = (tutor) => {
    if (tutor.status === "Inactive") return;
    setSelectedTutor(tutor);
  };

  const handleNext = () => {
    if (!selectedTutor) return;
    handleChange("tutor", selectedTutor);
    nextStep();
  };

  return (
    <div className="select-tutor-wrap container my-5">

        <h3 className="select-title text-center">
          👨‍🏫 Select Your Tutor 👨‍🏫
        </h3>

        {!formData?.course && (
          <div className="alert alert-info mt-4">
            Please select a course first to see available tutors.
          </div>
        )}

        <div className="tutor-cards mt-4" aria-busy={loading}>

          {loading && (
            <div className="demo-inline-loading">
              <span className="spinner-border spinner-border-sm" /> Loading tutors...
            </div>
          )}

          {tutors.map((tutor) => {

            const isSelected = selectedTutor?.id === tutor.id;

            return (
              <div
                key={tutor.id}
                className={`tutor-card-full ${
                  tutor.status === "Inactive" ? "tutor-inactive" : ""
                } ${isSelected ? "tutor-selected" : ""}`}
                onClick={() => handleCardClick(tutor)}
                role="button"
                aria-pressed={isSelected}
                tabIndex={tutor.status === "Inactive" ? -1 : 0}
              >

                <div className="tutor-left">
                  <img
                    src={tutor.image}
                    alt={tutor.name}
                    className="tutor-photo"
                  />
                </div>

                <div className="tutor-middle">

                  <div className="tutor-top">

                    <h4 className="tutor-name mb-1">
                      {tutor.name}{" "}
                      <span className="tutor-age">
                        ({tutor.age} yrs)
                      </span>
                    </h4>

                    <div className="tutor-qual">
                      {tutor.qualification}
                    </div>

                  </div>

                  <div className="tutor-bottom">

                    <div
                      className="rating-wrap"
                      aria-label={`Rating ${tutor.rating}`}
                    >

                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          size={14}
                          color={
                            i < Math.round(tutor.rating)
                              ? "#ffc107"
                              : "#e4e5e9"
                          }
                          style={{ marginRight: 4 }}
                        />
                      ))}

                      <span className="rating-number ms-2">
                        {tutor.rating}
                      </span>

                    </div>

                  </div>

                </div>

                <div className="tutor-right">

                  <span
                    className={`status-tag ${
                      tutor.status === "Active"
                        ? "status-active"
                        : "status-inactive"
                    }`}
                  >
                    {tutor.status}
                  </span>

                </div>

                {tutor.status === "Active" && (
                  <div
                    className={`card-overlay ${
                      isSelected ? "overlay-selected" : ""
                    }`}
                  >
                    <div className="overlay-text">
                      Select Tutor
                    </div>
                  </div>
                )}

              </div>
            );
          })}

        </div>

        <div className="d-flex justify-content-between align-items-center mt-4">

          <button
            className="btn btn-secondary px-4"
            onClick={prevStep}
          >
            ⬅ Back
          </button>

          <button
            className={`btn btn-primary px-4 ${
              !selectedTutor ? "btn-disabled" : ""
            }`}
            onClick={handleNext}
            disabled={!selectedTutor}
          >
            Next ➡
          </button>

        </div>

    </div>
  );
};

export default SelectTutor;