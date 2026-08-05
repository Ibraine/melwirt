// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "../styles/addcoursemodal.css";

// const AddCourseModal = ({ onClose, onCourseAdded }) => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     duration_weeks: "",
//     level: "beginner",
//     price_inr: "",
//     price_usd: "",
//     tutor: "",
//     image: null,
//   });

//   const [tutors, setTutors] = useState([]);
//   const token = localStorage.getItem("token"); // Admin JWT

//   useEffect(() => {
//     const fetchTutors = async () => {
//       try {
//         const res = await axios.get("http://127.0.0.1:8000/api/adminpanel/users/?role=tutor", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         // Filter only tutors from response
//         const tutorList = res.data.results || res.data; 
//         setTutors(tutorList.map(t => ({ id: t.id, name: `${t.first_name} ${t.last_name}` })));
//       } catch (err) {
//         console.error("Failed to load tutors:", err);
//         toast.warning("⚠️ Tutor list empty or failed to load.");
//         setTutors([]); // fallback empty
//       }
//     };
//     fetchTutors();
//   }, [token]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) setFormData({ ...formData, [name]: files[0] });
//     else setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = new FormData();
//       for (const key in formData) payload.append(key, formData[key]);

//       const res = await axios.post("http://127.0.0.1:8000/api/courses/", payload, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       toast.success("✅ Course added successfully!");
//       onCourseAdded(res.data);
//       onClose();
//     } catch (err) {
//       console.error("Course add failed:", err.response?.data || err);
//       if (err.response?.data?.tutor) {
//         toast.error("❌ Invalid tutor selected — make sure the tutor exists.");
//       } else {
//         toast.error("❌ Failed to add course — check required fields!");
//       }
//     }
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h4>Add New Course</h4>
//         <form onSubmit={handleSubmit} className="course-form">
//           <input
//             name="title"
//             placeholder="Course Title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//           />
//           <textarea
//             name="description"
//             placeholder="Description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="number"
//             name="duration_weeks"
//             placeholder="Duration (in weeks)"
//             value={formData.duration_weeks}
//             onChange={handleChange}
//             required
//           />
//           <select name="level" value={formData.level} onChange={handleChange}>
//             <option value="beginner">Beginner</option>
//             <option value="intermediate">Intermediate</option>
//             <option value="advanced">Advanced</option>
//           </select>
//           <input
//             type="number"
//             name="price_inr"
//             placeholder="Price (INR)"
//             value={formData.price_inr}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="number"
//             name="price_usd"
//             placeholder="Price (USD)"
//             value={formData.price_usd}
//             onChange={handleChange}
//             required
//           />

//           <select
//             name="tutor"
//             value={formData.tutor}
//             onChange={handleChange}
//             required
//           >
//             <option value="">-- Select Tutor --</option>
//             {tutors.map((t) => (
//               <option key={t.id} value={t.id}>
//                 {t.name}
//               </option>
//             ))}
//           </select>

//           <input
//             type="file"
//             name="image"
//             accept="image/*"
//             onChange={handleChange}
//           />

//           <div className="modal-buttons">
//             <button type="submit" className="btn btn-primary">
//               Add Course
//             </button>
//             <button
//               type="button"
//               className="btn btn-secondary"
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddCourseModal;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/addcoursemodal.css";

const AddCourseModal = ({ onClose, onCourseAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration_weeks: "",
    level: "beginner",
    price_inr: "",
    price_usd: "",
    tutor: "",
    image: null,
  });

  const [tutors, setTutors] = useState([]);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token"); // Admin JWT

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/adminpanel/users/?role=tutor", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const tutorList = res.data.results || res.data; 
        setTutors(tutorList.map(t => ({ id: t.id, name: `${t.first_name} ${t.last_name}` })));
      } catch (err) {
        console.error("Failed to load tutors:", err);
        toast.warning("⚠️ Tutor list empty or failed to load.");
        setTutors([]);
      }
    };
    fetchTutors();
  }, [token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setFormData({ ...formData, [name]: file });
      setPreview(URL.createObjectURL(file)); // Live Preview
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, image: null });
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = new FormData();
      for (const key in formData) {
        if (formData[key] !== null) {
          payload.append(key, formData[key]);
        }
      }

      const res = await axios.post("http://127.0.0.1:8000/api/courses/", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("✅ Course added successfully!");
      onCourseAdded(res.data);
      onClose();
    } catch (err) {
      console.error("Course add failed:", err.response?.data || err);
      if (err.response?.data?.tutor) {
        toast.error("❌ Invalid tutor selected — make sure the tutor exists.");
      } else {
        toast.error("❌ Failed to add course — check required fields!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="modal-header-custom">
          <div>
            <h4 className="modal-title">Add New Course</h4>
            <p className="modal-sub">Fill in the details to create a new course curriculum</p>
          </div>
          <button type="button" className="btn-close-modal" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="modal-course-form">
          
          {/* Title */}
          <div className="form-group-custom">
            <label>Course Title <span className="req">*</span></label>
            <input
              type="text"
              name="title"
              placeholder="e.g., Robotics & STEM Projects"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="form-group-custom">
            <label>Description <span className="req">*</span></label>
            <textarea
              name="description"
              placeholder="Write a brief overview of the course content..."
              value={formData.description}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>

          {/* Row 1: Duration & Level */}
          <div className="form-row-custom">
            <div className="form-group-custom flex-1">
              <label>Duration (Weeks) <span className="req">*</span></label>
              <input
                type="number"
                name="duration_weeks"
                placeholder="e.g. 12"
                value={formData.duration_weeks}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group-custom flex-1">
              <label>Difficulty Level</label>
              <select name="level" value={formData.level} onChange={handleChange}>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Row 2: Price INR & USD */}
          <div className="form-row-custom">
            <div className="form-group-custom flex-1">
              <label>Price (INR ₹) <span className="req">*</span></label>
              <input
                type="number"
                name="price_inr"
                placeholder="e.g. 1500"
                value={formData.price_inr}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group-custom flex-1">
              <label>Price (USD $) <span className="req">*</span></label>
              <input
                type="number"
                name="price_usd"
                placeholder="e.g. 20"
                value={formData.price_usd}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Select Tutor */}
          <div className="form-group-custom">
            <label>Assigned Tutor <span className="req">*</span></label>
            <select
              name="tutor"
              value={formData.tutor}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Tutor --</option>
              {tutors.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Course Thumbnail Image */}
          <div className="form-group-custom">
            <label>Course Image Thumbnail</label>
            {!preview ? (
              <div className="modal-file-upload">
                <input
                  type="file"
                  name="image"
                  id="modal-file-input"
                  accept="image/*"
                  onChange={handleChange}
                />
                <label htmlFor="modal-file-input" className="file-upload-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  <span>Click to choose an image file</span>
                </label>
              </div>
            ) : (
              <div className="modal-preview-box">
                <img src={preview} alt="Preview" />
                <button type="button" className="btn-remove-preview" onClick={removeImage}>
                  ✕ Remove
                </button>
              </div>
            )}
          </div>

          {/* Modal Action Buttons */}
          <div className="modal-buttons-custom">
            <button
              type="button"
              className="btn-modal-cancel"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-modal-submit"
              disabled={loading}
            >
              {loading ? "Adding Course..." : "Add Course"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddCourseModal;