const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/tasks', taskController.createTask);
router.get('/my-lists', taskController.getTasks);
router.post('/tasks/:id/edit', taskController.updateTask);
router.post('/tasks/:id/delete', taskController.deleteTask);

module.exports = router;