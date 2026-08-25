import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { fetchEnrollments, deleteEnrollment, updateEnrollment } from "../../api/enrollmentAPI";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddEnrollmentModal from "./AddEnrollmentModal";
import { Plus, RefreshCw, Trash2 } from "lucide-react";

const Enrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ course: "", student: "", status: "" });
  const [showModal, setShowModal] = useState(false);

  const loadEnrollments = async () => {
    setLoading(true);
    try {
      const res = await fetchEnrollments(filters);
      setEnrollments(res.results || res);
    } catch (err) {
      console.error("Failed to fetch enrollments:", err);
      setEnrollments([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadEnrollments();
  }, [filters]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this enrollment?")) return;
    try {
      await deleteEnrollment(id);
      toast.success("Enrollment deleted!");
      loadEnrollments();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete enrollment");
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await updateEnrollment(id, { is_active: !currentStatus });
      toast.success("Status updated!");
      loadEnrollments();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="d-flex admin-page">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />

        <div className="container mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Enrollments</h4>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}><Plus size={16} /> Add Enrollment</button>
          </div>

          {/* Filters */}
          <div className="row mb-3">
            <div className="col-md-4">
              <input
                type="text"
                placeholder="Search Student"
                name="student"
                value={filters.student}
                onChange={handleFilterChange}
                className="form-control"
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                placeholder="Search Course"
                name="course"
                value={filters.course}
                onChange={handleFilterChange}
                className="form-control"
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="">All Status</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <p className="text-center p-4">Loading...</p>
          ) : enrollments.length > 0 ? (
            <table className="table table-striped table-bordered text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map((enroll) => (
                  <tr key={enroll.id}>
                    <td>{enroll.id}</td>
                    <td>{enroll.student_name}</td>
                    <td>{enroll.course_title}</td>
                    <td>
                      <span className={`badge ${enroll.is_active ? "bg-success" : "bg-danger"}`}>
                        {enroll.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>{new Date(enroll.created_at).toLocaleString()}</td>
                    <td>
                      <button className="btn btn-sm btn-success me-2" onClick={() => handleToggleStatus(enroll.id, enroll.is_active)}><RefreshCw size={14} /> Toggle</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(enroll.id)}><Trash2 size={14} /> Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">No enrollments found</p>
          )}
        </div>
      </div>

      {showModal && <AddEnrollmentModal onClose={() => setShowModal(false)} refresh={loadEnrollments} />}
    </div>
  );
};

export default Enrollments;
