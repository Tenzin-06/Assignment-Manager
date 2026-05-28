import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AssignmentForm from '../components/AssignmentForm';
import './FormPage.css';

function EditAssignment() {
  const { id }      = useParams();
  const navigate    = useNavigate();

  const [assignment, setAssignment] = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [saving,     setSaving]     = useState(false);
  const [error,      setError]      = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res  = await fetch('/api/assignments');
        if (!res.ok) throw new Error('Server error');
        const data = await res.json();
        const found = data.find(a => a.id === parseInt(id, 10));
        if (!found) throw new Error('Assignment not found');
        setAssignment(found);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      setSaving(true);
      setError('');
      const res = await fetch(`/api/assignments/${id}`, {
        method:  'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(formData)
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Update failed');
      }
      navigate('/assignments', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading…</p>
        </div>
      </div>
    );
  }

  if (error && !assignment) {
    return (
      <div className="page-container">
        <div className="error-state">
          <p>{error}</p>
          <Link to="/assignments" className="retry-btn">Back to assignments</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">

      <nav className="crumb">
        <Link to="/assignments">Assignments</Link>
        <span>/</span>
        <span>Edit</span>
      </nav>

      <h1 className="page-title">Edit assignment</h1>
      <p className="page-subtitle">Update the details below.</p>

      {error && <div className="form-error">{error}</div>}

      <div className="form-wrap">
        <AssignmentForm
          initialData={assignment}
          onSubmit={handleSubmit}
          isEditing={true}
          isLoading={saving}
        />
      </div>

    </div>
  );
}

export default EditAssignment;
