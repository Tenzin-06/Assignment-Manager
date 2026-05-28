import React, { useState, useEffect } from 'react';
import { Link }       from 'react-router-dom';
import AssignmentCard from '../components/AssignmentCard';
import SearchFilter   from '../components/SearchFilter';
import './AssignmentList.css';

function AssignmentList() {
  const [assignments,    setAssignments]    = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [error,          setError]          = useState('');
  const [toast,          setToast]          = useState(null);

  const [searchTerm,     setSearchTerm]     = useState('');
  const [filterSubject,  setFilterSubject]  = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterStatus,   setFilterStatus]   = useState('');

  useEffect(() => { fetchAssignments(); }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      setError('');
      const res  = await fetch('/api/assignments');
      if (!res.ok) throw new Error();
      setAssignments(await res.json());
    } catch {
      setError('Failed to load assignments. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/assignments/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setAssignments(prev => prev.filter(a => a.id !== id));
      showToast('Assignment deleted.');
    } catch {
      showToast('Delete failed.', 'error');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/assignments/${id}`, {
        method:  'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setAssignments(prev => prev.map(a => a.id === id ? updated : a));
      showToast(`Marked as ${newStatus}.`);
    } catch {
      showToast('Update failed.', 'error');
    }
  };

  // Client-side filtering
  const filtered = assignments.filter(a => {
    const matchSearch   = !searchTerm    || a.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSubject  = !filterSubject  || a.subject  === filterSubject;
    const matchPriority = !filterPriority || a.priority === filterPriority;
    const matchStatus   = !filterStatus   || a.status   === filterStatus;
    return matchSearch && matchSubject && matchPriority && matchStatus;
  });

  const subjects = [...new Set(assignments.map(a => a.subject))].sort();

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

  if (error) {
    return (
      <div className="page-container">
        <div className="error-state">
          <p>{error}</p>
          <button className="retry-btn" onClick={fetchAssignments}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">

      {/* Header */}
      <div className="list-hd">
        <div>
          <h1 className="page-title">Assignments</h1>
          <p className="page-subtitle">
            {filtered.length === assignments.length
              ? `${total(assignments)} total`
              : `${filtered.length} of ${assignments.length} shown`}
          </p>
        </div>
        <Link to="/add" className="list-add-btn">New assignment</Link>
      </div>

      {/* Search + filters */}
      <SearchFilter
        searchTerm={searchTerm}         setSearchTerm={setSearchTerm}
        filterSubject={filterSubject}   setFilterSubject={setFilterSubject}
        filterPriority={filterPriority} setFilterPriority={setFilterPriority}
        filterStatus={filterStatus}     setFilterStatus={setFilterStatus}
        subjects={subjects}
      />

      {/* Cards or empty state */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <h3>No assignments found</h3>
          <p>
            {assignments.length === 0
              ? 'Add your first assignment to get started.'
              : 'Try a different search or filter.'}
          </p>
          {assignments.length === 0 && (
            <Link to="/add" className="list-add-btn" style={{ marginTop: 14 }}>
              New assignment
            </Link>
          )}
        </div>
      ) : (
        <div className="cards-grid">
          {filtered.map(a => (
            <AssignmentCard
              key={a.id}
              assignment={a}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`toast ${toast.type === 'error' ? 'error' : ''}`}>
          {toast.msg}
        </div>
      )}

    </div>
  );
}

// Small helper so we don't write assignments.length twice
function total(arr) { return arr.length; }

export default AssignmentList;
