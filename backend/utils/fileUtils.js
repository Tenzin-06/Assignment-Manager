// ============================================================
// fileUtils.js — Helper functions for reading/writing our
//                JSON "database" file (assignments.json)
//
// We use Node's built-in 'fs' (file system) module.
// No external database needed — just a plain JSON file!
// ============================================================

const fs   = require('fs');
const path = require('path');

// Build the absolute path to our data file
// __dirname is the folder where THIS file lives (utils/)
// We go one level up (..) then into data/assignments.json
const DATA_FILE = path.join(__dirname, '..', 'data', 'assignments.json');

// ──────────────────────────────────────────────
// READ — loads all assignments from the JSON file
// ──────────────────────────────────────────────
function readAssignments() {
  try {
    // If the file doesn't exist yet, return an empty array
    if (!fs.existsSync(DATA_FILE)) {
      return [];
    }

    // fs.readFileSync reads the whole file as a text string
    const raw = fs.readFileSync(DATA_FILE, 'utf8');

    // JSON.parse converts the JSON text back into a JS array
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading assignments file:', err.message);
    return []; // Return empty array so the app doesn't crash
  }
}

// ──────────────────────────────────────────────
// WRITE — saves the updated assignments array to disk
// ──────────────────────────────────────────────
function writeAssignments(assignments) {
  try {
    // JSON.stringify converts JS array → JSON text
    // The third argument (2) adds indentation so the file is human-readable
    const json = JSON.stringify(assignments, null, 2);

    // fs.writeFileSync writes the text to disk (overwrites existing content)
    fs.writeFileSync(DATA_FILE, json, 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing assignments file:', err.message);
    return false;
  }
}

// ──────────────────────────────────────────────
// GENERATE ID — creates a unique numeric ID for a new assignment
// Strategy: find the highest existing ID, then add 1
// ──────────────────────────────────────────────
function generateId(assignments) {
  if (assignments.length === 0) return 1;

  // Math.max(...array) finds the largest number in the array
  // We extract just the id from each assignment first
  const maxId = Math.max(...assignments.map(a => a.id));
  return maxId + 1;
}

// Export so other files can import these functions
module.exports = { readAssignments, writeAssignments, generateId };
