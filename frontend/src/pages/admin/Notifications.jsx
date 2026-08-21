import { useEffect, useState } from "react";
import api from "../../api/axios";
import RecordActions from "../../components/common/RecordActions";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => { const load = async () => setNotifications((await api.get("/notifications/notifications/")).data); load(); }, []);

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>Notifications</h1>
          <p>System notifications and alerts</p>
        </div>
      </div>

      <div className="notification-list">
        {notifications.map((notification) => (
          <div className="notification-item" key={notification.id}>
            <span>🔔</span>

            <div>
              <strong>{notification.message}</strong>
              <p>{notification.created_at}</p>
              <RecordActions endpoint="/notifications/notifications/" record={notification} fields={[{ name: "message", required: true }]} onSaved={() => window.location.reload()} onDeleted={(id) => setNotifications((items) => items.filter((item) => item.id !== id))} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;