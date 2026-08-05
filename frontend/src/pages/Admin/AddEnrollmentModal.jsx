import React, { useEffect, useState } from "react";
import { createEnrollment } from "../../api/enrollmentAPI";
import { fetchCourses } from "../../api/courseAPI";
import axiosInstance from "../../api/axiosConfig";
import { toast } from "react-toastify";

const AddEnrollmentModal = ({ onClose, refresh }) => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ student: "", course: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ students (adminpanel, token attached)
        const studentsRes = await axiosInstance.get(
          "/api/adminpanel/users/?role=student"
        );
        setStudents(
          Array.isArray(studentsRes.data.results)
            ? studentsRes.data.results
            : studentsRes.data
        );

        // ✅ courses (adminpanel, token attached)
        const coursesRes = await fetchCourses();
        setCourses(Array.isArray(coursesRes) ? coursesRes : []);
      } catch (err) {
        console.error(err);
        setStudents([]);
        setCourses([]);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.student || !form.course) {
      return toast.error("Student & Course are required");
    }

    try {
      await createEnrollment(form);
      toast.success("Enrollment added!");
      refresh();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add enrollment");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container p-4 bg-light rounded shadow">
        <h5>Add Enrollment</h5>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Student</label>
            <select
              name="student"
              value={form.student}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">-- Select Student --</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.first_name} {s.last_name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label>Course</label>
            <select
              name="course"
              value={form.course}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">-- Select Course --</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEnrollmentModal;
