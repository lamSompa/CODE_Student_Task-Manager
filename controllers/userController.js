const User = require('../models/User');

async function register(req, res) {
    try {
        const { username, password } = req.body;
        await User.createUser(username, password);
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user');
    }
}

async function login(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findUser(username);
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