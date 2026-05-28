# 📚 Student Assignment Manager

A beginner-friendly full-stack web app to track your school assignments.

## Tech Stack
| Layer    | Technology            |
|----------|-----------------------|
| Frontend | React 18 (JavaScript) |
| Backend  | Express.js (Node.js)  |
| Database | JSON file (no setup!) |
| Styling  | Plain CSS             |

---

## 🚀 How to Run

You need **two terminal windows** — one for the backend, one for the frontend.

### Terminal 1 — Start the Backend
```
cd backend
npm install       ← only needed the first time
npm run dev       ← starts server on http://localhost:3001
```

### Terminal 2 — Start the Frontend
```
cd frontend
npm install       ← only needed the first time
npm start         ← opens the app in your browser on http://localhost:3000
```

The React app automatically proxies `/api/...` requests to the backend on port 3001.

---

## 📁 Folder Structure

```
Assignment Manager/
│
├── backend/
│   ├── server.js                   ← Express app entry point
│   ├── routes/
│   │   └── assignments.js          ← Route definitions
│   ├── controllers/
│   │   └── assignmentController.js ← Business logic (CRUD)
│   ├── utils/
│   │   └── fileUtils.js            ← Read/write JSON file
│   └── data/
│       └── assignments.json        ← The "database"
│
└── frontend/
    ├── public/
    │   └── index.html
    └── src/
        ├── App.js                  ← Router setup
        ├── components/
        │   ├── Navbar.js/css       ← Top navigation bar
        │   ├── AssignmentCard.js/css  ← Single assignment card
        │   ├── AssignmentForm.js/css  ← Add/edit form (reused)
        │   └── SearchFilter.js/css   ← Search bar + dropdowns
        └── pages/
            ├── Dashboard.js/css    ← Stats, progress, deadlines
            ├── AssignmentList.js/css ← Full list with filtering
            ├── AddAssignment.js    ← Create new assignment
            └── EditAssignment.js  ← Edit existing assignment
```

---

## 🔌 API Endpoints

| Method | URL                       | Action                  |
|--------|---------------------------|-------------------------|
| GET    | /api/assignments          | Get all assignments     |
| POST   | /api/assignments          | Create new assignment   |
| PUT    | /api/assignments/:id      | Update an assignment    |
| DELETE | /api/assignments/:id      | Delete an assignment    |

---

## ✨ Features
- **Dashboard** with stats cards and progress bar
- **Add / Edit / Delete** assignments
- **Mark** assignments as Completed or Pending
- **Search** by title
- **Filter** by subject, priority, or status
- **Overdue** and **Due Soon** warnings on cards
- **Responsive** design (works on mobile)
- **Toast** notifications for actions
