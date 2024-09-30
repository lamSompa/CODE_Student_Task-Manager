const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Static route for home
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Static route for settings
app.get('/settings', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'settings.html'));
});

// Static route for login
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
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