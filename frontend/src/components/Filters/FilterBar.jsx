import React from "react";
import "../../styles/filterbar.css";

const FilterBar = ({
  searchValue,
  onSearchChange,
  accountStatus,
  onAccountStatusChange,
  verificationStatus,
  onVerificationStatusChange,
  onAddClick, // ✅ new prop
}) => {
  return (
    <div className="fw-filterbar">
      <div className="fb-left">
        <h3 className="fb-title">User List</h3>
      </div>

      <div className="fb-controls">
        <div className="fb-control fb-search">
          <input
            type="text"
            placeholder="Search by name, email or mobile..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="fb-control">
          <select
            value={accountStatus}
            onChange={(e) => onAccountStatusChange(e.target.value)}
          >
            <option value="">All Account Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div className="fb-control">
          <select
            value={verificationStatus}
            onChange={(e) => onVerificationStatusChange(e.target.value)}
          >
            <option value="">All Verification</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="fb-control fb-add">
          {/* ✅ now triggers parent */}
          <button type="button" className="btn-add" onClick={onAddClick}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
