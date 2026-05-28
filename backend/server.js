// ============================================================
// server.js — The main entry point for our Express backend
// This file creates the server and connects all the pieces
// ============================================================

const express = require('express');
const cors    = require('cors');

// Import our routes file (defines what URLs the server listens on)
const assignmentRoutes = require('./routes/assignments');

// Create the Express application
const app  = express();
const PORT = 3001; // Use 3001 so it doesn't clash with React (port 3000)

// ──────────────────────────────────────────────
// MIDDLEWARE
// Middleware runs on EVERY request before it reaches a route
// ──────────────────────────────────────────────

// cors() lets our React app (port 3000) call this server (port 3001)
// Without cors, browsers block cross-origin requests for security
app.use(cors());

// express.json() reads JSON from request bodies so we can access req.body
app.use(express.json());

// ──────────────────────────────────────────────
// ROUTES
// ──────────────────────────────────────────────

// Any URL that starts with /api/assignments is handled by our routes file
app.use('/api/assignments', assignmentRoutes);

// Root route — useful to confirm the server is alive
app.get('/', (req, res) => {
  res.json({ message: '📚 Student Assignment Manager API is running!' });
});

// ──────────────────────────────────────────────
// GLOBAL ERROR HANDLER
// If any route throws an error, this catches it and sends a safe response
// ──────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});

// ──────────────────────────────────────────────
// START THE SERVER
// ──────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n✅  Backend running → http://localhost:${PORT}`);
  console.log(`📋  Assignments API → http://localhost:${PORT}/api/assignments\n`);
});
