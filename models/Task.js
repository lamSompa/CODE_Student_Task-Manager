const { MongoClient, ObjectId } = require('mongodb');

let tasksCollection;

async function init() {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db('CODEStudentTaskManager');
    tasksCollection = database.collection('Tasks');
}

async function createTask(task) {
    return await tasksCollection.insertOne(task);
}

async function getTasks() {
    return await tasksCollection.find({}).toArray();
}

async function updateTask(id, updatedTask) {
    return await tasksCollection.updateOne({ _id: new ObjectId(id) }, { $set: updatedTask });
}

async function deleteTask(id) {
    return await tasksCollection.deleteOne({ _id: new ObjectId(id) });
}

module.exports = { init, createTask, getTasks, updateTask, deleteTask };