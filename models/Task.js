const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    description: { type: String, trim: true, minlength: 1, maxlength: 250 },
    badge: { type: String, enum: ['Urgent', 'Normal', 'Completed'], required: true }
});

module.exports = mongoose.model('task', taskSchema);