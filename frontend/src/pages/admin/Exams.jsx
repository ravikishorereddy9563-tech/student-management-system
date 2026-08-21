import { useEffect, useState } from "react";
import api from "../../api/axios";
import RecordActions from "../../components/common/RecordActions";

const Exams = () => {
  const [exams, setExams] = useState([]);
  const loadExams = async () => setExams((await api.get("/exams/")).data);
  useEffect(() => {
    const fetchExams = async () => {
      await loadExams();
    };
    fetchExams();
  }, []);

  const handleAdd = async () => {
    const name = window.prompt("Exam name:");
    const subject = window.prompt("Subject:");
    const examDate = window.prompt("Exam date (YYYY-MM-DD):");
    if (!name || !subject || !examDate) return;
    await api.post("/exams/", { name, subject, exam_date: examDate, room_number: "TBD" });
    loadExams();
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>Exams</h1>
          <p>Manage examinations and schedules</p>
        </div>

        <button className="btn btn-primary" onClick={handleAdd}>
          + Schedule Exam
        </button>
      </div>

      <div className="dashboard-card">
        <table>
          <thead>
            <tr>
              <th>Exam ID</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Time</th>
              <th>Room</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {exams.map((exam) => (
              <tr key={exam.id}>
                <td>{exam.id}</td>
                <td>{exam.subject}</td>
                <td>{exam.exam_date}</td>
                <td>{exam.start_time || "-"}</td>
                <td>{exam.room_number || "-"}</td>
                <td><RecordActions endpoint="/exams/" record={exam} fields={[{ name: "name", required: true }, { name: "subject", required: true }, { name: "exam_date", type: "date", required: true }, { name: "room_number" }]} onSaved={loadExams} onDeleted={(id) => setExams((items) => items.filter((item) => item.id !== id))} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Exams;