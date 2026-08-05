import React, { useEffect, useState } from "react";
import {
  createAdminSlot,
  fetchCourses,
  fetchStudents,
  fetchTutorByCourse,
} from "../../api/scheduleAPI";

import "../../styles/addslot.css";
import { toast } from "react-toastify";

const AdminAddSlot = ({ onClose }) => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    student: "",
    tutor: "",
    course: "",
    module: "",
    session: "",
    date: "",
    start_time: "",
    end_time: "",
    is_demo: false,
    meet_link: "",
    modules: [],
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

  // ================= COURSE CHANGE =================
  const handleCourseChange = async (courseId) => {
    const selected = courses.find(
      (c) => c.id === Number(courseId)
    );

    try {
      const tutorData = await fetchTutorByCourse(courseId);

      setForm((prev) => ({
        ...prev,
        course: courseId,
        tutor: tutorData.id,
        module: "",
        session: "",
        modules: selected?.modules || [],
      }));
    } catch {
      toast.error("Tutor not assigned to this course");
    }
  };

  // ================= MODULE CHANGE =================
  const handleModuleChange = (moduleId) => {
    setForm((prev) => ({
      ...prev,
      module: moduleId,
      session: "",
    }));
  };

  // ================= ✅ FINAL SUBMIT =================
  const submit = async () => {
    if (!form.course || !form.date || !form.start_time || !form.end_time) {
      toast.error("Course, Date, Start Time, End Time are required");
      return;
    }

    if (!form.tutor) {
      toast.error("Tutor not assigned");
      return;
    }

    try {
      const payload = {
        // ✅ FREE SLOT SUPPORT
        student: form.student
          ? Number(form.student)
          : null,

        tutor: Number(form.tutor),
        course: Number(form.course),

        module: form.module
          ? Number(form.module)
          : null,

        session: form.session
          ? Number(form.session)
          : null,

        date: form.date,
        start_time: `${form.start_time}:00`,
        end_time: `${form.end_time}:00`,
        is_demo: form.is_demo,
        meet_link: form.meet_link || "",
      };

      await createAdminSlot(payload);

      toast.success(
        form.student
          ? "Class Slot Created ✅"
          : "Free Slot Created ✅"
      );

      setSuccess(true);

    } catch (e) {
      toast.error(
        e.response?.data?.detail || "Error creating slot"
      );
    }
  };

  // ================= SUCCESS =================
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

        {/* COURSE */}
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

        {/* AUTO TUTOR */}
        <select value={form.tutor} disabled>
          <option>
            {form.tutor
              ? "Tutor Auto Assigned ✅"
              : "Select Course First"}
          </option>
        </select>

        {/* ✅ STUDENT OPTIONAL */}
        <select
          value={form.student}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              student: e.target.value,
            }))
          }
        >
          <option value="">
            Free Slot (Reschedule Use)
          </option>

          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        {/* MODULE */}
        {form.modules.length > 0 && (
          <select
            value={form.module}
            onChange={(e) =>
              handleModuleChange(e.target.value)
            }
          >
            <option value="">Select Module</option>
            {form.modules.map((m) => (
              <option key={m.id} value={m.id}>
                {m.title}
              </option>
            ))}
          </select>
        )}

        {/* SESSION */}
        {form.module && (
          <select
            value={form.session}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                session: e.target.value,
              }))
            }
          >
            <option value="">Select Session</option>

            {form.modules
              .find((m) => m.id === Number(form.module))
              ?.sessions.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
          </select>
        )}

        {/* DATE */}
        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={form.date}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              date: e.target.value,
            }))
          }
        />

        {/* TIME */}
        <input
          type="time"
          value={form.start_time}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              start_time: e.target.value,
            }))
          }
        />

        <input
          type="time"
          value={form.end_time}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              end_time: e.target.value,
            }))
          }
        />

        {/* DEMO */}
        <label>
          <input
            type="checkbox"
            checked={form.is_demo}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                is_demo: e.target.checked,
              }))
            }
          />
          Demo Class
        </label>

        {/* MEET LINK */}
        <input
          type="text"
          placeholder="Google Meet / Zoom Link (optional)"
          value={form.meet_link}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              meet_link: e.target.value,
            }))
          }
        />

        <button onClick={submit}>
          Create Slot
        </button>
      </div>
    </div>
  );
};

export default AdminAddSlot;