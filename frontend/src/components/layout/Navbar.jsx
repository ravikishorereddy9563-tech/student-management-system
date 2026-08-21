function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <h2>Student Management System</h2>
      </div>

      <div className="navbar-right">
        <button className="notification-button">
          🔔
        </button>

        <div className="user-info">
          <div className="avatar">
            A
          </div>

          <div>
            <strong>Admin</strong>
            <small>Administrator</small>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;