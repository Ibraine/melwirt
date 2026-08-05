// src/components/admin/EditUserForm.jsx
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../../styles/editform.css";

const EditUserForm = ({ role = "student", initialData = {}, onSubmit, onCancel, title }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    about: "",
    status: true,
    role: role,
    is_staff: false,
    is_superuser: false,
    ...initialData,
  });

  useEffect(() => {
    // normalize initial data keys (backend uses first_name etc)
    setForm(prev => ({
      ...prev,
      firstName: initialData.first_name ?? initialData.firstName ?? prev.firstName,
      lastName: initialData.last_name ?? initialData.lastName ?? prev.lastName,
      email: initialData.email ?? prev.email,
      phone: initialData.phone ?? prev.phone,
      about: initialData.about ?? prev.about,
      status: ("is_active" in initialData) ? initialData.is_active : prev.status,
      role: initialData.role ?? prev.role,
      is_staff: initialData.is_staff ?? prev.is_staff,
      is_superuser: initialData.is_superuser ?? prev.is_superuser,
    }));
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleToggleStatus = () => setForm(prev => ({ ...prev, status: !prev.status }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      phone: form.phone,
      about: form.about,
      is_active: form.status,
      role: form.role,
      is_staff: !!form.is_staff,
      is_superuser: !!form.is_superuser,
    };
    onSubmit && onSubmit(payload);
  };

  return (
    <div className="edit-form-wrap full-page">
      <div className="edit-form-card">
        <div className="edit-form-header"><h2>{title || `Edit ${role}`}</h2></div>

        <form className="edit-form" onSubmit={handleSubmit} noValidate>
          <div className="grid-2">
            <label className="field">
              <div className="field-label">First Name</div>
              <input name="firstName" value={form.firstName} onChange={handleChange} />
            </label>

            <label className="field">
              <div className="field-label">Last Name</div>
              <input name="lastName" value={form.lastName} onChange={handleChange} />
            </label>
          </div>

          <div className="grid-2">
            <label className="field">
              <div className="field-label">Mobile Number</div>
              <input name="phone" value={form.phone} onChange={handleChange} />
            </label>

            <label className="field">
              <div className="field-label">Email Address</div>
              <input type="email" name="email" value={form.email} onChange={handleChange} />
            </label>
          </div>

          <label className="field">
            <div className="field-label">About</div>
            <textarea name="about" value={form.about} onChange={handleChange} rows="3" />
          </label>

          <div className="form-group">
            <label>Role</label>
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="toggle-row">
            <div className="field-label">Active</div>
            <label className="switch"><input type="checkbox" name="status" checked={form.status} onChange={handleToggleStatus} /><span className="slider round"/></label>
            <div style={{marginLeft:16}}>
              <label className="switch"><input type="checkbox" name="is_staff" checked={form.is_staff} onChange={handleChange} /> Staff</label>
              <label style={{marginLeft:12}} className="switch"><input type="checkbox" name="is_superuser" checked={form.is_superuser} onChange={handleChange} /> Superuser</label>
            </div>
          </div>

          <div className="actions-row">
            <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
            <button type="submit" className="save-btn">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditUserForm.propTypes = {
  role: PropTypes.string,
  initialData: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  title: PropTypes.string,
};

export default EditUserForm;
