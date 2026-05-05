import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCourse, createCourse, updateCourse, getInstructors } from '../../services/api';

const emptyForm = {
  title: '',
  code: '',
  description: '',
  credits: 3,
  instructorId: '',
};

export default function CourseFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    getInstructors().then((res) => setInstructors(res.data));
    if (isEdit) {
      getCourse(id)
        .then((res) => {
          const c = res.data;
          setForm({
            title: c.title,
            code: c.code,
            description: c.description || '',
            credits: c.credits,
            instructorId: '',
          });
        })
        .catch(() => setError('Failed to load course.'))
        .finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'credits' || name === 'instructorId' ? Number(value) : value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);
    try {
      if (isEdit) {
        await updateCourse(id, form);
        setSuccess('Course updated successfully!');
      } else {
        await createCourse(form);
        setSuccess('Course created successfully!');
        setForm(emptyForm);
      }
      setTimeout(() => navigate('/courses'), 1000);
    } catch (err) {
      setError(err.response?.data || 'Failed to save course.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="page-loading">Loading...</div>;

  return (
    <div className="page-container form-page">
      <div className="page-header">
        <h2>{isEdit ? 'Edit Course' : 'New Course'}</h2>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                maxLength={100}
                placeholder="e.g. Introduction to Programming"
              />
            </div>
            <div className="form-group">
              <label>Code</label>
              <input
                name="code"
                value={form.code}
                onChange={handleChange}
                required
                maxLength={10}
                placeholder="e.g. CS101"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              maxLength={500}
              rows={3}
              placeholder="Course description (optional)"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Credits</label>
              <input
                type="number"
                name="credits"
                value={form.credits}
                onChange={handleChange}
                required
                min={1}
                max={6}
              />
            </div>
            <div className="form-group">
              <label>Instructor</label>
              <select name="instructorId" value={form.instructorId} onChange={handleChange} required>
                <option value="">-- Select Instructor --</option>
                {instructors.map((inst) => (
                  <option key={inst.id} value={inst.id}>
                    {inst.firstName} {inst.lastName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={() => navigate('/courses')}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : isEdit ? 'Update Course' : 'Create Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
