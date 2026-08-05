// src/pages/Tutor/CreateAssignment.jsx
import React, { useEffect, useState } from "react";
import { createAssignment } from "../../api/assignmentAPI";
import { fetchCourses } from "../../api/courseAPI";
import { toast } from "react-toastify";

const CreateAssignment = ({ onSuccess, onClose }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    course: "",
    title: "",
    description: "",
    due_date: "",
  });

  // =====================
  // LOAD COURSES
  // =====================
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (err) {
        toast.error("Failed to load courses");
        console.error(err);
      }
    };

    loadCourses();
  }, []);

  // =====================
  // SUBMIT
  // =====================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.course || !form.title || !form.due_date) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      await createAssignment(form);

      toast.success("Assignment created successfully ✅");

      onSuccess(); // 🔥 close + refresh list
    } catch (err) {
      toast.error("Failed to create assignment ❌");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-4 mt-3">
      <h3 className="mb-3">Create Assignment</h3>

      <form onSubmit={handleSubmit}>
        {/* COURSE */}
        <select
          className="form-control mb-3"
          value={form.course}
          onChange={(e) => setForm({ ...form, course: e.target.value })}
          required
        >
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>

        {/* TITLE */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Assignment Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        {/* DESCRIPTION */}
        <textarea
          className="form-control mb-3"
          placeholder="Assignment Description"
          rows="4"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        {/* DUE DATE */}
        <input
          type="datetime-local"
          className="form-control mb-4"
          value={form.due_date}
          onChange={(e) => setForm({ ...form, due_date: e.target.value })}
          required
        />

        {/* BUTTONS */}
        <div className="d-flex gap-2">
          <button
            type="submit"
            className="btn btn-success"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Assignment"}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAssignment;
