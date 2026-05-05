import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEnrollments, deleteEnrollment, updateEnrollment } from '../../services/api';

export default function EnrollmentsListPage() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingGrade, setEditingGrade] = useState(null);
  const [gradeValue, setGradeValue] = useState('');
  const role = localStorage.getItem('role');

  useEffect(() => {
    getEnrollments()
      .then((res) => setEnrollments(res.data))
      .catch(() => setError('Failed to load enrollments.'))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id) {
    if (!window.confirm('Remove this enrollment?')) return;
    try {
      await deleteEnrollment(id);
      setEnrollments(enrollments.filter((e) => e.id !== id));
    } catch {
      alert('Failed to delete enrollment.');
    }
  }

  async function handleGradeSave(id) {
    try {
      await updateEnrollment(id, { grade: gradeValue || null });
      setEnrollments(enrollments.map((e) =>
        e.id === id ? { ...e, grade: gradeValue || null } : e
      ));
      setEditingGrade(null);
    } catch {
      alert('Failed to update grade.');
    }
  }

  if (loading) return <div className="page-loading">Loading enrollments...</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Enrollments</h2>
        <Link to="/enrollments/new" className="btn btn-primary">+ New Enrollment</Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {enrollments.length === 0 ? (
        <p className="empty-state">No enrollments found.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Course</th>
                <th>Enrolled At</th>
                <th>Grade</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((e) => (
                <tr key={e.id}>
                  <td>{e.studentName}</td>
                  <td>{e.courseTitle}</td>
                  <td>{new Date(e.enrolledAt).toLocaleDateString()}</td>
                  <td>
                    {editingGrade === e.id ? (
                      <div className="inline-edit">
                        <input
                          value={gradeValue}
                          onChange={(ev) => setGradeValue(ev.target.value)}
                          maxLength={5}
                          placeholder="A, B+, ..."
                          style={{ width: '70px' }}
                        />
                        <button className="btn btn-sm btn-primary" onClick={() => handleGradeSave(e.id)}>
                          Save
                        </button>
                        <button className="btn btn-sm btn-outline" onClick={() => setEditingGrade(null)}>
                          ✕
                        </button>
                      </div>
                    ) : (
                      <span
                        className={`grade-badge ${e.grade ? 'grade-set' : 'grade-none'}`}
                        onClick={() => {
                          if (role === 'Admin' || role === 'Instructor') {
                            setEditingGrade(e.id);
                            setGradeValue(e.grade || '');
                          }
                        }}
                        title={(role === 'Admin' || role === 'Instructor') ? 'Click to edit grade' : ''}
                      >
                        {e.grade || '—'}
                      </span>
                    )}
                  </td>
                  <td className="actions">
                    {role === 'Admin' && (
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(e.id)}
                      >
                        Remove
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
