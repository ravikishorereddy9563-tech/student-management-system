import { useEffect, useState } from "react";
import api from "../../api/axios";
import RecordActions from "../../components/common/RecordActions";

const Departments = () => {
  const [departments, setDepartments] = useState([]);

  const loadDepartments = () => api.get("/academics/departments/").then((response) => setDepartments(response.data));
  useEffect(() => { loadDepartments(); }, []);

  const handleAdd = async () => {
    const name = window.prompt("Department name:");
    const code = window.prompt("Department code:");
    if (!name || !code) return;
    await api.post("/academics/departments/", { name, code, description: "" });
    loadDepartments();
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>Departments</h1>
          <p>Manage academic departments</p>
        </div>

        <button className="btn btn-primary" onClick={handleAdd}>
          + Add Department
        </button>
      </div>

      <div className="dashboard-card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Department</th>
              <th>Code</th>
              <th>Students</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {departments.map((department) => (
              <tr key={department.id}>
                <td>{department.id}</td>
                <td>{department.name}</td>
                <td>{department.code}</td>
                <td>—</td>
                <td><RecordActions endpoint="/academics/departments/" record={department} fields={[{ name: "name", required: true }, { name: "code", required: true }, { name: "description" }]} onSaved={loadDepartments} onDeleted={(id) => setDepartments((items) => items.filter((item) => item.id !== id))} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Departments;