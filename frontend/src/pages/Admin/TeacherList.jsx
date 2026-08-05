import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import DataTable from "../../components/Table/DataTable";
import FilterBar from "../../components/Filters/FilterBar";
import PaginationControl from "../../components/Pagination/PaginationControl";
import EditUserForm from "../../components/Forms/EditUserForm";
import AddUserModal from "../../components/Forms/AddUserModalAdvanced"; // ✅ advanced modal
import {
  fetchTutors,
  deleteUser,
  toggleUserStatus,
} from "../../api/adminPanelAPI";
import "../../styles/adminpage.css";
import "../../styles/editmodal.css";

const itemsPerPage = 5;

const TeacherList = () => {
  const [tutors, setTutors] = useState([]);
  const [search, setSearch] = useState("");
  const [accountStatus, setAccountStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const token = localStorage.getItem("token");

  const loadTutors = async () => {
    try {
      setLoading(true);
      const params = { page: currentPage, page_size: itemsPerPage, search: search || "" };
      if (search) params.search = search;
      if (accountStatus) params.is_active = accountStatus === "active";

      const res = await fetchTutors(token, params);
      setTutors(res.results || []);
      const total = res.count || res.results?.length || 0;
      setTotalPages(Math.ceil((res.count || 0) / itemsPerPage) || 1);
    } catch (err) {
      console.error("Error fetching tutors:", err);
      setTutors([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, accountStatus]);

  useEffect(() => {
    loadTutors();
  }, [currentPage, search, accountStatus]);

  const handleEdit = (tutor) => setSelectedTutor(tutor);
  const handleClose = () => setSelectedTutor(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tutor?")) return;
    try {
      setDeletingId(id);
      await deleteUser(token, id);
      setTutors((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Error deleting tutor:", err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleUserStatus(token, id);
      setTutors((prev) =>
        prev.map((t) => (t.id === id ? { ...t, is_active: !t.is_active } : t))
      );
    } catch (err) {
      console.error("Error toggling status:", err);
    }
  };

  // ✅ FIXED COLUMNS (no expertise + proper nested user support)
  const columns = [
    { header: "ID", accessor: "id" },
    {
      header: "Name",
      render: (row) =>
        `${row.first_name || row.user?.first_name || ""} ${
          row.last_name || row.user?.last_name || ""
        }`,
    },
    {
      header: "Email",
      render: (row) => row.email || row.user?.email || "—",
    },
    {
      header: "Status",
      render: (row) => (
        <span className={`dt-badge ${row.is_active ? "success" : "danger"}`}>
          {row.is_active ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      header: "Action",
      render: (row) => (
        <div className="action-buttons">
          <button
            className="icon-btn edit"
            onClick={() => handleEdit(row)}
            title="Edit"
          >
            <FiEdit />
          </button>
          <button
            className="icon-btn toggle"
            onClick={() => handleToggle(row.id)}
            title={row.is_active ? "Deactivate" : "Activate"}
          >
            🔁
          </button>
          <button
            className="icon-btn delete"
            onClick={() => handleDelete(row.id)}
            disabled={deletingId === row.id}
            title="Delete"
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
        <div className="page-header">
          <div>
            <h2>All Tutors</h2>
            <p className="page-sub">
              Manage all registered teachers — edit, activate, or delete
            </p>
          </div>
          <div>
            <button className="btn-primary" onClick={() => setShowAddModal(true)}>
              + Add Tutor
            </button>
          </div>
        </div>

        <FilterBar
          searchValue={search}
          onSearchChange={setSearch}
          accountStatus={accountStatus}
          onAccountStatusChange={setAccountStatus}
          onAddClick={() => setShowAddModal(true)}
        />

        {loading ? (
          <div className="skeleton-grid">
            {[...Array(5)].map((_, i) => (
              <div className="skeleton-row" key={i} />
            ))}
          </div>
        ) : tutors.length === 0 ? (
          <div className="empty-state">No tutors found</div>
        ) : (
          <>
            <DataTable columns={columns} data={tutors} />
            <PaginationControl
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(p) => setCurrentPage(p)}
            />
          </>
        )}

        {/* ✅ Add Tutor Modal */}
        {showAddModal && (
          <AddUserModal
            role="tutor"
            onClose={() => setShowAddModal(false)}
            onUserAdded={loadTutors}
          />
        )}

        {/* ✅ Edit Tutor Modal */}
        {selectedTutor && (
          <div className="edit-overlay" onClick={handleClose}>
            <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
              <div className="edit-header">
                <h3>Edit Tutor</h3>
                <button className="close-btn" onClick={handleClose}>
                  ✕
                </button>
              </div>
              <EditUserForm
                role="tutor"
                initialData={selectedTutor}
                onCancel={handleClose}
                onSubmit={async (payload) => {
                  try {
                    const formData = new FormData();
                    Object.keys(payload).forEach((k) => {
                      if (payload[k] !== undefined && payload[k] !== null)
                        formData.append(k, payload[k]);
                    });
                    await loadTutors();
                    setSelectedTutor(null);
                  } catch (err) {
                    console.error("Update failed", err);
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherList;
