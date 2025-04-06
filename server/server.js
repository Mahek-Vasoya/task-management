const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.static(path.join(__dirname, '../client/build')));

// Load tasks from file
const tasksFilePath = path.join(__dirname, 'mock_tasks_1000.json');
let tasks = [];

try {
    const data = fs.readFileSync(tasksFilePath, 'utf-8');
    tasks = JSON.parse(data);
} catch (error) {
    console.error('Failed to load tasks:', error.message);
}

// API route
app.get('/api/tasks', (req, res) => {
    const { page, limit, from, to } = req.query;

    let filtered = [...tasks];

    // 🗓️ Optional: Filter by date range if provided
    if (from && to) {
        const fromDate = new Date(from);
        const toDate = new Date(to);
        filtered = filtered.filter(task => {
            const due = new Date(task.dueDate);
            return due >= fromDate && due <= toDate;
        });
    }

    // 📄 Paginate if `page` and `limit` provided
    if (page && limit) {
        const start = (parseInt(page) - 1) * parseInt(limit);
        const end = start + parseInt(limit);
        const paginated = filtered.slice(start, end);
        return res.json({ tasks: paginated, hasMore: end < filtered.length });
    }
    // 📊 If just date range, return full filtered result
    res.json({ tasks: filtered, hasMore: false });
});


// Serve React index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
