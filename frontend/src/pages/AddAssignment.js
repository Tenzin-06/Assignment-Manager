import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AssignmentForm from '../components/AssignmentForm';
import './FormPage.css';

function AddAssignment() {
  const navigate  = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/assignments', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(formData)
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create assignment');
      }
      navigate('/assignments', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">

      <nav className="crumb">
        <Link to="/assignments">Assignments</Link>
        <span>/</span>
        <span>New</span>
      </nav>

      <h1 className="page-title">New assignment</h1>
      <p className="page-subtitle">Fill in the details below.</p>

      {error && <div className="form-error">{error}</div>}

      <div className="form-wrap">
        <AssignmentForm onSubmit={handleSubmit} isEditing={false} isLoading={loading} />
      </div>

    </div>
  );
}

export default AddAssignment;
