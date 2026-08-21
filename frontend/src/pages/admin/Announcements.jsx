import { useEffect, useState } from "react";
import api from "../../api/axios";
import RecordActions from "../../components/common/RecordActions";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const loadAnnouncements = async () => setAnnouncements((await api.get("/notifications/announcements/")).data);
  useEffect(() => { const load = async () => loadAnnouncements(); load(); }, []);
  const handleAdd = async () => {
    const title = window.prompt("Announcement title:");
    const content = window.prompt("Announcement content:");
    if (!title || !content) return;
    await api.post("/notifications/announcements/", { title, content, announcement_type: "General" });
    loadAnnouncements();
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>Announcements</h1>
          <p>Publish important college announcements</p>
        </div>

        <button className="btn btn-primary" onClick={handleAdd}>
          + New Announcement
        </button>
      </div>

      <div className="announcement-list">
        {announcements.map((item) => (
          <div className="dashboard-card" key={item.title}>
            <h2>{item.title}</h2>
            <p>{item.announcement_type}</p>
            <small>{item.created_at}</small>
            <RecordActions endpoint="/notifications/announcements/" record={item} fields={[{ name: "title", required: true }, { name: "content", required: true }, { name: "announcement_type", required: true }]} onSaved={loadAnnouncements} onDeleted={(id) => setAnnouncements((items) => items.filter((entry) => entry.id !== id))} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;