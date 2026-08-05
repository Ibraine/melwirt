import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditUserForm from "../../components/Forms/EditUserForm";
import { fetchTutor, updateTutor } from "../../api/adminPanelAPI";
import { toast } from "react-toastify";

const EditTeacher = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const loadTeacher = async () => {
      try {
        const data = await fetchTutor(token, id);
        setTeacher({
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          email: data.email || "",
          phone: data.phone || "",
          about: data.bio || "",
          subject: data.subject || "",
          experience: data.experience || "",
          qualification: data.qualification || "",
          status: data.is_active,
        });
      } catch (err) {
        console.error("Error loading teacher:", err);
        toast.error("Failed to load teacher details.");
      }
    };
    loadTeacher();
  }, [id, token]);

  const handleSave = async (updatedData) => {
    try {
      const payload = {
        first_name: updatedData.firstName,
        last_name: updatedData.lastName,
        email: updatedData.email,
        phone: updatedData.phone,
        bio: updatedData.about,
        subject: updatedData.subject,
        experience: updatedData.experience,
        qualification: updatedData.qualification,
        is_active: updatedData.status,
      };
      await updateTutor(token, id, payload);
      toast.success("Teacher details updated successfully!");
      navigate("/admin/teachers");
    } catch (err) {
      console.error("Error updating teacher:", err);
      toast.error("Failed to update teacher details.");
    }
  };

  const handleCancel = () => navigate(-1);

  return (
    <div className="admin-page">
      {teacher && (
        <EditUserForm
          role="teacher"
          initialData={teacher}
          onSubmit={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default EditTeacher;
