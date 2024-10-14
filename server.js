const fs = require('fs');

let rawdata = fs.readFileSync("data.json");
let data = JSON.parse(rawdata);
console.log(data)

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname)));
app.use(expressLayouts);

// Task data
const tasks = {
    1: { title: 'SE_19 Project', description: 'Prepare and submit the SE_19 project by Sep 17th.', badge: 'urgent' },
    2: { title: 'Task 2 Completion', description: 'Task 2 marked as completed 2 hours ago.', badge: 'completed' },
    3: { title: 'Profile Update', description: 'Profile updated 1 day ago.', badge: 'normal' },
    4: { title: 'New Task Addition', description: 'New task added: Task 4, 5 hours ago.', badge: 'normal' },
    5: { title: 'Task 3 Completion', description: 'Update git repo to include CSS styles', badge: 'completed' },
    6: { title: 'Settings Update', description: 'Settings updated 4 days ago.', badge: 'normal' },
    7: { title: 'Task 5 Addition', description: 'New task added: Task 5, 3 days ago.', badge: 'normal' },
    8: { title: 'Urgent Task Review', description: 'Review urgent tasks for upcoming deadlines.', badge: 'urgent' },
    9: { title: 'Feedback Collection', description: 'Collect feedback from team members.', badge: 'normal' },
    10: { title: 'GitHub Sync', description: 'Ensure all necessary commits are synced.', badge: 'normal' },
    11: { title: 'Storage Management', description: 'Free up storage on SSD after hand-in.', badge: 'normal' },
    12: { title: 'Responsiveness Check', description: 'Ensure all pages are responsive.', badge: 'normal' },
    13: { title: 'HTML Pages Review', description: 'Confirm HTML pages are linked correctly.', badge: 'normal' },
    14: { title: 'Team Meeting Plan', description: 'Plan for the upcoming team meeting.', badge: 'normal' }
};

// Dynamic route for tasks
app.get('/tasks/:id', (req, res) => {
    const task = tasks[req.params.id];
    if (task) {
        res.render('task', { task });
    } else {
        res.status(404).send('Task not found');
    }
});

// Static routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

app.get('/my-lists', (req, res) => {
    res.render('my-lists');
});

app.get('/new-list', (req, res) => {
    res.render('new-list');
});

app.get('/completed-tasks', (req, res) => {
    res.render('completed-tasks');
});

app.get('/settings', (req, res) => {
    res.render('settings');
});

app.get('/login', (req, res) => {
    res.render('login');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
