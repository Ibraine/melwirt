// // src/components/admin/AddUserModalAdvanced.jsx
// import React, { useState } from "react";
// import { createUser } from "../../api/adminPanelAPI";
// import "../../styles/editmodal.css";

// const AddUserModalAdvanced = ({ onClose, onUserAdded }) => {
//   const [role, setRole] = useState("student");
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     password: "",
//     phone: "",
//     country: "",
//     student_id: "",
//     course: "",
//     bio: "",
//     is_staff: false,
//     is_superuser: false,
//   });

//   const token = localStorage.getItem("token");

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);

//       const payload = new FormData();
//       Object.entries(formData).forEach(([key, value]) => {
//         if (typeof value === "boolean") payload.append(key, value ? "true" : "false");
//         else if (value) payload.append(key, value);
//       });

//       payload.append("role", role);

//       const res = await createUser(token, payload);
//       console.log("User Created:", res);

//       onUserAdded?.();
//       onClose?.();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add user");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderRoleFields = () => {
//     switch (role) {
//       case "tutor":
//         return (
//           <>
//             <div className="form-group">
//               <label>Phone</label>
//               <input name="phone" value={formData.phone} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label>Bio</label>
//               <input name="bio" value={formData.bio} onChange={handleChange} />
//             </div>
//           </>
//         );

//       case "student":
//         return (
//           <>
//             <div className="form-group">
//               <label>Student ID</label>
//               <input name="student_id" value={formData.student_id} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label>Course</label>
//               <input name="course" value={formData.course} onChange={handleChange} />
//             </div>
//           </>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="edit-overlay" onClick={onClose}>
//       <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
//         <div className="edit-header">
//           <h3>Add New User</h3>
//           <button className="close-btn" onClick={onClose}>✕</button>
//         </div>

//         <form className="edit-form" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Role</label>
//             <select value={role} onChange={(e) => setRole(e.target.value)}>
//               <option value="admin">Admin</option>
//               <option value="tutor">Tutor</option>
//               <option value="student">Student</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label>First Name</label>
//             <input name="first_name" value={formData.first_name} onChange={handleChange} required />
//           </div>

//           <div className="form-group">
//             <label>Email</label>
//             <input name="email" type="email" value={formData.email} onChange={handleChange} required />
//           </div>

//           <div className="form-group">
//             <label>Password</label>
//             <input name="password" type="password" value={formData.password} onChange={handleChange} required />
//           </div>

//           {renderRoleFields()}

//           <div className="form-group">
//             <label>
//               <input type="checkbox" name="is_staff" checked={formData.is_staff} onChange={handleChange} />
//               {" "}Make Staff
//             </label>
//             <label style={{ marginLeft: 12 }}>
//               <input type="checkbox" name="is_superuser" checked={formData.is_superuser} onChange={handleChange} />
//               {" "}SuperAdmin
//             </label>
//           </div>

//           <div className="form-actions">
//             <button type="submit" className="btn-primary" disabled={loading}>
//               {loading ? "Adding..." : "Add User"}
//             </button>
//             <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddUserModalAdvanced;



import React, { useState } from "react";
import { createUser } from "../../api/adminPanelAPI";
import "../../styles/editmodal.css";

const AddUserModalAdvanced = ({ onClose, onUserAdded }) => {
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    country: "",
    student_id: "",
    course: "",
    bio: "",
    is_staff: false,
    is_superuser: false,
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (typeof value === "boolean") payload.append(key, value ? "true" : "false");
        else if (value) payload.append(key, value);
      });

      payload.append("role", role);

      const res = await createUser(token, payload);
      console.log("User Created:", res);

      onUserAdded?.();
      onClose?.();
    } catch (err) {
      console.error(err);
      alert("Failed to add user");
    } finally {
      setLoading(false);
    }
  };

  const renderRoleFields = () => {
    switch (role) {
      case "tutor":
        return (
          <div className="user-form-row">
            <div className="user-form-group flex-1">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="+1 234 567 890"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="user-form-group flex-1">
              <label>Tutor Bio</label>
              <input
                type="text"
                name="bio"
                placeholder="Short bio or subject expertise"
                value={formData.bio}
                onChange={handleChange}
              />
            </div>
          </div>
        );

      case "student":
        return (
          <div className="user-form-row">
            <div className="user-form-group flex-1">
              <label>Student ID</label>
              <input
                type="text"
                name="student_id"
                placeholder="e.g., STU-2026-01"
                value={formData.student_id}
                onChange={handleChange}
              />
            </div>
            <div className="user-form-group flex-1">
              <label>Course Enrolled</label>
              <input
                type="text"
                name="course"
                placeholder="e.g., Robotics Level 1"
                value={formData.course}
                onChange={handleChange}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="user-modal-overlay" onClick={onClose}>
      <div className="user-modal-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="user-modal-header">
          <div>
            <h3 className="user-modal-title">Add New User</h3>
            <p className="user-modal-sub">Create a new student, tutor, or admin account</p>
          </div>
          <button type="button" className="user-modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Modal Form */}
        <form className="user-modal-form" onSubmit={handleSubmit}>
          
          {/* Role Selector */}
          <div className="user-form-group">
            <label>User Role <span className="req">*</span></label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* First Name & Last Name */}
          <div className="user-form-row">
            <div className="user-form-group flex-1">
              <label>First Name <span className="req">*</span></label>
              <input
                type="text"
                name="first_name"
                placeholder="John"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="user-form-group flex-1">
              <label>Last Name</label>
              <input
                type="text"
                name="last_name"
                placeholder="Doe"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email & Password */}
          <div className="user-form-row">
            <div className="user-form-group flex-1">
              <label>Email Address <span className="req">*</span></label>
              <input
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="user-form-group flex-1">
              <label>Password <span className="req">*</span></label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Dynamic Role Fields */}
          {renderRoleFields()}

          {/* Staff & SuperAdmin Checkboxes */}
          <div className="user-checkbox-group">
            <label className="checkbox-capsule">
              <input
                type="checkbox"
                name="is_staff"
                checked={formData.is_staff}
                onChange={handleChange}
              />
              <span>Make Staff</span>
            </label>

            <label className="checkbox-capsule">
              <input
                type="checkbox"
                name="is_superuser"
                checked={formData.is_superuser}
                onChange={handleChange}
              />
              <span>SuperAdmin</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="user-modal-actions">
            <button
              type="button"
              className="user-btn-cancel"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="user-btn-submit"
              disabled={loading}
            >
              {loading ? "Adding User..." : "Add User"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddUserModalAdvanced;