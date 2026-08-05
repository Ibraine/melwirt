// // src/pages/Tutor/TutorSubmissions.jsx
// import React, { useEffect, useState } from "react";
// import Sidebar from "../../components/Sidebar";
// import Header from "../../components/Header";
// import { getTutorSubmissions } from "../../api/assignmentAPI";
// import ReviewAssignment from "./ReviewAssignment";
// import "../../styles/tutorsubmission.css";

// const TutorSubmissions = ({ assignment, onBack }) => {
//   const [submissions, setSubmissions] = useState([]);
//   const [selectedSubmission, setSelectedSubmission] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const loadSubmissions = async () => {
//     try {
//       const res = await getTutorSubmissions();

//       // ✅ FIX: assignment is ID, not object
//       const filtered = res.data.filter(
//         (s) => s.assignment === assignment.id
//       );

//       setSubmissions(filtered);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadSubmissions();
//   }, []);

//   return (
//     <div className="d-flex">
//       <Sidebar role="tutor" />
//       <div className="flex-grow-1 p-4 submission-page-body">
//         <Header role="tutor" />

//         {selectedSubmission ? (
//           <ReviewAssignment
//             assignment={selectedSubmission}
//             onBack={() => {
//               setSelectedSubmission(null);
//               loadSubmissions();
//             }}
//           />
//         ) : (
//           <>
//             <button className="btn-back" onClick={onBack}>
//               ← Back
//             </button>

//             <h2 className="submission-title">
//               {assignment.title} – Student Submissions
//             </h2>

//             <table className="submission-table">
//               <thead>
//                 <tr>
//                   <th>Student</th>
//                   <th>Status</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {loading ? (
//                   <tr>
//                     <td colSpan="3">Loading...</td>
//                   </tr>
//                 ) : submissions.length === 0 ? (
//                   <tr>
//                     <td colSpan="3">No submissions yet 🚫</td>
//                   </tr>
//                 ) : (
//                   submissions.map((s) => (
//                     <tr key={s.id}>
//                       <td>{s.student_name}</td>
//                       <td>
//                         <span
//                           className={
//                             s.status === "SUCCESS"
//                               ? "status-success"
//                               : "status-pending"
//                           }
//                         >
//                           {s.status}
//                         </span>
//                       </td>
//                       <td>
//                         <button
//                           className="review-btn"
//                           onClick={() => setSelectedSubmission(s)}
//                         >
//                           Review
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TutorSubmissions;


// src/pages/Tutor/TutorSubmissions.jsx
import React, { useEffect, useState } from "react";
import { getTutorSubmissions } from "../../api/assignmentAPI";
import ReviewAssignment from "./ReviewAssignment";
import "../../styles/tutorsubmission.css";

const TutorSubmissions = ({ assignment, onBack }) => {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadSubmissions = async () => {
    try {
      const res = await getTutorSubmissions();
      // Filter by assignment ID
      const filtered = res.data.filter(
        (s) => s.assignment === assignment.id
      );
      setSubmissions(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  // If a submission is selected for review, render review view
  if (selectedSubmission) {
    return (
      <ReviewAssignment
        assignment={selectedSubmission}
        onBack={() => {
          setSelectedSubmission(null);
          loadSubmissions();
        }}
      />
    );
  }

  return (
    <div className="submissions-card-wrapper shadow-sm">
      <div className="mb-3">
        <button className="btn btn-outline-secondary btn-sm" onClick={onBack}>
          ← Back to Assignments
        </button>
      </div>

      <h4 className="fw-bold mb-3 text-dark">
        {assignment.title} – Student Submissions
      </h4>

      <table className="table custom-submission-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Status</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="3" className="text-center py-3">Loading submissions...</td>
            </tr>
          ) : submissions.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center py-4 text-muted">
                No submissions yet 🚫
              </td>
            </tr>
          ) : (
            submissions.map((s) => (
              <tr key={s.id}>
                <td className="fw-semibold text-dark">{s.student_name}</td>
                <td>
                  <span
                    className={
                      s.status === "SUCCESS"
                        ? "badge bg-success"
                        : "badge bg-warning text-dark"
                    }
                  >
                    {s.status}
                  </span>
                </td>
                <td className="text-end">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setSelectedSubmission(s)}
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TutorSubmissions;
