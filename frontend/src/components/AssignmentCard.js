import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AssignmentCard.css';

function AssignmentCard({ assignment, onDelete, onStatusChange }) {
  const navigate = useNavigate();

  const formatDate = (dateStr) =>
    new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });

  const isOverdue = () => {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    return new Date(assignment.dueDate) < today && assignment.status !== 'Completed';
  };

  const isDueSoon = () => {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const due   = new Date(assignment.dueDate);
    const soon  = new Date(today); soon.setDate(today.getDate() + 3);
    return due >= today && due <= soon && assignment.status !== 'Completed';
  };

  const toggleStatus = () =>
    onStatusChange(assignment.id, assignment.status === 'Completed' ? 'Pending' : 'Completed');

  const handleDelete = () => {
    if (window.confirm(`Delete "${assignment.title}"?`)) onDelete(assignment.id);
  };

  const isComplete = assignment.status === 'Completed';

  return (
    <div className={`card ${isComplete ? 'card-done' : ''}`}>

      {/* Top row: title + priority dot */}
      <div className="card-top">
        <h3 className="card-title">{assignment.title}</h3>
        <span className={`dot dot-${assignment.priority.toLowerCase()}`} title={`${assignment.priority} priority`}></span>
      </div>

      {/* Subject */}
      <p className="card-subject">{assignment.subject}</p>

      {/* Description */}
      {assignment.description && (
        <p className="card-desc">{assignment.description}</p>
      )}

      {/* Meta row: due date + status */}
      <div className="card-meta">
        <span className={`card-date ${isOverdue() ? 'date-overdue' : isDueSoon() ? 'date-soon' : ''}`}>
          {isOverdue() ? 'Overdue · ' : isDueSoon() ? 'Due soon · ' : ''}
          {formatDate(assignment.dueDate)}
        </span>
        <span className={`status-tag ${isComplete ? 'tag-done' : 'tag-pending'}`}>
          {isComplete ? 'Completed' : 'Pending'}
        </span>
      </div>

      {/* Actions */}
      <div className="card-actions">
        <button className="action-btn" onClick={toggleStatus}>
          {isComplete ? 'Undo' : 'Mark done'}
        </button>
        <button className="action-btn" onClick={() => navigate(`/edit/${assignment.id}`)}>
          Edit
        </button>
        <button className="action-btn action-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>

    </div>
  );
}

export default AssignmentCard;
