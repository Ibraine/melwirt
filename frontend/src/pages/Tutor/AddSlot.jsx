import React, { useEffect, useState } from "react";
import { createSlot, fetchCourses, fetchStudents } from "../../api/scheduleAPI";
import "../../styles/addslot.css";
import { toast } from "react-toastify";

const AddSlot = ({ onClose }) => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    student: "",
    course: "",
    module: "",
    session: "",
    date: "",
    start_time: "",
    end_time: "",
    is_demo: false,
    meet_link: "",
    modules: [], // selected course ke modules
  });

  // ================= FETCH COURSES =================
  useEffect(() => {
    fetchCourses()
      .then(setCourses)
      .catch(() => toast.error("Failed to load courses"));
  }, []);

  // ================= FETCH STUDENTS =================
  useEffect(() => {
    fetchStudents()
      .then(setStudents)
      .catch(() => toast.error("Failed to load students"));
  }, []);

  // ================= HANDLE COURSE CHANGE =================
  const handleCourseChange = (courseId) => {
    const selected = courses.find((c) => c.id === Number(courseId));
    setForm({
      ...form,
      course: courseId,
      module: "",
      session: "",
      modules: selected?.modules || [],
    });
  };

  // ================= HANDLE MODULE CHANGE =================
  const handleModuleChange = (moduleId) => {
    setForm({
      ...form,
      module: moduleId,
      session: "",
    });
  };

  // ================= SUBMIT =================
  const submit = async () => {
    if (!form.course || !form.date || !form.start_time || !form.end_time) {
      toast.error("Course, Date, Start Time, End Time are required");
      return;
    }

    if (!form.student) {
      toast.error("Please select a student");
      return;
    }

    try {
      const payload = {
        student: Number(form.student),
        course: Number(form.course),
        module: form.module ? Number(form.module) : null,
        session: form.session ? Number(form.session) : null,
        date: form.date,
        start_time: `${form.start_time}:00`,
        end_time: `${form.end_time}:00`,
        is_demo: form.is_demo,
        meet_link: form.meet_link || "",
      };

      await createSlot(payload);
      setSuccess(true);
    } catch (e) {
      toast.error(e.response?.data?.detail || "Error creating slot");
    }
  };

  // ================= SUCCESS SCREEN =================
  if (success) {
    return (
      <div className="add-slot-container">
        <div className="success-box">
          <div className="tick-circle">✔</div>
          <h3>Slot Created Successfully</h3>
          <p>Your class slot has been added.</p>
          <button className="done-btn" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    );
  }

  // ================= FORM =================
  return (
    <div className="add-slot-container">
      <div className="add-slot">
        <h3>Add Class Slot</h3>

        {/* ================= STUDENT ================= */}
        <select
          value={form.student}
          onChange={(e) => setForm({ ...form, student: e.target.value })}
        >
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        {/* ================= COURSE ================= */}
        <select
          value={form.course}
          onChange={(e) => handleCourseChange(e.target.value)}
        >
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>

        {/* ================= MODULE ================= */}
        {form.modules.length > 0 && (
          <select
            value={form.module}
            onChange={(e) => handleModuleChange(e.target.value)}
          >
            <option value="">Select Module</option>
            {form.modules.map((m) => (
              <option key={m.id} value={m.id}>
                {m.title}
              </option>
            ))}
          </select>
        )}

        {/* ================= SESSION ================= */}
        {form.module &&
          form.modules
            .find((m) => m.id === Number(form.module))
            ?.sessions.map((s) => (
              <select
                key={s.id}
                value={form.session}
                onChange={(e) => setForm({ ...form, session: e.target.value })}
              >
                <option value="">Select Session</option>
                <option value={s.id}>{s.title}</option>
              </select>
            ))}

        {/* ================= DATE & TIME ================= */}
        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <input
          type="time"
          value={form.start_time}
          onChange={(e) => setForm({ ...form, start_time: e.target.value })}
        />
        <input
          type="time"
          value={form.end_time}
          onChange={(e) => setForm({ ...form, end_time: e.target.value })}
        />

        {/* ================= DEMO ================= */}
        <label>
          <input
            type="checkbox"
            checked={form.is_demo}
            onChange={(e) => setForm({ ...form, is_demo: e.target.checked })}
          />{" "}
          Demo Class
        </label>

        {/* ================= MEET LINK ================= */}
        <input
          type="text"
          placeholder="Google Meet / Zoom Link (optional)"
          value={form.meet_link}
          onChange={(e) => setForm({ ...form, meet_link: e.target.value })}
        />

        {/* ================= SUBMIT ================= */}
        <button onClick={submit}>Create Slot</button>
      </div>
    </div>
  );
};

export default AddSlot;
