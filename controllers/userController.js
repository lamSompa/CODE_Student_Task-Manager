const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Register user
exports.register = async (req, res) => {
    console.log('Received CSRF Token:', req.body._csrf); // Log the received token
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.render('register', { messages: { error: 'Username already exists.' } });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        // Automatically log in the user after registration
        req.logIn(newUser, (err) => {
            if (err) {
                console.error('Error logging in after registration:', err);
                return res.render('register', { messages: { error: 'Registration succeeded, but login failed. Please try logging in.' } });
            }
            res.redirect('/dashboard');
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.render('register', { messages: { error: 'Registration failed. Please try again.' } });
    }
};

// Login user
exports.login = (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
        console.log('Authentication attempt:', { err, user, info }); // Add logging
        if (err) {
            console.error('Error during login:', err);
            return next(err);
        }
        if (!user) {
            return res.render('login', { messages: { error: info.message } });
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error('Error logging in:', err);
                return res.render('login', { messages: { error: 'Login failed. Please try again.' } });
            }
            res.redirect('/dashboard');
        });
    })(req, res, next);
};

// Handle CSRF token validation
exports.handleCsrf = (req, res, next) => {
    console.log('Received CSRF Token:', req.body._csrf); // Log the received token
    next();
};