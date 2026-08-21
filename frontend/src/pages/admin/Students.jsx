import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const Students = () => {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleDelete = async (student) => {
    if (!window.confirm(`Delete ${student.full_name}?`)) return;

    try {
      await api.delete(`/students/${student.id}/`);
      setStudents((currentStudents) =>
        currentStudents.filter((item) => item.id !== student.id)
      );
    } catch {
      setError("Unable to delete the student record.");
    }
  };

  // Fetch students from Django backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/students/");

        console.log("Students API response:", response.data);

        // Save students received from Django
        setStudents(response.data);
      } catch (err) {
        console.error("Error fetching students:", err);

        if (err.response) {
          console.error("Status:", err.response.status);
          console.error("Response:", err.response.data);
        }

        setError("Unable to load students from backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Search students
  const filteredStudents = students.filter((student) => {
    const studentId = String(
      student.admission_number || student.student_id || student.id || ""
    ).toLowerCase();

    const name = String(student.full_name || "").toLowerCase();

    const email = String(
      student.email || ""
    ).toLowerCase();

    const searchText = search.toLowerCase();

    return (
      name.includes(searchText) ||
      studentId.includes(searchText) ||
      email.includes(searchText)
    );
  });

  return (
    <div className="admin-page">

      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>Students</h1>
          <p>Manage all registered students</p>
        </div>

        <Link
          to="/admin/students/add"
          className="btn btn-primary"
        >
          + Add Student
        </Link>
      </div>

      {/* Search */}
      <div className="toolbar">
        <input
          type="text"
          placeholder="Search students..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Error */}
      {error && (
        <p style={{ color: "red", margin: "15px 0" }}>
          {error}
        </p>
      )}

      {/* Students Table */}
      <div className="dashboard-card">

        {loading ? (
          <p style={{ padding: "20px" }}>
            Loading students...
          </p>
        ) : filteredStudents.length === 0 ? (
          <p style={{ padding: "20px" }}>
            No students found.
          </p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Year</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student) => {

                const studentId =
                  student.admission_number || student.student_id || student.id;

                const studentName =
                  student.name ||
                  student.full_name ||
                  "N/A";

                const studentEmail =
                  student.email || "N/A";

                const studentCourse =
                  student.course ||
                  student.course_name ||
                  "N/A";

                const studentYear =
                  student.year ||
                  student.academic_year ||
                  "N/A";

                const studentStatus =
                  student.status || "ACTIVE";

                return (
                  <tr key={studentId}>

                    <td>
                      {studentId}
                    </td>

                    <td>
                      {studentName}
                    </td>

                    <td>
                      {studentEmail}
                    </td>

                    <td>
                      {studentCourse}
                    </td>

                    <td>
                      {studentYear}
                    </td>

                    <td>
                      <span
                        className={`status ${
                          studentStatus === "ACTIVE"
                            ? "active"
                            : "inactive"
                        }`}
                      >
                        {studentStatus.toLowerCase()}
                      </span>
                    </td>

                    <td>
                      <Link
                        to={`/admin/students/${student.id}`}
                      >
                        View
                      </Link>
                      {" | "}
                      <Link to={`/admin/students/${student.id}/edit`}>
                        Edit
                      </Link>
                      {" | "}
                      <button
                        type="button"
                        onClick={() => handleDelete(student)}
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

      </div>
    </div>
  );
};

export default Students;