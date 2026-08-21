import { useEffect, useState } from "react";
import api from "../../api/axios";
import RecordActions from "../../components/common/RecordActions";

const Fees = () => {
  const [fees, setFees] = useState([]);
  const loadFees = async () => setFees((await api.get("/fees/")).data);
  useEffect(() => {
    const fetchFees = async () => {
      await loadFees();
    };
    fetchFees();
  }, []);

  const handleAdd = async () => {
    const studentId = window.prompt("Student ID:");
    const studentName = window.prompt("Student name:");
    const amount = window.prompt("Amount:");
    const dueDate = window.prompt("Due date (YYYY-MM-DD):");
    if (!studentId || !studentName || !amount || !dueDate) return;
    await api.post("/fees/", { student_id: studentId, student_name: studentName, amount, due_date: dueDate });
    loadFees();
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>Fees</h1>
          <p>Manage student fee payments</p>
        </div>

        <button className="btn btn-primary" onClick={handleAdd}>
          + Record Payment
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div>
            <h3>₹24.5L</h3>
            <p>Total Collected</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div>
            <h3>₹4.2L</h3>
            <p>Pending Fees</p>
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student</th>
              <th>Total Fee</th>
              <th>Paid</th>
              <th>Pending</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {fees.map((fee) => (
            <tr key={fee.id}>
              <td>{fee.student_id}</td>
              <td>{fee.student_name}</td>
              <td>{fee.amount}</td>
              <td>{fee.paid_amount}</td>
              <td>{Number(fee.amount) - Number(fee.paid_amount)}</td>
              <td><span className="status pending">{fee.payment_status}</span></td>
              <td><RecordActions endpoint="/fees/" record={fee} fields={[{ name: "student_id", required: true }, { name: "student_name", required: true }, { name: "amount", type: "number", required: true }, { name: "paid_amount", type: "number", required: true }, { name: "due_date", type: "date", required: true }]} onSaved={loadFees} onDeleted={(id) => setFees((items) => items.filter((item) => item.id !== id))} /></td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Fees;