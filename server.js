const fs = require('fs');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
const uri = "mongodb+srv://abeikusompanyarkolartey:Iam.$ompa.0110.@codestudenttaskmanagerc.9zdpi.mongodb.net/?retryWrites=true&w=majority&appName=CODEStudentTaskManagerCluster";
const client = new MongoClient(uri);

let tasksCollection;

// Connect to MongoDB and set up the tasks collection
async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas!");

        const database = client.db('CODEStudentTaskManager');
        tasksCollection = database.collection('Tasks');
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

// Create a new task
app.post('/tasks', async (req, res) => {
    try {
        const newTask = {
            title: req.body.title,
            description: req.body.description,
            badge: req.body.badge
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

// Update a task
app.post('/tasks/:id/edit', async (req, res) => {
    try {
        console.log(`Editing task with ID: ${req.params.id}`);
        const updatedTask = {
            title: req.body.title,
            description: req.body.description,
            badge: req.body.badge
        };
        const result = await tasksCollection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: updatedTask });
        console.log('Update result:', result);
        res.redirect('/my-lists');
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).send('Error updating task');
    }
});

// Delete a task
app.post('/tasks/:id/delete', async (req, res) => {
    try {
        console.log(`Deleting task with ID: ${req.params.id}`);
        const result = await tasksCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        console.log('Delete result:', result);
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
    res.render('index'); // Render 'index' for dashboard
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
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});