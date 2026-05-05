import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStudent, createStudent, updateStudent } from '../../services/api';

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  dateOfBirth: '',
};

export default function StudentFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isEdit) {
      getStudent(id)
        .then((res) => {
          const s = res.data;
          setForm({
            firstName: s.firstName,
            lastName: s.lastName,
            email: s.email,
            dateOfBirth: s.dateOfBirth.split('T')[0],
          });
        })
        .catch(() => setError('Failed to load student.'))
        .finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);
    try {
      const payload = { ...form, dateOfBirth: new Date(form.dateOfBirth).toISOString() };
      if (isEdit) {
        await updateStudent(id, payload);
        setSuccess('Student updated successfully!');
      } else {
        await createStudent(payload);
        setSuccess('Student created successfully!');
        setForm(emptyForm);
      }
      setTimeout(() => navigate('/students'), 1000);
    } catch (err) {
      setError(err.response?.data || 'Failed to save student.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="page-loading">Loading...</div>;

  return (
    <div className="page-container form-page">
      <div className="page-header">
        <h2>{isEdit ? 'Edit Student' : 'New Student'}</h2>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                maxLength={50}
                placeholder="First name"
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                maxLength={50}
                placeholder="Last name"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              maxLength={100}
              placeholder="student@example.com"
            />
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={() => navigate('/students')}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : isEdit ? 'Update Student' : 'Create Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
