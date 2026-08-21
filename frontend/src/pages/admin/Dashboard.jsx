import { useEffect, useState } from "react";
import api from "../../api/axios";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/academics/dashboard/")
      .then((response) => setDashboard(response.data))
      .catch(() => setError("Unable to load dashboard data."));
  }, []);

  const statistics = [
    {
      title: "Total Students",
      value: dashboard?.statistics.students ?? "-",
      icon: "👨‍🎓",
      description: "Registered students",
    },
    {
      title: "Teachers",
      value: dashboard?.statistics.teachers ?? "-",
      icon: "👨‍🏫",
      description: "Active teachers",
    },
    {
      title: "Courses",
      value: dashboard?.statistics.courses ?? "-",
      icon: "📚",
      description: "Available courses",
    },
    {
      title: "Departments",
      value: dashboard?.statistics.departments ?? "-",
      icon: "🏢",
      description: "Academic departments",
    },
  ];

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome to Student Management System</p>
        </div>
      </div>

      {error && <p className="auth-error">{error}</p>}

      <div className="stats-grid">
        {statistics.map((item) => (
          <div className="stat-card" key={item.title}>
            <div className="stat-icon">{item.icon}</div>

            <div>
              <h3>{item.value}</h3>
              <p>{item.title}</p>
              <small>{item.description}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Recent Students</h2>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Course</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {dashboard?.recent_students?.map((student) => (
                <tr key={student.id}>
                  <td>{student.admission_number}</td>
                  <td>{student.full_name}</td>
                  <td>{student.course}</td>
                  <td>
                    <span className={`status ${student.status === "ACTIVE" ? "active" : "inactive"}`}>
                      {student.status.toLowerCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="dashboard-card">
          <h2>Today's Summary</h2>

          <div className="summary-item">
            <span>Attendance</span>
            <strong>92%</strong>
          </div>

          <div className="summary-item">
            <span>Fees Collected</span>
            <strong>₹2,45,000</strong>
          </div>

          <div className="summary-item">
            <span>Exams Scheduled</span>
            <strong>4</strong>
          </div>

          <div className="summary-item">
            <span>Announcements</span>
            <strong>6</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;