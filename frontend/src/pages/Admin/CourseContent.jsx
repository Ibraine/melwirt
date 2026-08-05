import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import axios from "axios";

/* ================= ENROLL STUDENTS ================= */
const EnrollStudentsForm = ({ courseId, onEnrolled }) => {
  const token = localStorage.getItem("token");
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/students/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setStudents(res.data))
      .catch(() => {});
  }, []);

  const toggleSelect = (id) => {
    setSelected(
      selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id]
    );
  };

  const handleEnroll = async () => {
    if (selected.length === 0) return alert("Select at least one student");

    await axios.post(
      `http://127.0.0.1:8000/api/courses/${courseId}/enroll/`,
      { student_ids: selected },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setSelected([]);
    onEnrolled();
  };

  return (
    <div className="card p-3 mb-4">
      <h5>Enroll Students</h5>
      {students.map((s) => (
        <label key={s.id} className="d-block">
          <input
            type="checkbox"
            checked={selected.includes(s.id)}
            onChange={() => toggleSelect(s.id)}
          />{" "}
          {s.first_name} {s.last_name} ({s.email})
        </label>
      ))}
      <button className="btn btn-success mt-2" onClick={handleEnroll}>
        Enroll Selected
      </button>
    </div>
  );
};

/* ================= MAIN COMPONENT ================= */
const CourseContent = () => {
  const { courseId } = useParams();
  const token = localStorage.getItem("token");

  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [moduleData, setModuleData] = useState({ title: "", order: "" });
  const [sessionData, setSessionData] = useState({});

  // 🔥 ADMIN PROGRESS STATES
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    loadCourse();
    loadContent();
  }, [courseId]);

  const loadCourse = async () => {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/courses/${courseId}/`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setCourse(res.data);
  };

  const loadContent = async () => {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/courses/${courseId}/content/`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setModules(res.data);
  };

  const createModule = async () => {
    if (!moduleData.title || !moduleData.order) return;

    await axios.post(
      "http://127.0.0.1:8000/api/admin/modules/",
      { course: courseId, ...moduleData },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setModuleData({ title: "", order: "" });
    loadContent();
  };

  const createSession = async (moduleId) => {
    const data = sessionData[moduleId];
    if (!data?.title || !data?.order) return;

    await axios.post(
      "http://127.0.0.1:8000/api/admin/sessions/",
      {
        module: moduleId,
        title: data.title,
        order: data.order,
        duration_minutes: data.duration || 30,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setSessionData({ ...sessionData, [moduleId]: {} });
    loadContent();
  };

  /* ================= ADMIN SESSION CHECK ================= */
  const updateSessionProgress = async (sessionId, checked) => {
    if (!selectedStudentId) return alert("Select student first");

    await axios.post(
      "http://127.0.0.1:8000/api/admin/session-progress/",
      {
        student_id: selectedStudentId,
        session_id: sessionId,
        is_completed: checked,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchProgress();
  };

  const fetchProgress = async () => {
    if (!selectedStudentId) return;

    const res = await axios.get(
      `http://127.0.0.1:8000/api/admin/course/${courseId}/student/${selectedStudentId}/progress/`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setProgress(res.data.progress);
  };

  useEffect(() => {
    fetchProgress();
  }, [selectedStudentId]);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <div className="container mt-4">

          {/* COURSE INFO */}
          {course && (
            <div className="card p-3 mb-4">
              <h4>{course.title}</h4>
              <p><b>Total Students:</b> {course.enrolled_students.length}</p>
            </div>
          )}

          {course && (
            <EnrollStudentsForm courseId={courseId} onEnrolled={loadCourse} />
          )}

          {/* STUDENT SELECT */}
          {course?.enrolled_students?.length > 0 && (
            <div className="card p-3 mb-4">
              <h5>Select Student (Progress Control)</h5>
              <select
                className="form-select"
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
              >
                <option value="">-- Select Student --</option>
                {course.enrolled_students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.first_name} {s.last_name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* PROGRESS BAR */}
          {selectedStudentId && (
            <div className="card p-3 mb-4">
              <div style={{ background: "#e5e7eb", height: 8, borderRadius: 6 }}>
                <div
                  style={{
                    width: `${progress}%`,
                    height: "100%",
                    background: "#22c55e",
                    borderRadius: 6,
                  }}
                />
              </div>
              <small>{progress}% completed</small>
            </div>
          )}

          {/* ADD MODULE */}
          <div className="card p-3 mb-4">
            <input
              className="form-control mb-2"
              placeholder="Module title"
              value={moduleData.title}
              onChange={(e) =>
                setModuleData({ ...moduleData, title: e.target.value })
              }
            />
            <input
              className="form-control mb-2"
              type="number"
              placeholder="Order"
              value={moduleData.order}
              onChange={(e) =>
                setModuleData({ ...moduleData, order: e.target.value })
              }
            />
            <button className="btn btn-primary" onClick={createModule}>
              Add Module
            </button>
          </div>

          {/* MODULES + SESSIONS */}
          {modules.map((m) => (
            <div key={m.id} className="card p-3 mb-3">
              <h5>{m.order}. {m.title}</h5>

              {m.sessions.map((s) => (
                <div key={s.id} className="d-flex gap-2 align-items-center">
                  <input
                    type="checkbox"
                    disabled={!selectedStudentId}
                    onChange={(e) =>
                      updateSessionProgress(s.id, e.target.checked)
                    }
                  />
                  <span>{s.order}. {s.title}</span>
                </div>
              ))}

              <div className="mt-3">
                <input
                  className="form-control mb-2"
                  placeholder="Session title"
                  value={sessionData[m.id]?.title || ""}
                  onChange={(e) =>
                    setSessionData({
                      ...sessionData,
                      [m.id]: { ...sessionData[m.id], title: e.target.value },
                    })
                  }
                />
                <input
                  className="form-control mb-2"
                  type="number"
                  placeholder="Order"
                  value={sessionData[m.id]?.order || ""}
                  onChange={(e) =>
                    setSessionData({
                      ...sessionData,
                      [m.id]: { ...sessionData[m.id], order: e.target.value },
                    })
                  }
                />
                <button
                  className="btn btn-success"
                  onClick={() => createSession(m.id)}
                >
                  Add Session
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default CourseContent;
