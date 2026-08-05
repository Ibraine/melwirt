// src/pages/Student/ReSubmitAssignment.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosConfig"; // ✅ Correct import

const ReSubmitAssignment = () => {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return alert("Please select a file to submit");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("assignment", assignmentId);

    try {
      setLoading(true);
      await axiosInstance.post(
        "/api/assignments/student/submit/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Assignment re-submitted successfully ✅");
      navigate("/student/assignment"); // Navigate back to assignments page
    } catch (err) {
      console.error(err);
      alert("Failed to submit assignment ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h2>Re-Submit Assignment</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />

        <button
          type="submit"
          className="btn btn-success mt-3"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ReSubmitAssignment;
