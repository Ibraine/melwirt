import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import DataTable from "../../components/Table/DataTable";
import FilterBar from "../../components/Filters/FilterBar";
import PaginationControl from "../../components/Pagination/PaginationControl";
import EditUserForm from "../../components/Forms/EditUserForm";
import AddUserModal from "../../components/Forms/AddUserModalAdvanced"; // ✅ added
import { fetchUsers, toggleUserStatus, deleteUser } from "../../api/adminPanelAPI";
import "../../styles/adminpage.css";
import "../../styles/editmodal.css";

const itemsPerPage = 8;

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [accountStatus, setAccountStatus] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false); // ✅ added

  const token = localStorage.getItem("token");

  const loadStudents = async () => {
    try {
      setLoading(true);
      const params = { role: "student", page: currentPage, page_size: itemsPerPage };
      if (search) params.search = search;
      if (accountStatus) params.is_active = accountStatus === "active";
      if (verificationStatus) params.verification = verificationStatus;

      const res = await fetchUsers(token, params);
      setStudents(res.results || []);

      const total = res.count || res.results?.length || 0;
      setTotalPages(Math.ceil((res.count || 0) / itemsPerPage) || 1);
    } catch (err) {
      console.error("Error fetching students:", err);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => setCurrentPage(1), [search, accountStatus, verificationStatus]);
  useEffect(() => {
    loadStudents();
    // eslint-disable-next-line
  }, [currentPage, search, accountStatus, verificationStatus]);

  const handleToggle = async (id) => {
    try {
      await toggleUserStatus(token, id);
      setStudents((p) =>
        p.map((s) => (s.id === id ? { ...s, is_active: !s.is_active } : s))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    try {
      await deleteUser(token, id);
      setStudents((p) => p.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    { header: "Name", render: (r) => `${r.first_name || ""} ${r.last_name || ""}` },
    { header: "Email", accessor: "email" },
    { header: "Phone", accessor: "phone" },
    {
      header: "Status",
      render: (r) => (
        <span className={`dt-badge ${r.is_active ? "success" : "danger"}`}>
          {r.is_active ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      header: "Action",
      render: (r) => (
        <div className="action-buttons">
          <button
            className="icon-btn edit"
            onClick={() => setSelectedStudent(r)}
            title="Edit"
          >
            <FiEdit />
          </button>

          <button className="icon-btn toggle" onClick={() => handleToggle(r.id)}>
            🔁
          </button>

          <button
            className="icon-btn delete"
            onClick={() => handleDelete(r.id)}
          >
            <FiTrash2 />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="admin-layout">
      <div className="admin-content">

        {/* ✅ Header */}
        <div className="page-header">
          <h2>Student List</h2>
          <button className="btn-primary" onClick={() => setShowAddModal(true)}>
            + Add
          </button>
        </div>

        {/* ✅ Filters */}
        <FilterBar
          searchValue={search}
          onSearchChange={setSearch}
          accountStatus={accountStatus}
          onAccountStatusChange={setAccountStatus}
          verificationStatus={verificationStatus}
          onVerificationStatusChange={setVerificationStatus}
          onAddClick={() => setShowAddModal(true)} // ✅ works
        />

        {/* ✅ Loader / Table */}
        {loading ? (
          <div className="skeleton-grid">
            {[...Array(4)].map((_, i) => (
              <div className="skeleton-row" key={i} />
            ))}
          </div>
        ) : (
          <>
            <DataTable columns={columns} data={students} />
            <PaginationControl
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}

        {/* ✅ Add User Modal */}
        {showAddModal && (
          <AddUserModal
            onClose={() => setShowAddModal(false)}
            onUserAdded={loadStudents}
          />
        )}

        {/* ✅ Edit Modal */}
        {selectedStudent && (
          <div className="edit-overlay" onClick={() => setSelectedStudent(null)}>
            <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
              <div className="edit-header">
                <h3>Edit Student</h3>
                <button className="close-btn" onClick={() => setSelectedStudent(null)}>✕</button>
              </div>

              <EditUserForm
                role="student"
                initialData={selectedStudent}
                onCancel={() => setSelectedStudent(null)}
                onSubmit={async () => {
                  await loadStudents();
                  setSelectedStudent(null);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentList;
