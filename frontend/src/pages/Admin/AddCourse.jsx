// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Sidebar from "../../components/Sidebar";
// import Header from "../../components/Header";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "../../styles/addcourse.css";


// const AddCourse = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     duration: "",
//     price: "",
//     tutor: "",
//     image: null,
//   });
//   const [tutors, setTutors] = useState([]);

//   // 🔹 Fetch tutor list from backend
//   useEffect(() => {
//     const fetchTutors = async () => {
//       try {
//         const res = await axios.get("https://api.melwirt.com/api/tutors/");
//         setTutors(res.data);
//       } catch (error) {
//         console.error("Failed to load tutors:", error);
//       }
//     };
//     fetchTutors();
//   }, []);

//   // 🔹 Handle input changes
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) {
//       setFormData({ ...formData, [name]: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   // 🔹 Submit form to backend
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       const payload = new FormData();
//       for (const key in formData) {
//         payload.append(key, formData[key]);
//       }

//       const res = await axios.post("https://api.melwirt.com/api/courses/", payload, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       toast.success("✅ Course added successfully!");
//       console.log("Course created:", res.data);

//       // Reset form
//       setFormData({
//         title: "",
//         description: "",
//         duration: "",
//         price: "",
//         tutor: "",
//         image: null,
//       });
//     } catch (error) {
//       console.error("Error adding course:", error);
//       toast.error("❌ Failed to add course!");
//     }
//   };

//   return (
//     <div className="d-flex">
//       <Sidebar />
//       <div className="flex-grow-1">
//         <Header />
//         <div className="container mt-4">
//           <h4>Add New Course</h4>

//           <form onSubmit={handleSubmit} className="course-form mt-3">
//             <div className="form-group mb-3">
//               <label>Course Title</label>
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 className="form-control"
//                 required
//               />
//             </div>

//             <div className="form-group mb-3">
//               <label>Description</label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 className="form-control"
//                 rows="3"
//                 required
//               />
//             </div>

//             <div className="form-group mb-3">
//               <label>Duration (e.g., 3 Months)</label>
//               <input
//                 type="text"
//                 name="duration"
//                 value={formData.duration}
//                 onChange={handleChange}
//                 className="form-control"
//                 required
//               />
//             </div>

//             <div className="form-group mb-3">
//               <label>Price per class</label>
//               <input
//                 type="number"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 className="form-control"
//                 required
//               />
//             </div>

//             <div className="form-group mb-3">
//               <label>Select Tutor</label>
//               <select
//                 name="tutor"
//                 value={formData.tutor}
//                 onChange={handleChange}
//                 className="form-control"
//                 required
//               >
//                 <option value="">-- Select Tutor --</option>
//                 {tutors.map((tutor) => (
//                   <option key={tutor.id} value={tutor.id}>
//                     {tutor.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="form-group mb-3">
//               <label>Course Image</label>
//               <input
//                 type="file"
//                 name="image"
//                 accept="image/*"
//                 onChange={handleChange}
//                 className="form-control"
//               />
//             </div>

//             <button type="submit" className="btn btn-primary">
//               Add Course
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddCourse;


import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/addcourse.css";

const AddCourse = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    price: "",
    tutor: "",
    image: null,
  });
  const [tutors, setTutors] = useState([]);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch tutor list from backend
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await axios.get("https://api.melwirt.com/api/tutors/");
        setTutors(res.data);
      } catch (error) {
        console.error("Failed to load tutors:", error);
      }
    };
    fetchTutors();
  }, []);

  // 🔹 Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setFormData({ ...formData, [name]: file });
      setPreview(URL.createObjectURL(file)); // Live image preview
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // 🔹 Remove selected image
  const removeImage = () => {
    setFormData({ ...formData, image: null });
    setPreview(null);
  };

  // 🔹 Submit form to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const payload = new FormData();
      for (const key in formData) {
        if (formData[key] !== null) {
          payload.append(key, formData[key]);
        }
      }

      const res = await axios.post("https://api.melwirt.com/api/courses/", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("✅ Course added successfully!");
      console.log("Course created:", res.data);

      // Reset form
      setFormData({
        title: "",
        description: "",
        duration: "",
        price: "",
        tutor: "",
        image: null,
      });
      setPreview(null);
    } catch (error) {
      console.error("Error adding course:", error);
      toast.error("❌ Failed to add course!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex add-course-page">
      <Sidebar />
      <div className="main-content-wrapper flex-grow-1">
        <Header />

        <div className="container py-4" style={{ maxWidth: "800px" }}>
          
          {/* Header Title */}
          <div className="mb-4">
            <h4 className="fw-bold m-0 page-title">Add New Course</h4>
            <p className="text-muted small m-0">Create a new course curriculum for students</p>
          </div>

          {/* Main Card Form */}
          <div className="add-course-card">
            <form onSubmit={handleSubmit} className="course-form">
              
              {/* Course Title */}
              <div className="form-group mb-3">
                <label className="form-label">Course Title <span className="req">*</span></label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., Robotics & Artificial Intelligence"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-control custom-input"
                  required
                />
              </div>

              {/* Description */}
              <div className="form-group mb-3">
                <label className="form-label">Description <span className="req">*</span></label>
                <textarea
                  name="description"
                  placeholder="Provide a detailed summary of what students will learn..."
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control custom-input"
                  rows="3"
                  required
                />
              </div>

              {/* Grid 2-Column Row for Duration & Price */}
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label">Duration <span className="req">*</span></label>
                  <input
                    type="text"
                    name="duration"
                    placeholder="e.g., 3 Months (24 Classes)"
                    value={formData.duration}
                    onChange={handleChange}
                    className="form-control custom-input"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Price per class (₹) <span className="req">*</span></label>
                  <input
                    type="number"
                    name="price"
                    placeholder="e.g., 500"
                    value={formData.price}
                    onChange={handleChange}
                    className="form-control custom-input"
                    required
                  />
                </div>
              </div>

              {/* Select Tutor */}
              <div className="form-group mb-4">
                <label className="form-label">Select Assigned Tutor <span className="req">*</span></label>
                <select
                  name="tutor"
                  value={formData.tutor}
                  onChange={handleChange}
                  className="form-select custom-input"
                  required
                >
                  <option value="">-- Choose a Tutor --</option>
                  {tutors.map((tutor) => (
                    <option key={tutor.id} value={tutor.id}>
                      {tutor.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom Image Upload Zone */}
              <div className="form-group mb-4">
                <label className="form-label">Course Thumbnail Image</label>
                
                {!preview ? (
                  <div className="upload-dropzone">
                    <input
                      type="file"
                      name="image"
                      id="course-image-input"
                      accept="image/*"
                      onChange={handleChange}
                      className="file-input-hidden"
                    />
                    <label htmlFor="course-image-input" className="dropzone-label">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                      <span className="upload-title">Click to upload image</span>
                      <span className="upload-sub">PNG, JPG or WEBP (Max 5MB)</span>
                    </label>
                  </div>
                ) : (
                  <div className="image-preview-container">
                    <img src={preview} alt="Course Preview" className="preview-img" />
                    <button type="button" onClick={removeImage} className="btn-remove-img">
                      ✕ Remove Image
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="d-flex justify-content-end gap-2 pt-2 border-top">
                <button
                  type="submit"
                  className="btn-submit-course"
                  disabled={loading}
                >
                  {loading ? "Adding Course..." : "Add Course"}
                </button>
              </div>

            </form>
          </div>

        </div>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default AddCourse;

