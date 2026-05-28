// ============================================================
// App.js — Root component that sets up client-side routing
//
// React Router v6 lets us switch pages WITHOUT a full browser
// refresh, making the app feel fast like a native app.
// ============================================================

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';

// Pages
import Dashboard      from './pages/Dashboard';
import AssignmentList from './pages/AssignmentList';
import AddAssignment  from './pages/AddAssignment';
import EditAssignment from './pages/EditAssignment';

import './App.css';

function App() {
  return (
    // BrowserRouter provides the routing context for the whole app
    <Router>

      {/* Navbar is rendered on EVERY page */}
      <Navbar />

      {/* main has top padding to avoid content hiding under the fixed navbar */}
      <main className="main-content">
        {/*
          Routes looks at the current URL and renders the matching component.
          Only ONE route renders at a time.
        */}
        <Routes>
          {/* Home / Dashboard */}
          <Route path="/"            element={<Dashboard />}      />

          {/* Full assignment list with search & filters */}
          <Route path="/assignments" element={<AssignmentList />}  />

          {/* Form to create a new assignment */}
          <Route path="/add"         element={<AddAssignment />}   />

          {/* Form to edit an existing assignment — :id is a dynamic segment */}
          <Route path="/edit/:id"    element={<EditAssignment />}  />
        </Routes>
      </main>

    </Router>
  );
}

export default App;
