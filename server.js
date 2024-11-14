require('dotenv').config();
const express = require('express');
const morgan = require("morgan");
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(morgan("dev"));
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname)));
app.use(expressLayouts);

// Routes
app.use(userRoutes);
app.use(taskRoutes);

// Static routes
app.get('/', (req, res) => res.render('index'));
app.get('/dashboard', (req, res) => res.render('index'));
app.get('/new-list', (req, res) => res.render('new-list'));
app.get('/completed-tasks', (req, res) => res.render('completed-tasks'));
app.get('/settings', (req, res) => res.render('settings'));
app.get('/login', (req, res) => res.render('login'));

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = server;