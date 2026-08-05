import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditUserForm from "../../components/Forms/EditUserForm";
import { fetchUser, updateUser } from "../../api/adminPanelAPI";
import { toast } from "react-toastify";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const loadStudent = async () => {
      try {
        const data = await fetchUser(token, id);
        setStudent({
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          email: data.email || "",
          phone: data.phone || "",
          about: data.about || "",
          course: data.course || "",
          status: data.is_active,
        });
      } catch (err) {
        console.error("Error loading student:", err);
        toast.error("Failed to load student details.");
      }
    };
    loadStudent();
  }, [id, token]);

  const handleSave = async (updatedData) => {
    try {
      const payload = {
        first_name: updatedData.firstName,
        last_name: updatedData.lastName,
        email: updatedData.email,
        phone: updatedData.phone,
        about: updatedData.about,
        course: updatedData.course,
        is_active: updatedData.status,
      };
      await updateUser(token, id, payload);
      toast.success("Student details updated successfully!");
      navigate("/admin/students");
    } catch (err) {
      console.error("Error updating student:", err);
      toast.error("Failed to update student details.");
    }
  };

  const handleCancel = () => navigate(-1);

  return (
    <div className="edit-page">
      {student && (
        <EditUserForm
          role="student"
          initialData={student}
          onSubmit={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default EditStudent;
