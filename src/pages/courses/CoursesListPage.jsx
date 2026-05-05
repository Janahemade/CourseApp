import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCourses, deleteCourse } from '../../services/api';

export default function CoursesListPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const role = localStorage.getItem('role');

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
      const res = await getCourses();
      setCourses(res.data);
    } catch (err) {
      setError('Failed to load courses.');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this course?')) return;
    try {
      await deleteCourse(id);
      setCourses(courses.filter((c) => c.id !== id));
    } catch (err) {
      alert('Failed to delete course.');
    }
  }

  if (loading) return <div className="page-loading">Loading courses...</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Courses</h2>
        {(role === 'Admin' || role === 'Instructor') && (
          <Link to="/courses/new" className="btn btn-primary">+ New Course</Link>
        )}
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {courses.length === 0 ? (
        <p className="empty-state">No courses found.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Title</th>
                <th>Credits</th>
                <th>Instructor</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td><span className="badge">{course.code}</span></td>
                  <td>{course.title}</td>
                  <td>{course.credits}</td>
                  <td>{course.instructorName}</td>
                  <td className="actions">
                    {(role === 'Admin' || role === 'Instructor') && (
                      <Link to={`/courses/${course.id}/edit`} className="btn btn-sm btn-outline">
                        Edit
                      </Link>
                    )}
                    {role === 'Admin' && (
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(course.id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
