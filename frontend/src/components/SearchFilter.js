import React from 'react';
import './SearchFilter.css';

function SearchFilter({
  searchTerm, setSearchTerm,
  filterSubject, setFilterSubject,
  filterPriority, setFilterPriority,
  filterStatus, setFilterStatus,
  subjects
}) {
  const clearAll = () => {
    setSearchTerm('');
    setFilterSubject('');
    setFilterPriority('');
    setFilterStatus('');
  };

  const anyActive = searchTerm || filterSubject || filterPriority || filterStatus;

  return (
    <div className="sf">

      {/* Search */}
      <div className="sf-search">
        <input
          type="text"
          className="sf-input"
          placeholder="Search by title…"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button className="sf-x" onClick={() => setSearchTerm('')}>✕</button>
        )}
      </div>

      {/* Filters */}
      <div className="sf-row">
        <select className="sf-select" value={filterSubject}  onChange={e => setFilterSubject(e.target.value)}>
          <option value="">All subjects</option>
          {subjects.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <select className="sf-select" value={filterPriority} onChange={e => setFilterPriority(e.target.value)}>
          <option value="">All priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select className="sf-select" value={filterStatus}   onChange={e => setFilterStatus(e.target.value)}>
          <option value="">All statuses</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        {anyActive && (
          <button className="sf-clear" onClick={clearAll}>Clear</button>
        )}
      </div>

    </div>
  );
}

export default SearchFilter;
