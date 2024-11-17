const Task = require('../models/Task');

async function createTask(req, res) {
    try {
        console.log('Submitted data:', req.body); // Log submitted data
        const { title, description, badge } = req.body;

        // Server-side validation
        if (!/^[A-Za-z\s]+$/.test(title.trim()) || !/^[A-Za-z\s]+$/.test(description.trim())) {
            return res.status(400).send('Title and description must contain only letters and spaces.');
        }

        const newTask = new Task({ 
            title, 
            description, 
            badge,
            userId: req.user._id // Associate task with the logged-in user
        });
        await newTask.save();
        res.redirect('/my-lists');
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(400).send('Error creating task: ' + error.message);
    }
}

async function getTasks(req, res) {
    try {
        const tasks = await Task.find({ userId: req.user._id }); // Fetch tasks for the logged-in user
        res.render('my-lists', { tasks });
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        res.status(500).send('Error retrieving tasks');
    }
}

async function updateTask(req, res) {
    try {
        console.log('Update data:', req.body); // Log update data
        const { title, description, badge } = req.body;

        // Server-side validation
        if (!/^[A-Za-z\s]+$/.test(title.trim()) || !/^[A-Za-z\s]+$/.test(description.trim())) {
            return res.status(400).send('Title and description must contain only letters and spaces.');
        }

        await Task.findByIdAndUpdate(req.params.id, { title, description, badge });
        res.redirect('/my-lists');
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(400).send('Error updating task: ' + error.message);
    }
}

async function deleteTask(req, res) {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.redirect('/my-lists');
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).send('Error deleting task');
    }
}

module.exports = { createTask, getTasks, updateTask, deleteTask };