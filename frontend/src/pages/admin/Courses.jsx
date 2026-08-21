import { useEffect, useState } from "react";
import api from "../../api/axios";
import RecordActions from "../../components/common/RecordActions";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);

  const loadData = async () => {
    const [courseResponse, departmentResponse] = await Promise.all([
      api.get("/academics/courses/"),
      api.get("/academics/departments/"),
    ]);
    setCourses(courseResponse.data);
    setDepartments(departmentResponse.data);
  };
  useEffect(() => {
    const fetchData = async () => {
      await loadData();
    };
    fetchData();
  }, []);

  const handleAdd = async () => {
    const name = window.prompt("Course name:");
    const code = window.prompt("Course code:");
    const department = window.prompt(`Department ID (${departments.map((item) => `${item.id}: ${item.code}`).join(", ")}):`);
    if (!name || !code || !department) return;
    await api.post("/academics/courses/", { name, code, department: Number(department), duration_years: 4 });
    loadData();
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>Courses</h1>
          <p>Manage academic courses</p>
        </div>

        <button className="btn btn-primary" onClick={handleAdd}>
          + Add Course
        </button>
      </div>

      <div className="dashboard-card">
        <table>
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Course Name</th>
              <th>Department</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.code}</td>
                <td>{course.name}</td>
                <td>{departments.find((item) => item.id === course.department)?.code || course.department}</td>
                <td>{course.duration_years} Years</td>
                <td><RecordActions endpoint="/academics/courses/" record={course} fields={[{ name: "name", required: true }, { name: "code", required: true }, { name: "duration_years", type: "number", required: true }]} onSaved={loadData} onDeleted={(id) => setCourses((items) => items.filter((item) => item.id !== id))} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;