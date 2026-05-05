import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStudents, deleteStudent } from '../../services/api';

export default function StudentsListPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const role = localStorage.getItem('role');

  useEffect(() => {
    getStudents()
      .then((res) => setStudents(res.data))
      .catch(() => setError('Failed to load students.'))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id) {
    if (!window.confirm('Delete this student?')) return;
    try {
      await deleteStudent(id);
      setStudents(students.filter((s) => s.id !== id));
    } catch {
      alert('Failed to delete student.');
    }
  }

  if (loading) return <div className="page-loading">Loading students...</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Students</h2>
        {role === 'Admin' && (
          <Link to="/students/new" className="btn btn-primary">+ New Student</Link>
        )}
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {students.length === 0 ? (
        <p className="empty-state">No students found.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Date of Birth</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>{s.firstName} {s.lastName}</td>
                  <td>{s.email}</td>
                  <td>{new Date(s.dateOfBirth).toLocaleDateString()}</td>
                  <td className="actions">
                    {role === 'Admin' && (
                      <>
                        <Link to={`/students/${s.id}/edit`} className="btn btn-sm btn-outline">
                          Edit
                        </Link>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(s.id)}
                        >
                          Delete
                        </button>
                      </>
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
