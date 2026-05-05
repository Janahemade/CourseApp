import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudents, getCourses, createEnrollment } from '../../services/api';

export default function EnrollmentCreatePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ studentId: '', courseId: '' });
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const role = localStorage.getItem('role');

  useEffect(() => {
    getCourses().then((res) => setCourses(res.data));
    if (role === 'Admin' || role === 'Instructor') {
      getStudents().then((res) => setStudents(res.data));
    }
  }, [role]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: Number(e.target.value) });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);
    try {
      await createEnrollment(form);
      setSuccess('Enrollment created successfully!');
      setTimeout(() => navigate('/enrollments'), 1000);
    } catch (err) {
      setError(err.response?.data || 'Failed to create enrollment.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="page-container form-page">
      <div className="page-header">
        <h2>New Enrollment</h2>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="card">
        <form onSubmit={handleSubmit}>
          {(role === 'Admin' || role === 'Instructor') && (
            <div className="form-group">
              <label>Student</label>
              <select name="studentId" value={form.studentId} onChange={handleChange} required>
                <option value="">-- Select Student --</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.firstName} {s.lastName} ({s.email})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group">
            <label>Course</label>
            <select name="courseId" value={form.courseId} onChange={handleChange} required>
              <option value="">-- Select Course --</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  [{c.code}] {c.title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={() => navigate('/enrollments')}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Enrolling...' : 'Enroll'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
