const express = require('express');
const ensureAuthenticated = require('../middleware/auth');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/tasks', ensureAuthenticated, taskController.createTask);
router.get('/my-lists', ensureAuthenticated, taskController.getTasks);
router.post('/tasks/:id/edit', ensureAuthenticated, taskController.updateTask);
router.post('/tasks/:id/delete', ensureAuthenticated, taskController.deleteTask);

module.exports = router;