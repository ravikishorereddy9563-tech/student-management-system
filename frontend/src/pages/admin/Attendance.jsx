import { useEffect, useState } from "react";
import api from "../../api/axios";
import RecordActions from "../../components/common/RecordActions";

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    student: "",
    subject: "",
    date: new Date().toISOString().slice(0, 10),
    status: "present",
    remarks: "",
  });

  const loadAttendance = async () => {
    const [attendanceResponse, studentsResponse, subjectsResponse] = await Promise.all([
      api.get("/attendance/"),
      api.get("/students/"),
      api.get("/academics/subjects/"),
    ]);
    setStudents(studentsResponse.data);
    setSubjects(subjectsResponse.data);
    const studentsById = Object.fromEntries(
      studentsResponse.data.map((student) => [student.id, student])
    );
    const subjectsById = Object.fromEntries(
      subjectsResponse.data.map((subject) => [subject.id, subject])
    );
    setAttendanceData(
      attendanceResponse.data.map((record) => ({
        ...record,
        student_name:
          record.student_name ||
          studentsById[record.student]?.full_name ||
          record.student,
        student_admission_number:
          record.student_admission_number ||
          studentsById[record.student]?.admission_number ||
          record.student,
        subject_name:
          record.subject_name ||
          subjectsById[record.subject]?.name ||
          record.subject,
      }))
    );
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSaving(true);
    try {
      await api.post("/attendance/", {
        ...formData,
        student: Number(formData.student),
        subject: Number(formData.subject),
      });
      setShowForm(false);
      setFormData({ ...formData, student: "", subject: "", remarks: "" });
      await loadAttendance();
    } catch (requestError) {
      const details = requestError.response?.data;
      setError(details && typeof details === "object" ? Object.values(details).flat().join(" ") : "Unable to save attendance.");
    } finally {
      setSaving(false);
    }
  };
  useEffect(() => {
    const fetchAttendance = async () => {
      await loadAttendance();
    };
    fetchAttendance();
  }, []);

  return (
    <div className="admin-page">

      {/* Header */}

      <div className="page-header">

        <div>
          <h1>Attendance</h1>

          <p>
            Monitor and manage student attendance
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          + Mark Attendance
        </button>

      </div>

      {showForm && (
        <form className="form-card" onSubmit={handleSubmit}>
          <h2>Mark Attendance</h2>
          <div className="form-grid">
            <select name="student" value={formData.student} onChange={handleChange} required>
              <option value="">Select Student</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.admission_number} - {student.full_name}
                </option>
              ))}
            </select>
            <select name="subject" value={formData.subject} onChange={handleChange} required>
              <option value="">Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>{subject.name}</option>
              ))}
            </select>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            <select name="status" value={formData.status} onChange={handleChange} required>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="late">Late</option>
            </select>
            <input name="remarks" placeholder="Remarks (optional)" value={formData.remarks} onChange={handleChange} />
          </div>
          {error && <p className="auth-error">{error}</p>}
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? "Saving..." : "Save Attendance"}</button>
          </div>
        </form>
      )}


      {/* Statistics */}

      <div className="stats-grid">

        <div className="stat-card">

          <div className="stat-icon">
            📅
          </div>

          <div>
            <h3>92%</h3>

            <p>
              Overall Attendance
            </p>

            <small>
              Current semester
            </small>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            ✅
          </div>

          <div>
            <h3>1,120</h3>

            <p>
              Present Today
            </p>

            <small>
              Students present
            </small>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            ❌
          </div>

          <div>
            <h3>130</h3>

            <p>
              Absent Today
            </p>

            <small>
              Students absent
            </small>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            ⚠️
          </div>

          <div>
            <h3>48</h3>

            <p>
              Low Attendance
            </p>

            <small>
              Below 75%
            </small>
          </div>

        </div>

      </div>


      {/* Attendance Table */}

      <div className="dashboard-card">

        <div className="page-header">

          <div>
            <h2>
              Attendance Records
            </h2>

            <p>
              Student attendance overview
            </p>
          </div>

        </div>


        <div className="table-container">

          <table>

            <thead>

              <tr>

                <th>
                  Student ID
                </th>

                <th>
                  Student Name
                </th>

                <th>
                  Course
                </th>

                <th>
                  Date
                </th>

                <th>
                  Present
                </th>

                <th>
                  Absent
                </th>

                <th>
                  Percentage
                </th>

                <th>
                  Status
                </th>

                <th>
                  Remarks
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {attendanceData.map((record) => (

                <tr key={record.id}>

                  <td>
                    {record.student_admission_number || record.student}
                  </td>

                  <td>
                    {record.student_name || record.student}
                  </td>

                  <td>
                    {record.subject_name || record.subject}
                  </td>

                  <td>
                    {record.date}
                  </td>

                  <td>
                    {record.status === "present" ? 1 : 0}
                  </td>

                  <td>
                    {record.status === "absent" ? 1 : 0}
                  </td>

                  <td>
                    {record.status === "present"
                      ? "100%"
                      : record.status === "absent"
                      ? "0%"
                      : "-"}
                  </td>

                  <td>

                    <span
                      className={`status ${
                        record.status === "present"
                          ? "active"
                          : record.status === "late"
                          ? "pending"
                          : "inactive"
                      }`}
                    >
                      {record.status}
                    </span>

                  </td>

                  <td>
                    {record.remarks || "-"}
                  </td>

                  <td>
                    <RecordActions
                      endpoint="/attendance/"
                      record={record}
                      fields={[
                        { name: "date", type: "date", required: true },
                        { name: "status", required: true },
                        { name: "remarks" },
                      ]}
                      onSaved={loadAttendance}
                      onDeleted={(id) => setAttendanceData((items) => items.filter((item) => item.id !== id))}
                    />
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Attendance;