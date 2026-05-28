import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const [assignments, setAssignments] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState('');

  useEffect(() => { fetchAssignments(); }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      setError('');
      const res  = await fetch('/api/assignments');
      if (!res.ok) throw new Error();
      const data = await res.json();
      setAssignments(data);
    } catch {
      setError('Could not load assignments. Make sure the backend is running on port 3001.');
    } finally {
      setLoading(false);
    }
  };

  // Stats
  const total     = assignments.length;
  const completed = assignments.filter(a => a.status === 'Completed').length;
  const pending   = assignments.filter(a => a.status === 'Pending').length;
  const pct       = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Upcoming: pending and due within 7 days, sorted soonest first
  const upcoming = assignments
    .filter(a => {
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const due   = new Date(a.dueDate);
      const in7   = new Date(today); in7.setDate(today.getDate() + 7);
      return due >= today && due <= in7 && a.status === 'Pending';
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  // Overdue: pending and past due date
  const overdue = assignments.filter(a => {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    return new Date(a.dueDate) < today && a.status === 'Pending';
  });

  const fmt = (d) =>
    new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });

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
      <div className="dash-hd">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Your assignment overview</p>
        </div>
        <Link to="/add" className="hd-btn">New assignment</Link>
      </div>

      {/* Stat cards */}
      <div className="stat-row">
        <div className="stat">
          <span className="stat-n">{total}</span>
          <span className="stat-l">Total</span>
        </div>
        <div className="stat">
          <span className="stat-n">{completed}</span>
          <span className="stat-l">Completed</span>
        </div>
        <div className="stat">
          <span className="stat-n">{pending}</span>
          <span className="stat-l">Pending</span>
        </div>
        <div className="stat">
          <span className="stat-n">{upcoming.length}</span>
          <span className="stat-l">Due this week</span>
        </div>
      </div>

      {/* Progress */}
      {total > 0 && (
        <div className="prog-wrap">
          <div className="prog-meta">
            <span>Progress</span>
            <span>{pct}%</span>
          </div>
          <div className="prog-track">
            <div className="prog-fill" style={{ width: `${pct}%` }}></div>
          </div>
        </div>
      )}

      {/* Two-column lists */}
      <div className="dash-cols">

        <div className="dash-panel">
          <h2 className="panel-title">Due this week</h2>
          {upcoming.length === 0
            ? <p className="panel-empty">Nothing due in the next 7 days.</p>
            : (
              <ul className="dl-list">
                {upcoming.map(a => (
                  <li key={a.id} className="dl-item">
                    <div>
                      <p className="dl-name">{a.title}</p>
                      <p className="dl-sub">{a.subject}</p>
                    </div>
                    <span className="dl-date">{fmt(a.dueDate)}</span>
                  </li>
                ))}
              </ul>
            )
          }
        </div>

        <div className="dash-panel">
          <h2 className="panel-title">Overdue</h2>
          {overdue.length === 0
            ? <p className="panel-empty">No overdue assignments.</p>
            : (
              <ul className="dl-list">
                {overdue.map(a => (
                  <li key={a.id} className="dl-item dl-overdue">
                    <div>
                      <p className="dl-name">{a.title}</p>
                      <p className="dl-sub">{a.subject}</p>
                    </div>
                    <span className="dl-date dl-date-red">{fmt(a.dueDate)}</span>
                  </li>
                ))}
              </ul>
            )
          }
        </div>

      </div>

      {/* Empty state */}
      {total === 0 && (
        <div className="empty-state">
          <h3>No assignments yet</h3>
          <p>Add your first assignment to get started.</p>
          <Link to="/add" className="hd-btn" style={{ marginTop: 12 }}>New assignment</Link>
        </div>
      )}

    </div>
  );
}

export default Dashboard;
