// import React, { useState } from "react";
// import Sidebar from "../../components/Sidebar";
// import Header from "../../components/Header";
// import { reviewSubmission } from "../../api/assignmentAPI";
// import axiosInstance from "../../api/axiosConfig"; // ✅🔥 MISSING IMPORT
// import { toast } from "react-toastify";

// const ReviewAssignment = ({ assignment, onBack }) => {
//   const [remark, setRemark] = useState("");
//   const [status, setStatus] = useState("");

//   // ✅ PDF DOWNLOAD (AUTH SAFE)
//   const handleDownload = async () => {
//     try {
//       const res = await axiosInstance.get(
//         `/api/assignments/submission/download/${assignment.id}/`,
//         {
//           responseType: "blob",
//         }
//       );

//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "assignment.pdf");
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (err) {
//       console.error(err);
//       toast.error("Download failed ❌");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await reviewSubmission(assignment.id, {
//         status,
//         tutor_remark: remark,
//       });
//       toast.success("Reviewed successfully ✅");
//       onBack();
//     } catch {
//       toast.error("Review failed ❌");
//     }
//   };

//   return (
//     <div className="d-flex">
//       <Sidebar role="tutor" />
//       <div className="flex-grow-1 p-4">
//         <Header role="tutor" />

//         <div className="card p-4 shadow-sm">
//           <button onClick={onBack} className="btn btn-light btn-sm mb-3">
//             ← Back
//           </button>

//           <h4>{assignment.assignment_title}</h4>
//           <p>
//             <b>Student:</b> {assignment.student_name}
//           </p>

//           {/* ✅ FIXED DOWNLOAD BUTTON */}
//           <button
//             onClick={handleDownload}
//             className="btn btn-outline-primary btn-sm mb-3"
//           >
//             Download Submission
//           </button>

//           <form onSubmit={handleSubmit}>
//             <select
//               className="form-control mb-3"
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//               required
//             >
//               <option value="">Select Result</option>
//               <option value="SUCCESS">Approve</option>
//               <option value="REJECTED">Reject</option>
//             </select>

//             <textarea
//               className="form-control mb-3"
//               placeholder="Tutor remark"
//               value={remark}
//               onChange={(e) => setRemark(e.target.value)}
//             />

//             <button className="btn btn-success">Submit Review</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewAssignment;


import React, { useState } from "react";
import { reviewSubmission } from "../../api/assignmentAPI";
import axiosInstance from "../../api/axiosConfig";
import { toast } from "react-toastify";

const ReviewAssignment = ({ assignment, onBack }) => {
  const [remark, setRemark] = useState("");
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // PDF Download
  const handleDownload = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/assignments/submission/download/${assignment.id}/`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "assignment.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      toast.error("Download failed ❌");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await reviewSubmission(assignment.id, {
        status,
        tutor_remark: remark,
      });
      toast.success("Reviewed successfully ✅");
      onBack();
    } catch {
      toast.error("Review failed ❌");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="review-card-wrapper shadow-sm">
      <div className="mb-3">
        <button onClick={onBack} className="btn btn-outline-secondary btn-sm">
          ← Back to Submissions
        </button>
      </div>

      <h4 className="fw-bold mb-2 text-dark">
        {assignment.assignment_title || "Review Submission"}
      </h4>
      <p className="text-muted mb-3">
        <b>Student:</b> {assignment.student_name}
      </p>

      <div className="mb-4">
        <button
          type="button"
          onClick={handleDownload}
          className="btn btn-outline-primary btn-sm"
        >
          📥 Download Submission PDF
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-semibold">Select Result</label>
          <select
            className="form-select custom-input"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Select Result</option>
            <option value="SUCCESS">Approve</option>
            <option value="REJECTED">Reject</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Tutor Remark</label>
          <textarea
            className="form-control custom-input"
            placeholder="Write comments or feedback for student..."
            rows="3"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />
        </div>

        <div className="d-flex justify-content-end gap-2 mt-4 pt-2 border-top">
          <button
            type="submit"
            className="btn btn-success"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewAssignment;