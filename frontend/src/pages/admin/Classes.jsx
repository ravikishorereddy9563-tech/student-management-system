import { useEffect, useState } from "react";
import api from "../../api/axios";
import RecordActions from "../../components/common/RecordActions";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const loadClasses = async () => setClasses((await api.get("/academics/classes/")).data);
  useEffect(() => { const load = async () => loadClasses(); load(); }, []);
  const handleAdd = async () => {
    const code = window.prompt("Class code:");
    const name = window.prompt("Class name:");
    const room = window.prompt("Room:");
    const startTime = window.prompt("Start time (HH:MM):");
    if (!code || !name || !room || !startTime) return;
    await api.post("/academics/classes/", { code, name, room, start_time: startTime, year: 1 });
    loadClasses();
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>Classes</h1>
          <p>Manage classroom schedules</p>
        </div>

        <button className="btn btn-primary" onClick={handleAdd}>
          + Add Class
        </button>
      </div>

      <div className="dashboard-card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Class</th>
              <th>Year</th>
              <th>Room</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {classes.map((item) => (
              <tr key={item.id}>
                <td>{item.code}</td>
                <td>{item.name}</td>
                <td>{item.year}</td>
                <td>{item.room}</td>
                <td>{item.start_time}</td>
                <td><RecordActions endpoint="/academics/classes/" record={item} fields={[{ name: "code", required: true }, { name: "name", required: true }, { name: "year", type: "number", required: true }, { name: "room", required: true }, { name: "start_time", type: "time", required: true }]} onSaved={loadClasses} onDeleted={(id) => setClasses((items) => items.filter((entry) => entry.id !== id))} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Classes;