// import React, { useEffect, useState } from "react";
// import Sidebar from "../../components/Sidebar";
// import Header from "../../components/Header";
// import profilePic from "../../assets/admin profile.png";
// import "../../styles/profile.css";
// import { fetchMyProfile, updateMyProfile, deleteProfileImage } from "../../api/profileAPI";

// const Profile = () => {
//   const [formData, setFormData] = useState({
//     full_name: "",
//     mobile: "",
//     email: "",
//     dob: "",
//     country: "",
//     city: "",
//     about: "",
//     profile_image: null,
//   });
//   const [preview, setPreview] = useState(profilePic);
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);

//   // Load profile on mount
//   useEffect(() => {
//     fetchMyProfile()
//       .then((data) => {
//         setFormData({ ...data, profile_image: null });
//         setPreview(data.profile_image || profilePic);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "profile_image" && files.length > 0) {
//       setFormData({ ...formData, profile_image: files[0] });
//       setPreview(URL.createObjectURL(files[0]));
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setUpdating(true);
//     try {
//       const res = await updateMyProfile(formData);
//       alert(res.message || "Profile updated successfully!");
//       setFormData({ ...formData, profile_image: null }); // reset image file
//     } catch (err) {
//       console.error("Update error:", err);
//       alert("Profile update failed!");
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const handleDeleteImage = async () => {
//     if (!window.confirm("Are you sure you want to delete your profile image?")) return;
//     try {
//       await deleteProfileImage();
//       setPreview(profilePic);
//       setFormData({ ...formData, profile_image: null });
//       alert("Profile image deleted!");
//     } catch (err) {
//       console.error("Delete image error:", err);
//       alert("Failed to delete image!");
//     }
//   };

//   if (loading) return <p>Loading profile...</p>;

//   return (
//     <div className="d-flex">
//       <Sidebar />
//       <div className="flex-grow-1">
//         <Header />
//         <div className="container mt-4">
//           <h4 className="profile-title">Profile Detail</h4>

//           <div className="card p-4 shadow-sm mt-3">
//             <div className="text-center mb-3">
//               <img src={preview} alt="Profile" className="profile-img" />
//               {preview !== profilePic && (
//                 <button
//                   className="btn btn-sm btn-danger mt-2"
//                   onClick={handleDeleteImage}
//                 >
//                   Delete Image
//                 </button>
//               )}
//             </div>

//             <form onSubmit={handleSubmit}>
//               <div className="mb-3 text-center">
//                 <input
//                   type="file"
//                   name="profile_image"
//                   accept="image/*"
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <label className="form-label">Full Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="full_name"
//                     value={formData.full_name}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Mobile Number</label>
//                   <input
//                     type="tel"
//                     className="form-control"
//                     name="mobile"
//                     value={formData.mobile}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <label className="form-label">Email</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
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
//                 ></textarea>
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

// export default Profile;



import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import profilePic from "../../assets/admin profile.png";
import "../../styles/profile.css";
import { fetchMyProfile, updateMyProfile, deleteProfileImage } from "../../api/profileAPI";

// 🔹 Country-City Dependent Mapping
const countryCityMap = {
  India: ["Delhi", "Mumbai", "Bangalore", "Pune", "Hyderabad", "Chennai", "Kolkata"],
  USA: ["New York", "Los Angeles", "Chicago", "Houston", "San Francisco", "Miami"],
  UK: ["London", "Manchester", "Birmingham", "Edinburgh", "Glasgow", "Liverpool"],
};

const Profile = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    mobile: "",
    email: "",
    dob: "",
    country: "",
    city: "",
    about: "",
    profile_image: null,
  });
  const [preview, setPreview] = useState(profilePic);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Load profile on mount
  useEffect(() => {
    fetchMyProfile()
      .then((data) => {
        setFormData({ ...data, profile_image: null });
        const userImg = data.profile_image || profilePic;
        setPreview(userImg);
        
        // Sync with Header
        if (data.profile_image) {
          localStorage.setItem("user_profile_img", data.profile_image);
          window.dispatchEvent(new Event("profileImageUpdated"));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // Handle Input Changes & Country-City Dependency
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === "profile_image" && files.length > 0) {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);
      setFormData({ ...formData, profile_image: file });
      setPreview(previewUrl);
    } else if (name === "country") {
      // Reset city if not valid for selected country
      const availableCities = countryCityMap[value] || [];
      const newCity = availableCities.includes(formData.city) ? formData.city : "";
      setFormData({ ...formData, country: value, city: newCity });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const res = await updateMyProfile(formData);
      alert(res.message || "Profile updated successfully!");
      setFormData({ ...formData, profile_image: null });

      // Live Header Image Sync
      if (res.profile_image) {
        localStorage.setItem("user_profile_img", res.profile_image);
      } else if (preview && preview !== profilePic) {
        localStorage.setItem("user_profile_img", preview);
      }
      window.dispatchEvent(new Event("profileImageUpdated"));

    } catch (err) {
      console.error("Update error:", err);
      alert("Profile update failed!");
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteImage = async () => {
    if (!window.confirm("Are you sure you want to delete your profile image?")) return;
    try {
      await deleteProfileImage();
      setPreview(profilePic);
      setFormData({ ...formData, profile_image: null });
      localStorage.removeItem("user_profile_img");
      window.dispatchEvent(new Event("profileImageUpdated")); // Sync Header
      alert("Profile image deleted!");
    } catch (err) {
      console.error("Delete image error:", err);
      alert("Failed to delete image!");
    }
  };

  if (loading) return <div className="p-5 text-center">Loading profile...</div>;

  return (
    <div className="d-flex profile-page">
      <Sidebar />
      <div className="main-content-wrapper flex-grow-1">
        <Header />

        <div className="container py-4" style={{ maxWidth: "860px" }}>
          
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h4 className="fw-bold m-0 page-title">Profile Detail</h4>
              <p className="text-muted small m-0">Manage your personal information and profile photo</p>
            </div>
          </div>

          <div className="profile-card shadow-sm">
            <form onSubmit={handleSubmit}>
              
              {/* Profile Avatar with Camera Overlay */}
              <div className="profile-avatar-section">
                <div className="avatar-wrapper">
                  <img src={preview} alt="Profile" className="profile-img" />
                  <label htmlFor="profile-image-upload" className="camera-overlay-btn" title="Change Profile Photo">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                      <circle cx="12" cy="13" r="4"></circle>
                    </svg>
                  </label>
                  <input
                    type="file"
                    id="profile-image-upload"
                    name="profile_image"
                    accept="image/*"
                    onChange={handleChange}
                    className="d-none"
                  />
                </div>

                {preview !== profilePic && (
                  <button
                    type="button"
                    className="btn-delete-avatar"
                    onClick={handleDeleteImage}
                  >
                    Delete Photo
                  </button>
                )}
              </div>

              {/* Form Fields */}
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control custom-input"
                    name="full_name"
                    value={formData.full_name || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Mobile Number</label>
                  <input
                    type="tel"
                    className="form-control custom-input"
                    name="mobile"
                    value={formData.mobile || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control custom-input"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    required
                  />
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

              {/* Dependent Country & City Dropdowns */}
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
                  placeholder="Tell us something about yourself..."
                  value={formData.about || ""}
                  onChange={handleChange}
                ></textarea>
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

export default Profile;