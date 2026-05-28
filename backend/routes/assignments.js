// ============================================================
// routes/assignments.js — Maps HTTP methods + paths to controller functions
//
// A "route" connects:   URL  +  HTTP verb  →  controller function
// Example:              /    +  GET        →  getAllAssignments()
// ============================================================

const express = require('express');
const router  = express.Router(); // Mini Express app just for these routes

const {
  getAllAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment
} = require('../controllers/assignmentController');

// GET    /api/assignments       — fetch all assignments
router.get('/',    getAllAssignments);

// POST   /api/assignments       — create a new assignment
router.post('/',   createAssignment);

// PUT    /api/assignments/:id   — update assignment with given id
// :id is a URL parameter; Express puts its value in req.params.id
router.put('/:id', updateAssignment);

// DELETE /api/assignments/:id   — delete assignment with given id
router.delete('/:id', deleteAssignment);

module.exports = router;
