import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

const AddStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    admissionNumber: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    course: "",
    department: "",
    year: "",
    semester: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEditing) return;

    const loadStudent = async () => {
      try {
        const response = await api.get(`/students/${id}/`);
        const student = response.data;
        setFormData({
          admissionNumber: student.admission_number || "",
          firstName: student.first_name || "",
          lastName: student.last_name || "",
          email: student.email || "",
          phone: student.phone || "",
          gender: student.gender || "",
          dateOfBirth: student.date_of_birth || "",
          course: student.course || "",
          department: student.department || "",
          year: String(student.year || ""),
          semester: String(student.semester || ""),
          address: student.address || "",
        });
      } catch {
        setError("Unable to load the student record.");
      }
    };

    loadStudent();
  }, [id, isEditing]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const payload = {
        admission_number: formData.admissionNumber,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        date_of_birth: formData.dateOfBirth,
        course: formData.course,
        department: formData.department,
        year: Number(formData.year),
        semester: Number(formData.semester),
        address: formData.address,
      };
      if (isEditing) {
        await api.put(`/students/${id}/`, payload);
      } else {
        await api.post("/students/", payload);
      }
      navigate("/admin/students");
    } catch (err) {
      const details = err.response?.data;
      setError(
        details && typeof details === "object"
          ? Object.values(details).flat().join(" ")
          : "Unable to save the student record."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>{isEditing ? "Edit Student" : "Add Student"}</h1>
          <p>{isEditing ? "Update the student record" : "Create a new student record"}</p>
        </div>
      </div>

      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Personal Information</h2>

        <div className="form-grid">
          <input
            name="admissionNumber"
            placeholder="Admission Number"
            value={formData.admissionNumber}
            onChange={handleChange}
            required
          />

          <input
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <input
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>

          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>

        <h2>Academic Information</h2>

        <div className="form-grid">
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            <option value="cse">Computer Science</option>
            <option value="ece">Electronics</option>
            <option value="eee">Electrical</option>
            <option value="mech">Mechanical</option>
          </select>

          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          >
            <option value="">Select Course</option>
            <option value="btech">B.Tech</option>
            <option value="bca">BCA</option>
            <option value="bsc">B.Sc</option>
            <option value="mca">MCA</option>
          </select>

          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
          >
            <option value="">Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>

          <select
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            required
          >
            <option value="">Select Semester</option>
            <option value="1">1st Semester</option>
            <option value="2">2nd Semester</option>
          </select>

          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        {error && <p className="auth-error">{error}</p>}

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/admin/students")}
          >
            Cancel
          </button>

          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Saving..." : isEditing ? "Update Student" : "Save Student"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;