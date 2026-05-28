// ============================================================
// assignmentController.js — Business logic for each API endpoint
//
// A "controller" is just a function that reads the request,
// does something with the data, and sends back a response.
// Keeping logic here (instead of in routes/) keeps code clean.
// ============================================================

const { readAssignments, writeAssignments, generateId } = require('../utils/fileUtils');

// ──────────────────────────────────────────────
// GET /api/assignments
// Returns every assignment in the JSON file
// ──────────────────────────────────────────────
function getAllAssignments(req, res) {
  try {
    const assignments = readAssignments();
    res.json(assignments); // 200 OK by default
  } catch (err) {
    res.status(500).json({ error: 'Failed to load assignments.' });
  }
}

// ──────────────────────────────────────────────
// POST /api/assignments
// Adds a new assignment and saves it
// ──────────────────────────────────────────────
function createAssignment(req, res) {
  try {
    // req.body is the JSON object sent from the React form
    const { title, subject, description, dueDate, priority, status } = req.body;

    // Basic server-side validation
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title is required.' });
    }
    if (!subject || !subject.trim()) {
      return res.status(400).json({ error: 'Subject is required.' });
    }
    if (!dueDate) {
      return res.status(400).json({ error: 'Due date is required.' });
    }

    // Load current assignments
    const assignments = readAssignments();

    // Build the new assignment object
    const newAssignment = {
      id:          generateId(assignments),
      title:       title.trim(),
      subject:     subject.trim(),
      description: description ? description.trim() : '',
      dueDate,
      priority:    priority  || 'Medium',  // default if not provided
      status:      status    || 'Pending'  // default if not provided
    };

    assignments.push(newAssignment);
    writeAssignments(assignments);

    // 201 Created — standard HTTP code for "resource was created"
    res.status(201).json(newAssignment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create assignment.' });
  }
}

// ──────────────────────────────────────────────
// PUT /api/assignments/:id
// Replaces an existing assignment's fields
// ──────────────────────────────────────────────
function updateAssignment(req, res) {
  try {
    // req.params.id comes from the URL  e.g. /api/assignments/3  →  id = "3"
    // We parse it to a number because JSON stores ids as numbers
    const id = parseInt(req.params.id, 10);

    const { title, subject, description, dueDate, priority, status } = req.body;

    const assignments = readAssignments();

    // findIndex returns -1 if no match
    const idx = assignments.findIndex(a => a.id === id);
    if (idx === -1) {
      return res.status(404).json({ error: 'Assignment not found.' });
    }

    // Spread the old assignment first, then overwrite with new values.
    // This means any field NOT sent in the body keeps its old value.
    assignments[idx] = {
      ...assignments[idx],
      title:       title       !== undefined ? title.trim()       : assignments[idx].title,
      subject:     subject     !== undefined ? subject.trim()     : assignments[idx].subject,
      description: description !== undefined ? description.trim() : assignments[idx].description,
      dueDate:     dueDate     !== undefined ? dueDate            : assignments[idx].dueDate,
      priority:    priority    !== undefined ? priority           : assignments[idx].priority,
      status:      status      !== undefined ? status             : assignments[idx].status
    };

    writeAssignments(assignments);
    res.json(assignments[idx]); // Send back the updated assignment
  } catch (err) {
    res.status(500).json({ error: 'Failed to update assignment.' });
  }
}

// ──────────────────────────────────────────────
// DELETE /api/assignments/:id
// Removes an assignment from the JSON file
// ──────────────────────────────────────────────
function deleteAssignment(req, res) {
  try {
    const id = parseInt(req.params.id, 10);

    const assignments = readAssignments();

    // Check it exists before trying to delete
    const exists = assignments.some(a => a.id === id);
    if (!exists) {
      return res.status(404).json({ error: 'Assignment not found.' });
    }

    // filter() keeps every assignment EXCEPT the one we want to delete
    const updated = assignments.filter(a => a.id !== id);
    writeAssignments(updated);

    res.json({ message: 'Assignment deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete assignment.' });
  }
}

module.exports = { getAllAssignments, createAssignment, updateAssignment, deleteAssignment };
