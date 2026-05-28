import React, { useState } from 'react';
import './AssignmentForm.css';

function AssignmentForm({
  initialData = {},
  onSubmit,
  isEditing  = false,
  isLoading  = false
}) {
  const [title,       setTitle]       = useState(initialData.title       || '');
  const [subject,     setSubject]     = useState(initialData.subject     || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [dueDate,     setDueDate]     = useState(initialData.dueDate     || '');
  const [priority,    setPriority]    = useState(initialData.priority    || 'Medium');
  const [status,      setStatus]      = useState(initialData.status      || 'Pending');
  const [errors,      setErrors]      = useState({});

  const validate = () => {
    const e = {};
    if (!title.trim())             e.title   = 'Required';
    else if (title.trim().length < 3) e.title = 'At least 3 characters';
    if (!subject.trim())           e.subject  = 'Required';
    if (!dueDate)                  e.dueDate  = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ title: title.trim(), subject: subject.trim(), description: description.trim(), dueDate, priority, status });
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>

      <div className="field">
        <label className="label" htmlFor="f-title">Title <span className="req">*</span></label>
        <input
          id="f-title" type="text"
          className={`input ${errors.title ? 'input-err' : ''}`}
          placeholder="e.g. Math Homework Ch. 5"
          value={title} onChange={e => setTitle(e.target.value)}
          disabled={isLoading}
        />
        {errors.title && <span className="err-msg">{errors.title}</span>}
      </div>

      <div className="field">
        <label className="label" htmlFor="f-subject">Subject <span className="req">*</span></label>
        <input
          id="f-subject" type="text"
          className={`input ${errors.subject ? 'input-err' : ''}`}
          placeholder="e.g. Mathematics"
          value={subject} onChange={e => setSubject(e.target.value)}
          disabled={isLoading}
        />
        {errors.subject && <span className="err-msg">{errors.subject}</span>}
      </div>

      <div className="field">
        <label className="label" htmlFor="f-desc">
          Description <span className="opt">optional</span>
        </label>
        <textarea
          id="f-desc"
          className="input textarea"
          placeholder="Add notes or details…"
          value={description} onChange={e => setDescription(e.target.value)}
          rows={3} disabled={isLoading}
        />
      </div>

      <div className="field">
        <label className="label" htmlFor="f-date">Due date <span className="req">*</span></label>
        <input
          id="f-date" type="date"
          className={`input ${errors.dueDate ? 'input-err' : ''}`}
          value={dueDate} onChange={e => setDueDate(e.target.value)}
          disabled={isLoading}
        />
        {errors.dueDate && <span className="err-msg">{errors.dueDate}</span>}
      </div>

      <div className="field-row">
        <div className="field">
          <label className="label" htmlFor="f-priority">Priority</label>
          <select id="f-priority" className="input" value={priority} onChange={e => setPriority(e.target.value)} disabled={isLoading}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="field">
          <label className="label" htmlFor="f-status">Status</label>
          <select id="f-status" className="input" value={status} onChange={e => setStatus(e.target.value)} disabled={isLoading}>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <button type="submit" className="submit-btn" disabled={isLoading}>
        {isLoading ? 'Saving…' : isEditing ? 'Save changes' : 'Add assignment'}
      </button>

    </form>
  );
}

export default AssignmentForm;
