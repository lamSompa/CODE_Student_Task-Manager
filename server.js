require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { MongoClient, ObjectId } = require('mongodb');
const { console } = require('inspector');
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
const uri = process.env.MONGODB_URI;
console.log('MongoDB URI:', uri); // Added console log to verify the URI
const client = new MongoClient(uri);

let tasksCollection;
let usersCollection;

// Connect to MongoDB and set up the collections
async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas!");

        const database = client.db('CODEStudentTaskManager');
        tasksCollection = database.collection('Tasks');
        usersCollection = database.collection('Users');
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

connectToDatabase().catch(console.error);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname)));
app.use(expressLayouts);

// User registration
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { username, password: hashedPassword };

        const newUserAccount = {
            username: req.body.username,
            password: hashedPassword,
        };
        await usersCollection.insertOne(newUserAccount);
        res.redirect('/dashboard');

        // await usersCollection.insertOne(newUser);
        // res.redirect('/login');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user');
    }
});

// User login
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await usersCollection.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            console.log("Sucess")
            res.redirect('/dashboard');
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Error logging in');
    }
});

// Create a new task
app.post('/tasks', async (req, res) => {
    try {
        const { title, description, badge } = req.body;

        // Validation checks
        if (!title || typeof title !== 'string' || title.trim().length === 0) {
            return res.status(400).send('Task title is required and cannot be empty.');
        }

        if (title.length > 2) {
            return res.status(400).send('Task title cannot exceed 100 characters.');
        }

        if (!description || typeof description !== 'string' || description.trim().length === 0) {
            return res.status(400).send('Task description is required and cannot be empty.');
        }

        if (description.length > 500) {
            return res.status(400).send('Task description cannot exceed 500 characters.');
        }

        // If validation passes, create the new task
        const newTask = {
            title: title.trim(),
            description: description.trim(),
            badge: badge // Assuming badge does not require validation
        };

        await tasksCollection.insertOne(newTask);
        res.redirect('/my-lists');
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).send('Error creating task');
    }
});

// Read all tasks
app.get('/my-lists', async (req, res) => {
    try {
        const tasks = await tasksCollection.find({}).toArray();
        res.render('my-lists', { tasks });
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        res.status(500).send('Error retrieving tasks');
    }
});

app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await tasksCollection.findOne({ _id: new ObjectId(req.params.id) });
        res.send(task);
    } catch (error) {
        console.log(error);
    }
});

// Update a task
app.post('/tasks/:id/edit', async (req, res) => {
    try {
        const updatedTask = {
            title: req.body.title,
            description: req.body.description,
            badge: req.body.badge
        };
        const result = await tasksCollection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: updatedTask });
        res.redirect('/my-lists');
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).send('Error updating task');
    }
});

// Delete a task
app.post('/tasks/:id/delete', async (req, res) => {
    try {
        const result = await tasksCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        res.redirect('/my-lists');
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).send('Error deleting task');
    }
});

// Static routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/dashboard', (req, res) => {
    res.render('index');
});

app.get('/new-list', (req, res) => {
    res.render('new-list');
});

app.get('/completed-tasks', (req, res) => {
    res.render('completed-tasks');
});

app.get('/settings', (req, res) => {
    res.render('settings');
});

app.get('/login', (req, res) => {
    res.render('login');
});

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = server;