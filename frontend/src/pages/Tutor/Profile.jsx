// // src/pages/Tutor/Profile.jsx
// import React, { useEffect, useState } from "react";
// import Sidebar from "../../components/Sidebar";
// import Header from "../../components/Header";
// import profilePic from "../../assets/admin profile.png";
// import "../../styles/profile.css";
// import {
//   fetchMyProfile,
//   updateMyProfile,
//   deleteProfileImage,
// } from "../../api/profileAPI";

// const initialForm = {
//   full_name: "",
//   mobile: "",
//   email: "",
//   dob: "",
//   country: "",
//   city: "",
//   about: "",
// };

// const TutorProfile = () => {
//   const [formData, setFormData] = useState(initialForm);
//   const [profileImageFile, setProfileImageFile] = useState(null);
//   const [preview, setPreview] = useState(profilePic);
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     let mounted = true;
//     fetchMyProfile()
//       .then((data) => {
//         if (!mounted) return;
//         setFormData({
//           full_name: data.full_name || "",
//           mobile: data.mobile || "",
//           email: data.email || "",
//           dob: data.dob || "",
//           country: data.country || "",
//           city: data.city || "",
//           about: data.about || "",
//         });
//         setPreview(data.profile_image || profilePic);
//       })
//       .catch((err) => {
//         console.error("Fetch profile error:", err);
//         alert("Failed to load profile. Please login again.");
//       })
//       .finally(() => mounted && setLoading(false));
//     return () => (mounted = false);
//   }, []);

