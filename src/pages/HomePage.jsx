import { Link } from 'react-router-dom';

export default function HomePage() {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');

  return (
    <div className="home-container">
      <div className="hero">
        <h1>CourseApp</h1>
        <p>A course management system for students, instructors, and admins.</p>
        {!token && (
          <div className="hero-actions">
            <Link to="/login" className="btn btn-primary">Login</Link>
            <Link to="/register" className="btn btn-outline">Register</Link>
          </div>
        )}
        {token && (
          <p className="welcome-msg">Welcome back, <strong>{username}</strong>!</p>
        )}
      </div>

      {token && (
        <div className="feature-grid">
          <Link to="/courses" className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Courses</h3>
            <p>Browse, create, and manage courses.</p>
          </Link>
          {(role === 'Admin' || role === 'Instructor') && (
            <Link to="/students" className="feature-card">
              <div className="feature-icon">🎓</div>
              <h3>Students</h3>
              <p>View and manage student records.</p>
            </Link>
          )}
          {(role === 'Admin' || role === 'Instructor') && (
            <Link to="/enrollments" className="feature-card">
              <div className="feature-icon">📋</div>
              <h3>Enrollments</h3>
              <p>Track course enrollments and grades.</p>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
