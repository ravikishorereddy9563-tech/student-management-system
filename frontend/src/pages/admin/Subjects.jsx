import { useEffect, useState } from "react";
import api from "../../api/axios";
import RecordActions from "../../components/common/RecordActions";

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);

  const loadData = async () => {
    const [subjectResponse, courseResponse] = await Promise.all([
      api.get("/academics/subjects/"),
      api.get("/academics/courses/"),
    ]);
    setSubjects(subjectResponse.data);
    setCourses(courseResponse.data);
  };
  useEffect(() => {
    const fetchData = async () => {
      await loadData();
    };
    fetchData();
  }, []);

  const handleAdd = async () => {
    const name = window.prompt("Subject name:");
    const code = window.prompt("Subject code:");
    const course = window.prompt(`Course ID (${courses.map((item) => `${item.id}: ${item.code}`).join(", ")}):`);
    if (!name || !code || !course) return;
    await api.post("/academics/subjects/", { name, code, course: Number(course), semester: 1, credits: 3 });
    loadData();
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>Subjects</h1>
          <p>Manage academic subjects</p>
        </div>

        <button className="btn btn-primary" onClick={handleAdd}>
          + Add Subject
        </button>
      </div>

      <div className="dashboard-card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Subject</th>
              <th>Department</th>
              <th>Semester</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {subjects.map((subject) => (
              <tr key={subject.id}>
                <td>{subject.code}</td>
                <td>{subject.name}</td>
                <td>{courses.find((item) => item.id === subject.course)?.code || subject.course}</td>
                <td>{subject.semester}</td>
                <td><RecordActions endpoint="/academics/subjects/" record={subject} fields={[{ name: "name", required: true }, { name: "code", required: true }, { name: "semester", type: "number", required: true }, { name: "credits", type: "number", required: true }]} onSaved={loadData} onDeleted={(id) => setSubjects((items) => items.filter((item) => item.id !== id))} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Subjects;