import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/login');
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">CourseApp</Link>
      </div>
      {token && (
        <div className="navbar-links">
          <Link to="/courses">Courses</Link>
          {(role === 'Admin' || role === 'Instructor') && (
            <Link to="/students">Students</Link>
          )}
          {(role === 'Admin' || role === 'Instructor') && (
            <Link to="/enrollments">Enrollments</Link>
          )}
        </div>
      )}
      <div className="navbar-auth">
        {token ? (
          <>
            <span className="navbar-user">
              {username} <em>({role})</em>
            </span>
            <button className="btn btn-sm btn-outline" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
