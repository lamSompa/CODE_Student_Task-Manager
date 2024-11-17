const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController');

// Registration route
router.post('/register', userController.register);

// Login route
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) { 
            console.log('Authentication failed:', info.message);
            return res.redirect('/login'); 
        }
        req.logIn(user, (err) => {
            if (err) { return next(err); }
            console.log('User is authenticated:', req.isAuthenticated());
            return res.redirect('/dashboard');
        });
    })(req, res, next);
});

module.exports = router;