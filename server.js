const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Static files from the 'public' directory
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname)));

app.use(expressLayouts)

// Static route for index
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/dashboard', (req, res) => {
  res.render('index');
});

// Static route for Dashboard
app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

// Static route for My Lists
app.get('/my-lists', (req, res) => {
  res.render('my-lists');
});

// Static route for New List
app.get('/new-list', (req, res) => {
  res.render('new-list');
});

// Static route for Completed Tasks
app.get('/completed-tasks', (req, res) => {
  res.render('completed-tasks');
});

// Static route for settings
app.get('/settings', (req, res) => {
  res.render('settings');
});

// Static route for Login
app.get('/login', (req, res) => {
  res.render('login');
});

// Dynamic route example for tasks
app.get('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  res.send(`Task Details for Task ID: ${taskId}`);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});