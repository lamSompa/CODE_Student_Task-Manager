const Task = require('../models/Task');

async function createTask(req, res) {
    try {
        const { title, description, badge } = req.body;
        const newTask = { title: title.trim(), description: description.trim(), badge };
        await Task.createTask(newTask);
        res.redirect('/my-lists');
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).send('Error creating task');
    }
}

async function getTasks(req, res) {
    try {
        const tasks = await Task.getTasks();
        res.render('my-lists', { tasks });
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        res.status(500).send('Error retrieving tasks');
    }
}

async function updateTask(req, res) {
    try {
        const updatedTask = {
            title: req.body.title,
            description: req.body.description,
            badge: req.body.badge
        };
        await Task.updateTask(req.params.id, updatedTask);
        res.redirect('/my-lists');
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).send('Error updating task');
    }
}

async function deleteTask(req, res) {
    try {
        await Task.deleteTask(req.params.id);
        res.redirect('/my-lists');
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).send('Error deleting task');
    }
}

module.exports = { createTask, getTasks, updateTask, deleteTask };