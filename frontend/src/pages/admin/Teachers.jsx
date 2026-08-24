import { useEffect, useState } from "react";
import api from "../../api/axios";
import RecordActions from "../../components/common/RecordActions";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const loadTeachers = async () => setTeachers((await api.get("/teachers/teachers/")).data);
  useEffect(() => {
    const fetchTeachers = async () => {
      const [teacherResponse, departmentResponse] = await Promise.all([
        api.get("/teachers/teachers/"),
        api.get("/academics/departments/"),
      ]);
      setTeachers(teacherResponse.data);
      setDepartments(departmentResponse.data);
    };
    fetchTeachers();
  }, []);

  const handleAdd = async () => {
    const employeeId = window.prompt("Employee ID:");
    const name = window.prompt("Full name:");
    const email = window.prompt("Email:");
    const departmentId = window.prompt(
      `Department ID (${departments.map((department) => `${department.id}: ${department.code}`).join(", ")}):`
    );
    if (!employeeId || !name || !email || !departmentId) return;
    const [firstName, ...lastParts] = name.trim().split(" ");
    try {
      await api.post("/teachers/teachers/", {
        employee_id: employeeId,
        department: departmentId,
        first_name: firstName,
        last_name: lastParts.join(" ") || "Staff",
        email,
        phone: "0000000000",
        qualification: "Not specified",
        joining_date: new Date().toISOString().slice(0, 10),
      });
      await loadTeachers();
    } catch (error) {
      const responseData = error.response?.data;
      const fieldMessage = responseData && Object.values(responseData)
        .flat()
        .find((value) => typeof value === "string");
      const message = fieldMessage
        || (error.response ? "Unable to add teacher." : "Unable to connect to the server.");
      window.alert(message);
    }
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>Teachers</h1>
          <p>Manage teaching staff</p>
        </div>

        <button className="btn btn-primary" onClick={handleAdd}>
          + Add Teacher
        </button>
      </div>

      <div className="dashboard-card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td>{teacher.employee_id}</td>
                <td>{teacher.first_name} {teacher.last_name}</td>
                <td>{departments.find((department) => department.id === teacher.department)?.name || "Not specified"}</td>
                <td>{teacher.email}</td>
                <td><RecordActions endpoint="/teachers/teachers/" record={teacher} fields={[{ name: "first_name", required: true }, { name: "last_name", required: true }, { name: "email", type: "email", required: true }]} onSaved={loadTeachers} onDeleted={(id) => setTeachers((items) => items.filter((item) => item.id !== id))} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teachers;