require('dotenv').config();
const express = require('express');
const morgan = require("morgan");
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const ensureAuthenticated = require('./middleware/auth'); // Ensure this file exists

const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'assets')));

// Session setup
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    function(username, password, done) {
        // Replace with your user authentication logic
        if (username === 'user' && password === 'pass') {
            return done(null, { id: 1, username: 'user' });
        } else {
            return done(null, false, { message: 'Incorrect credentials.' });
        }
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    // Replace with your user fetching logic
    done(null, { id: 1, username: 'user' });
});

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

// Routes
app.use(userRoutes);
app.use(taskRoutes);

// Static routes
app.get('/', (req, res) => res.render('index'));
app.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard'));
app.get('/new-list', ensureAuthenticated, (req, res) => res.render('new-list'));
app.get('/completed-tasks', ensureAuthenticated, (req, res) => res.render('completed-tasks'));
app.get('/settings', ensureAuthenticated, (req, res) => res.render('settings'));
app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = server;