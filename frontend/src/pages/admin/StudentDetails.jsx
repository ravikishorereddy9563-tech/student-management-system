import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/axios";

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await api.get(`/students/${id}/`);
        setStudent(response.data);
      } catch (err) {
        setError(
          err.response?.status === 404
            ? "Student record not found."
            : "Unable to load student details."
        );
      }
    };

    fetchStudent();
  }, [id]);

  if (error) {
    return <div className="admin-page"><p className="auth-error">{error}</p></div>;
  }

  if (!student) {
    return <div className="admin-page"><p>Loading student details...</p></div>;
  }

  const status = student.status || "ACTIVE";

  return (
    <div className="admin-page">

      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>Student Details</h1>
          <p className="student-id">
            Student ID: {student.admission_number}
          </p>
        </div>

        <Link
          to="/admin/students"
          className="btn btn-secondary"
        >
          ← Back
        </Link>
      </div>


      {/* Student Profile */}
      <div className="profile-card student-profile">

        <div className="profile-avatar">
          RK
        </div>

        <div className="profile-info">

          <h2>
            {student.full_name}
          </h2>

          <p className="profile-email">
            {student.email}
          </p>

          <span className={`status ${status === "ACTIVE" ? "active" : "inactive"}`}>
            {status.toLowerCase()}
          </span>

        </div>

      </div>


      {/* Information Sections */}
      <div className="dashboard-grid">

        {/* Personal Information */}
        <div className="dashboard-card personal-info">

          <h2>
            Personal Information
          </h2>

          <div className="info-item">
            <strong>Student ID:</strong>
            <span>{student.admission_number}</span>
          </div>

          <div className="info-item">
            <strong>Name:</strong>
            <span>{student.full_name}</span>
          </div>

          <div className="info-item">
            <strong>Email:</strong>
            <span>{student.email}</span>
          </div>

          <div className="info-item">
            <strong>Phone:</strong>
            <span>{student.phone}</span>
          </div>

          <div className="info-item">
            <strong>Gender:</strong>
            <span>{student.gender}</span>
          </div>

          <div className="info-item">
            <strong>Date of Birth:</strong>
            <span>{student.date_of_birth}</span>
          </div>

        </div>


        {/* Academic Information */}
        <div className="dashboard-card academic-info">

          <h2>
            Academic Information
          </h2>

          <div className="info-item">
            <strong>Course:</strong>
            <span>{student.course}</span>
          </div>

          <div className="info-item">
            <strong>Department:</strong>
            <span>{student.department}</span>
          </div>

          <div className="info-item">
            <strong>Year:</strong>
            <span>{student.year}</span>
          </div>

          <div className="info-item">
            <strong>Semester:</strong>
            <span>{student.semester}</span>
          </div>

          <div className="info-item">
            <strong>CGPA:</strong>
            <span>8.7</span>
          </div>

        </div>

      </div>

    </div>
  );
};

export default StudentDetails;