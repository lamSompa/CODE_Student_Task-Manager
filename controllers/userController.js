const User = require('../models/User');
const bcrypt = require('bcryptjs');

async function register(req, res) {
    try {
        const { username, password } = req.body;
        const newUser = new User({ username, password });
        await newUser.save();
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(400).send('Error registering user: ' + error.message);
    }
}

async function login(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            res.redirect('/dashboard');
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Error logging in');
    }
}

module.exports = { register, login };