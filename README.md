

# 🗂️ Task Management App
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://your-vercel-url.vercel.app/)

A full-featured task management application built using **React**, **Redux Toolkit**, **Material-UI**, and **Node.js/Express**. The app offers task tracking, a dashboard with charts, customizable table views, and column configurations.

---
## ✨ Features

### Table View
- Infinite scroll
- Search by title
- Filter by status (`All`, `Pending`, `Completed`, `Overdue`)
- Drag & drop to reorder visible columns
- Toggle column visibility
- Task detail drawer

### Dashboard View
- Date range selection for analytics
- Completed Tasks per Day (Bar Chart)
- Tasks Due per Day (Line Chart)
- Estimated Hours (Pie Chart)

### Redux Store
- Separation between table data and dashboard data
- Actions: `fetchTasks`, `fetchDashboardTasks`, `setSearchQuery`, `setSelectedStatus`
- Selectors: `selectFilteredTasks`, `selectDashboardTasks`, etc.

---

## 🚀 Live Demo

Visit the live application at: [https://task-management-uwu5.vercel.app](https://task-management-uwu5.vercel.app)

## 🔧 Tech Stack

### 🖥️ Client (Frontend)
- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Material-UI](https://mui.com/)
- [Recharts](https://recharts.org/)
- [DnD Kit](https://dndkit.com/) – for column drag and drop
- [React Infinite Scroll Component](https://www.npmjs.com/package/react-infinite-scroll-component)
- [React Router DOM](https://reactrouter.com/)
- [Date-fns](https://date-fns.org/)

### ⚙️ Server (Backend)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- CORS enabled
- JSON file as data source

---

## 📁 Project Structure
```bash
task-management-app-main/
├── client/                           # React Frontend
│   ├── .env                          # Environment variables
│   ├── public/                       # Static assets
│   ├── package.json                  # Project config and dependencies
│   └── src/
│       ├── components/               # UI Components
│       │   ├── DashboardView/        # Dashboard-related charts and views
│       │   ├── TableView/            # Task table, filters, modals
│       │   └── Header/               # App header with nav and theme switch
│       ├── hooks/                    # Reusable custom hooks
│       │   └── useInitApp.js         # Initializes data on app load
│       ├── store/                    # Redux Toolkit store and slices
│       │   └── dataSlice.js          # Main state management logic
│       ├── theme/                    # Theme definitions (MUI)
│       │   └── theme.js              # Light/Dark mode configs
│       ├── utils/                    # Utilities (filters, formatters, etc.)
│       │   ├── columnUtils.js        # LocalStorage for column config
│       │   └── dashboardUtils.js     # Data transformation for charts
│       ├── App.js                    # Main app component with routing
│       ├── index.js                  # Entry point
│       └── App.test.js               # Tests (if applicable)
│
├── server/                           # Node.js + Express Backend
│   ├── server.js                     # Express server
│   ├── mock_tasks.json               # Mock data (1000+ tasks)
│   └── package.json                  # Project config and dependencies
├── .gitignore                        # Git ignored files
└── README.md                         # Project documentation
```
---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/task-management-app.git
cd task-management-app-main
```

### 2. Start Backend Server
```bash
cd server
npm install
node server.js
```

### 3. Start Frontend Server
```bash
cd client
npm install
npm start
```

### 3. Environment File
Create a .env file inside client/:

REACT_APP_API_BASE_URL=http://localhost:8000/api
