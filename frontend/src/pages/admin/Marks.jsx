import { useEffect, useState } from "react";
import api from "../../api/axios";
import RecordActions from "../../components/common/RecordActions";

const Marks = () => {
  const [marks, setMarks] = useState([]);
  const loadMarks = async () => setMarks((await api.get("/exams/marks/")).data);
  useEffect(() => { const load = async () => loadMarks(); load(); }, []);
  const handleAdd = async () => {
    const student = window.prompt("Student database ID:");
    const subject = window.prompt("Subject database ID:");
    const value = window.prompt("Marks:");
    if (!student || !subject || !value) return;
    await api.post("/exams/marks/", { student: Number(student), subject: Number(subject), marks: Number(value), grade: "" });
    loadMarks();
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>Marks</h1>
          <p>Manage student marks and grades</p>
        </div>

        <button className="btn btn-primary" onClick={handleAdd}>
          + Enter Marks
        </button>
      </div>

      <div className="dashboard-card">
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student</th>
              <th>Subject</th>
              <th>Marks</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {marks.map((mark) => (
              <tr key={mark.id}>
                <td>{mark.student}</td>
                <td>{mark.student_name || mark.student}</td>
                <td>{mark.subject}</td>
                <td>{mark.marks}</td>
                <td>{mark.grade || "-"}</td>
                <td><RecordActions endpoint="/exams/marks/" record={mark} fields={[{ name: "marks", type: "number", required: true }, { name: "grade" }]} onSaved={loadMarks} onDeleted={(id) => setMarks((items) => items.filter((item) => item.id !== id))} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Marks;