//   const validate = () => {
//     const e = {};
//     if (!formData.full_name || formData.full_name.trim().length < 2) {
//       e.full_name = "Full name required (min 2 chars)";
//     }
//     if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
//       e.email = "Valid email required";
//     }
//     if (formData.mobile && !/^[\d+\-\s]{7,20}$/.test(formData.mobile)) {
//       e.mobile = "Mobile looks invalid";
//     }
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((p) => ({ ...p, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files && e.target.files[0];
//     if (!file) return;
//     setProfileImageFile(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   const handleDeleteImage = async () => {
//     if (!window.confirm("Are you sure you want to delete your profile image?")) return;
//     try {
//       setUpdating(true);
//       await deleteProfileImage();
//       setPreview(profilePic);
//       setProfileImageFile(null);
//       alert("Profile image deleted");
//     } catch (err) {
//       console.error("Delete image error:", err);
//       alert("Failed to delete image");
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     const payload = { ...formData };
//     if (profileImageFile) payload.profile_image = profileImageFile;

//     try {
//       setUpdating(true);
//       const res = await updateMyProfile(payload);
//       // Optionally update preview from response
//       if (res.data && res.data.profile_image) setPreview(res.data.profile_image);

//       alert(res.message || "Profile updated successfully!");
//       setProfileImageFile(null);
//     } catch (err) {
//       console.error("Update error:", err);
//       const msg = err?.response?.data || err.message || "Failed to update profile";
//       alert(JSON.stringify(msg));
//     } finally {
//       setUpdating(false);
//     }
//   };

//   if (loading) return <p>Loading profile...</p>;

//   return (
//     <div className="d-flex">
//       <Sidebar />
//       <div className="flex-grow-1">
//         <Header />
//         <div className="container mt-4">
//           <h4>Tutor Profile Detail</h4>

//           <div className="card p-4 shadow-sm mt-3">
//             <div className="text-center mb-4">
//               <img
//                 src={preview}
//                 alt="Tutor Profile"
//                 className="rounded-circle"
//                 style={{ width: "100px", height: "100px", objectFit: "cover" }}
//               />

//               <div className="mt-3">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   id="profile_image"
//                 />
//                 {" "}
//                 {preview !== profilePic && (
//                   <button
//                     className="btn btn-sm btn-danger ms-2"
//                     onClick={handleDeleteImage}
//                     disabled={updating}
//                   >
//                     Delete Image
//                   </button>
//                 )}
//               </div>

//               <h6 className="mt-2">{formData.full_name || "Tutor"}</h6>
//               <span className="text-muted">Tutor</span>
//             </div>

//             <form onSubmit={handleSubmit}>
//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <label className="form-label">Full Name</label>
//                   <input
//                     type="text"
//                     className={`form-control ${errors.full_name ? "is-invalid" : ""}`}
//                     name="full_name"
//                     value={formData.full_name}
//                     onChange={handleChange}
//                   />
//                   {errors.full_name && <div className="invalid-feedback">{errors.full_name}</div>}
//                 </div>

//                 <div className="col-md-6">
//                   <label className="form-label">Mobile</label>
//                   <input
//                     type="tel"
//                     className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
//                     name="mobile"
//                     value={formData.mobile}
//                     onChange={handleChange}
//                   />
//                   {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
//                 </div>
//               </div>

//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <label className="form-label">Email</label>
//                   <input
//                     type="email"
//                     className={`form-control ${errors.email ? "is-invalid" : ""}`}
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                   />
//                   {errors.email && <div className="invalid-feedback">{errors.email}</div>}
//                 </div>

//                 <div className="col-md-6">
//                   <label className="form-label">Date of Birth</label>
//                   <input
//                     type="date"
//                     className="form-control"
//                     name="dob"
//                     value={formData.dob || ""}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>

//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <label className="form-label">Country</label>
//                   <select
//                     className="form-select"
//                     name="country"
//                     value={formData.country || ""}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select Country</option>
//                     <option value="India">India</option>
//                     <option value="USA">USA</option>
//                     <option value="UK">UK</option>
//                   </select>
//                 </div>

//                 <div className="col-md-6">
//                   <label className="form-label">City</label>
//                   <select
//                     className="form-select"
//                     name="city"
//                     value={formData.city || ""}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select City</option>
//                     <option value="Mumbai">Mumbai</option>
//                     <option value="Delhi">Delhi</option>
//                     <option value="Bangalore">Bangalore</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">About Me</label>
//                 <textarea
//                   className="form-control"
//                   name="about"
//                   rows="4"
//                   value={formData.about || ""}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="text-center">
//                 <button
//                   type="submit"
//                   className="btn btn-warning px-5 update-btn"
//                   disabled={updating}
//                 >
//                   {updating ? "Updating..." : "Update"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TutorProfile;


// src/pages/Tutor/Profile.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import profilePic from "../../assets/admin profile.png";
import "../../styles/profile.css";
import {
  fetchMyProfile,
  updateMyProfile,
  deleteProfileImage,
} from "../../api/profileAPI";

// 🔹 Country-City Dependent Mapping
const countryCityMap = {
  India: ["Delhi", "Mumbai", "Bangalore", "Pune", "Hyderabad", "Chennai", "Kolkata"],
  USA: ["New York", "Los Angeles", "Chicago", "Houston", "San Francisco", "Miami"],
  UK: ["London", "Manchester", "Birmingham", "Edinburgh", "Glasgow", "Liverpool"],
};

const initialForm = {
  full_name: "",
  mobile: "",
  email: "",
  dob: "",
  country: "",
  city: "",
  about: "",
};

const TutorProfile = () => {
  const [formData, setFormData] = useState(initialForm);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [preview, setPreview] = useState(profilePic);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [errors, setErrors] = useState({});

  // Load Profile on mount
  useEffect(() => {
    let mounted = true;
    fetchMyProfile()
      .then((data) => {
        if (!mounted) return;
        setFormData({
          full_name: data.full_name || "",
          mobile: data.mobile || "",
          email: data.email || "",
          dob: data.dob || "",
          country: data.country || "",
          city: data.city || "",
          about: data.about || "",
        });
        const userImg = data.profile_image || profilePic;
        setPreview(userImg);

        // Sync image with Header
        if (data.profile_image) {
          localStorage.setItem("user_profile_img", data.profile_image);
          window.dispatchEvent(new Event("profileImageUpdated"));
        }
      })
      .catch((err) => {
        console.error("Fetch profile error:", err);
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  const validate = () => {
    const e = {};
    if (!formData.full_name || formData.full_name.trim().length < 2) {
      e.full_name = "Full name required (min 2 chars)";
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      e.email = "Valid email required";
    }
    if (formData.mobile && !/^[\d+\-\s]{7,20}$/.test(formData.mobile)) {
      e.mobile = "Mobile looks invalid";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "country") {
      const availableCities = countryCityMap[value] || [];
      const newCity = availableCities.includes(formData.city) ? formData.city : "";
      setFormData((p) => ({ ...p, country: value, city: newCity }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setProfileImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleDeleteImage = async () => {
    if (!window.confirm("Are you sure you want to delete your profile image?")) return;
    try {
      setUpdating(true);
      await deleteProfileImage();
      setPreview(profilePic);
      setProfileImageFile(null);
      localStorage.removeItem("user_profile_img");
      window.dispatchEvent(new Event("profileImageUpdated")); // Sync Header
      alert("Profile image deleted!");
    } catch (err) {
      console.error("Delete image error:", err);
      alert("Failed to delete image!");
    } finally {
      setUpdating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = { ...formData };
    if (profileImageFile) payload.profile_image = profileImageFile;

    try {
      setUpdating(true);
      const res = await updateMyProfile(payload);
      
      const newImg = res.data?.profile_image || res.profile_image || preview;
      setPreview(newImg);
      if (newImg && newImg !== profilePic) {
        localStorage.setItem("user_profile_img", newImg);
        window.dispatchEvent(new Event("profileImageUpdated"));
      }

      alert(res.message || "Profile updated successfully!");
      setProfileImageFile(null);
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update profile!");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="p-5 text-center">Loading profile...</div>;

  return (
    <div className="d-flex profile-page">
      <Sidebar role="tutor" />
      <div className="main-content-wrapper flex-grow-1">
        <Header role="tutor" />

        <div className="container py-4" style={{ maxWidth: "860px" }}>
          
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h4 className="fw-bold m-0 page-title">Tutor Profile Detail</h4>
              <p className="text-muted small m-0">Manage your tutor bio, contact info, and profile avatar</p>
            </div>
          </div>

          <div className="profile-card shadow-sm">
            
            {/* Avatar with Camera Badge */}
            <div className="profile-avatar-section">
              <div className="avatar-wrapper">
                <img src={preview} alt="Tutor Profile" className="profile-img" />
                <label htmlFor="tutor-image-upload" className="camera-overlay-btn" title="Change Profile Photo">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                  </svg>
                </label>
                <input
                  type="file"
                  id="tutor-image-upload"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="d-none"
                />
              </div>

              <h6 className="fw-bold mt-1 mb-0">{formData.full_name || "Tutor"}</h6>
              <span className="text-muted small">Tutor</span>

              {preview !== profilePic && (
                <button
                  type="button"
                  className="btn-delete-avatar mt-2"
                  onClick={handleDeleteImage}
                  disabled={updating}
                >
                  Delete Photo
                </button>
              )}
            </div>

            {/* Profile Form */}
            <form onSubmit={handleSubmit}>
              
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className={`form-control custom-input ${errors.full_name ? "is-invalid" : ""}`}
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                  />
                  {errors.full_name && <div className="invalid-feedback">{errors.full_name}</div>}
                </div>

                <div className="col-md-6">
                  <label className="form-label">Mobile Number</label>
                  <input
                    type="tel"
                    className={`form-control custom-input ${errors.mobile ? "is-invalid" : ""}`}
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                  {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className={`form-control custom-input ${errors.email ? "is-invalid" : ""}`}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="col-md-6">
                  <label className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control custom-input"
                    name="dob"
                    value={formData.dob || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Country & Dependent City Dropdown */}
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label">Country</label>
                  <select
                    className="form-select custom-input"
                    name="country"
                    value={formData.country || ""}
                    onChange={handleChange}
                  >
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">City</label>
                  <select
                    className="form-select custom-input"
                    name="city"
                    value={formData.city || ""}
                    onChange={handleChange}
                    disabled={!formData.country}
                  >
                    <option value="">
                      {formData.country ? "Select City" : "First Choose Country"}
                    </option>
                    {(countryCityMap[formData.country] || []).map((cityName, idx) => (
                      <option key={idx} value={cityName}>
                        {cityName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">About Me</label>
                <textarea
                  className="form-control custom-input"
                  name="about"
                  rows="3"
                  placeholder="Share a short bio or your teaching expertise..."
                  value={formData.about || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn-update-profile"
                  disabled={updating}
                >
                  {updating ? "Updating..." : "Update Profile"}
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TutorProfile;