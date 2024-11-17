const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register user
exports.register = async (req, res) => {
    console.log('Received CSRF Token:', req.body._csrf); // Log the received token
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser  = new User({ username, email, password: hashedPassword });
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
exports.login = (req, res) => {
    res.redirect('/dashboard');
};

// Handle CSRF token validation
exports.handleCsrf = (req, res, next) => {
    console.log('Received CSRF Token:', req.body._csrf); // Log the received token
    next();
};