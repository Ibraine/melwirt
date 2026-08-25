import React, { useEffect, useState } from "react";
import { Edit3, RefreshCw, Trash2 } from "lucide-react";
import DataTable from "../../components/Table/DataTable";
import FilterBar from "../../components/Filters/FilterBar";
import PaginationControl from "../../components/Pagination/PaginationControl";
import EditUserForm from "../../components/Forms/EditUserForm";
import AddUserModal from "../../components/Forms/AddUserModalAdvanced";

import {
  fetchUsers,
  deleteUser,
  toggleUserStatus,
  setUserPermissions,  // FIXED IMPORT
} from "../../api/adminPanelAPI";

import "../../styles/adminpage.css";
import "../../styles/editmodal.css";

const itemsPerPage = 5;

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [accountStatus, setAccountStatus] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [permissionLoadingId, setPermissionLoadingId] = useState(null);

  const token = localStorage.getItem("token");

  const loadUsers = async () => {
    try {
      setLoading(true);
      const params = { page: currentPage, page_size: itemsPerPage };
      if (search) params.search = search;
      if (accountStatus) params.is_active = accountStatus === "active";
      if (verificationStatus) params.verification = verificationStatus;

      const res = await fetchUsers(token, params);
      setUsers(res.results || []);
      const total = res.count || (res.total_users ?? (res.results?.length || 0));
      setTotalPages(Math.max(1, Math.ceil(total / itemsPerPage)));
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, accountStatus, verificationStatus]);

  useEffect(() => {
    loadUsers();
  }, [currentPage, search, accountStatus, verificationStatus]);

  // ====== Permission Update Handler ========
  const handlePermissionToggle = async (id, field) => {
    try {
      setPermissionLoadingId(id);
      const user = users.find((u) => u.id === id);
      const payload = { [field]: !user[field] };
      await setUserPermissions(token, id, payload);  // ✅ FIXED
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, [field]: !u[field] } : u))
      );
    } catch (err) {
      console.error("Error updating permission:", err);
    } finally {
      setPermissionLoadingId(null);
    }
  };

  const handleEdit = (user) => setSelectedUser(user);
  const handleClose = () => setSelectedUser(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      setDeletingId(id);
      await deleteUser(token, id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggle = async (id) => handlePermissionToggle(id, "is_active");

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Name", render: (row) => `${row.first_name || ""} ${row.last_name || ""}` },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
    {
      header: "Status",
      render: (row) => (
        <span className={`dt-badge ${row.is_active ? "success" : "danger"}`}>
          {row.is_active ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      header: "Staff",
      render: (row) => (
        <input
          type="checkbox"
          checked={!!row.is_staff}
          disabled={permissionLoadingId === row.id}
          onChange={() => handlePermissionToggle(row.id, "is_staff")}
        />
      ),
    },
    {
      header: "Superuser",
      render: (row) => (
        <input
          type="checkbox"
          checked={!!row.is_superuser}
          disabled={permissionLoadingId === row.id}
          onChange={() => handlePermissionToggle(row.id, "is_superuser")}
        />
      ),
    },
    {
      header: "Action",
      render: (row) => (
        <div className="action-buttons">
          <button className="icon-btn edit" onClick={() => handleEdit(row)} title="Edit">
            <Edit3 size={16} strokeWidth={1.8} />
          </button>
          <button
            className="icon-btn toggle"
            onClick={() => handleToggle(row.id)}
            title={row.is_active ? "Deactivate" : "Activate"}
          >
            <RefreshCw size={16} strokeWidth={1.8} />
          </button>
          <button
            className="icon-btn delete"
            onClick={() => handleDelete(row.id)}
            disabled={deletingId === row.id}
            title="Delete"
          >
            <Trash2 size={16} strokeWidth={1.8} />
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
            <h2>All Users</h2>
            <p className="page-sub">Manage all platform users — search, filter, edit or delete</p>
          </div>
          <div>
            <button className="btn-primary" onClick={() => setShowAddModal(true)}>
              + Add
            </button>
          </div>
        </div>

        <FilterBar
          searchValue={search}
          onSearchChange={setSearch}
          accountStatus={accountStatus}
          onAccountStatusChange={setAccountStatus}
          verificationStatus={verificationStatus}
          onVerificationStatusChange={setVerificationStatus}
          onAddClick={() => setShowAddModal(true)}
        />

        {loading ? (
          <div className="skeleton-grid">
            {[...Array(5)].map((_, i) => <div className="skeleton-row" key={i} />)}
          </div>
        ) : users.length === 0 ? (
          <div className="empty-state">No users found</div>
        ) : (
          <>
            <DataTable columns={columns} data={users} className="users-data-table" />
            <PaginationControl
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(p) => setCurrentPage(p)}
            />
          </>
        )}

        {showAddModal && (
          <AddUserModal
            onClose={() => setShowAddModal(false)}
            onUserAdded={loadUsers}
          />
        )}

        {selectedUser && (
          <div className="edit-overlay" onClick={handleClose}>
            <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
              <div className="edit-header">
                <h3>Edit {selectedUser.role}</h3>
                <button className="close-btn" onClick={handleClose}>✕</button>
              </div>
              <EditUserForm
                role={selectedUser.role}
                initialData={selectedUser}
                onCancel={handleClose}
                onSubmit={async (payload) => {
                  try {
                    await setUserPermissions(token, selectedUser.id, payload);  // ✅ FIXED
                    await loadUsers();
                    setSelectedUser(null);
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

export default AllUsers;
