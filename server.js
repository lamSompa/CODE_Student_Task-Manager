require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const ensureAuthenticated = require('./middleware/auth');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const csrf = require('csurf');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

// Security middleware
app.use(helmet());

// Serve static files from 'assets' directory
app.use(express.static(path.join(__dirname, 'assets')));

// Session setup with MongoDB store
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: { secure: false } // Set to true if using HTTPS
}));

// CSRF protection
const csrfProtection = csrf();
app.use(csrfProtection);

// Flash setup
app.use(flash());

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    { usernameField: 'identifier' },
    async function(identifier, password, done) {
        try {
            const isEmail = identifier.includes('@');
            const user = isEmail 
                ? await User.findOne({ email: identifier })
                : await User.findOne({ username: identifier });

            if (!user) {
                return done(null, false, { message: 'Incorrect credentials.' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return done(null, false, { message: 'Incorrect credentials.' });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

passport.serializeUser ((user, done) => done(null, user.id));
passport.deserializeUser (async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

// Pass authentication status and CSRF token to views
app.use((req, res, next) => {
    const token = req.csrfToken();
    console.log('Generated CSRF Token:', token); // Log token
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.csrfToken = token;
    next();
});

// Routes
app.use(userRoutes);
app.use(taskRoutes);

// Login route
app.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard', // Redirect to dashboard on successful login
    failureRedirect: '/login', // Redirect back to login on failure
    failureFlash: true
}));

// Static routes
app.get('/', (req, res) => res.render('index'));
app.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard'));
app.get('/new-list', ensureAuthenticated, (req, res) => res.render('new-list'));
app.get('/completed-tasks', ensureAuthenticated, (req, res) => res.render('completed-tasks'));
app.get('/settings', ensureAuthenticated, (req, res) => res.render('settings'));
app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));

// Logout route
app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.redirect('/dashboard');
        }
        res.redirect('/login');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});