import { useEffect, useState } from "react";
import api from "../../api/axios";

const Settings = () => {
  const [settings, setSettings] = useState({
    collegeName: "ABC College of Engineering",
    email: "admin@college.edu",
    phone: "9876543210",
    notifications: true,
  });

  useEffect(() => {
    const loadSettings = async () => {
      const response = await api.get("/reports/settings/");
      if (response.data.length) setSettings(response.data[0]);
    };
    loadSettings();
  }, []);

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await api.get("/reports/settings/");
    if (response.data.length) {
      await api.put(`/reports/settings/${response.data[0].id}/`, settings);
    } else {
      await api.post("/reports/settings/", settings);
    }
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage system settings</p>
        </div>
      </div>

      <form className="form-card" onSubmit={handleSubmit}>
        <h2>College Information</h2>

        <div className="form-grid">
          <input
            name="collegeName"
            value={settings.collegeName}
            onChange={handleChange}
            placeholder="College Name"
          />

          <input
            name="email"
            value={settings.email}
            onChange={handleChange}
            placeholder="Email"
          />

          <input
            name="phone"
            value={settings.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
        </div>

        <h2>Notifications</h2>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={(e) =>
              setSettings({
                ...settings,
                notifications: e.target.checked,
              })
            }
          />

          Enable system notifications
        </label>

        <div className="form-actions">
          <button className="btn btn-primary" type="submit">
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;