import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {
  fetchAdminReferrals as fetchReferrals,
  updateReferral,
  deleteReferral,
} from "../../api/referralsAPI";
import "../../styles/referral.css";

const AdminReferral = () => {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // New referral form state
  const [newReferral, setNewReferral] = useState({
    reward_by_name: "",
    refer_to_name: "",
    refer_to_email: "",
    reward_type: "Enrollment",
  });

  // Filters state
  const [filters, setFilters] = useState({
    reward_type: "",
    reward_given: "",
  });

  const loadReferrals = async () => {
    setLoading(true);
    try {
      const res = await fetchReferrals({
        reward_type: filters.reward_type || undefined,
        reward_given: filters.reward_given || undefined,
      });
      const data = Array.isArray(res) ? res : res.results || [];
      setReferrals(data);
    } catch (err) {
      console.error("Referral fetch error:", err);
      setReferrals([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadReferrals();
  }, [filters]);

  const handleToggleReward = async (id, currentStatus) => {
    try {
      await updateReferral(id, { reward_given: !currentStatus });
      loadReferrals();
    } catch (err) {
      console.error(err);
      alert("Failed to update reward status");
    }
  };

  const handleDeleteReferral = async (id) => {
    if (!window.confirm("Are you sure you want to delete this referral?")) return;
    try {
      await deleteReferral(id);
      loadReferrals();
    } catch (err) {
      console.error(err);
      alert("Failed to delete referral");
    }
  };

  const handleCreateReferral = async () => {
    if (!newReferral.reward_by_name || !newReferral.refer_to_name) {
      return alert("Reward By & Refer To name are required");
    }

    try {
      // POST request to create referral
      await fetch("/api/adminpanel/referrals/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReferral),
      });
      alert("Referral created successfully!");
      setShowModal(false);
      setNewReferral({
        reward_by_name: "",
        refer_to_name: "",
        refer_to_email: "",
        reward_type: "Enrollment",
      });
      loadReferrals();
    } catch (err) {
      console.error(err);
      alert("Failed to create referral");
    }
  };

  return (
    <div className="d-flex admin-page">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />

        <div className="container mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Track Referrals</h4>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              Create Referral
            </button>
          </div>

          {/* Filters */}
          <div className="row mt-3 mb-4">
            <div className="col-md-6">
              <select
                className="form-select"
                value={filters.reward_type}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    reward_type: e.target.value === "Reward Type" ? "" : e.target.value,
                  })
                }
              >
                <option>Reward Type</option>
                <option value="Enrollment">Enrollment</option>
                <option value="Onboarding">Onboarding</option>
              </select>
            </div>
            <div className="col-md-6">
              <select
                className="form-select"
                value={filters.reward_given}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    reward_given: e.target.value === "Reward Taken" ? "" : e.target.value,
                  })
                }
              >
                <option>Reward Taken</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <h5 className="text-center p-4">Loading...</h5>
          ) : referrals.length > 0 ? (
            <table className="table table-bordered text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Reward By</th>
                  <th>Refer To</th>
                  <th>Email</th>
                  <th>Reward Type</th>
                  <th>Reward Status</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {referrals.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.reward_by_name}</td>
                    <td>{r.refer_to_name}</td>
                    <td>{r.refer_to_email || "-"}</td>
                    <td>
                      <span
                        className={`badge ${
                          r.reward_type === "Enrollment"
                            ? "bg-primary"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {r.reward_type}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${r.reward_given ? "bg-success" : "bg-danger"}`}>
                        {r.reward_given ? "Yes" : "No"}
                      </span>
                    </td>
                    <td>{new Date(r.created_at).toLocaleString()}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-success me-2"
                        onClick={() => handleToggleReward(r.id, r.reward_given)}
                      >
                        Toggle Reward
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteReferral(r.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h5 className="text-center p-4">No referrals found</h5>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-container">
              <h5>Create Referral</h5>
              <input
                type="text"
                placeholder="Reward By Name"
                value={newReferral.reward_by_name}
                onChange={(e) =>
                  setNewReferral({ ...newReferral, reward_by_name: e.target.value })
                }
                className="form-control mb-2"
              />
              <input
                type="text"
                placeholder="Refer To Name"
                value={newReferral.refer_to_name}
                onChange={(e) =>
                  setNewReferral({ ...newReferral, refer_to_name: e.target.value })
                }
                className="form-control mb-2"
              />
              <input
                type="email"
                placeholder="Refer To Email (Optional)"
                value={newReferral.refer_to_email}
                onChange={(e) =>
                  setNewReferral({ ...newReferral, refer_to_email: e.target.value })
                }
                className="form-control mb-2"
              />
              <select
                className="form-select mb-3"
                value={newReferral.reward_type}
                onChange={(e) =>
                  setNewReferral({ ...newReferral, reward_type: e.target.value })
                }
              >
                <option value="Enrollment">Enrollment</option>
                <option value="Onboarding">Onboarding</option>
              </select>
              <div className="d-flex justify-content-end">
                <button className="btn btn-secondary me-2" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleCreateReferral}>
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReferral;
