const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

let usersCollection;

async function init() {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db('CODEStudentTaskManager');
    usersCollection = database.collection('Users');
}

async function createUser(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword };
    await usersCollection.insertOne(newUser);
}

async function findUser(username) {
    return await usersCollection.findOne({ username });
}

module.exports = { init, createUser, findUser };