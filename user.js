const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const url = "mongodb://localhost:27017";

app.post("/userssearch", async function(req, res) {
    try {
        const Email = req.body.email;
        const Password1 = req.body.password;

        const client = new MongoClient(url);
        await client.connect();
        const db = client.db("E-Commerce");
        
        const query = { Mail: Email, password: Password1 };

        const collection = db.collection('users');
        const response = await collection.find(query).toArray();

        if (response.length === 0) {
            throw new Error("No User Found");
        }

        res.send("<h1>Hello</h1>");
    } catch (error) {
        console.error("Error:", error);
        res.status(404).json({ error: "User not found" });
    } 
});

app.post("/usersinsert", async function(req, res) {
    try {
        const { username, email, password } = req.body;

        const client = new MongoClient(url);
        await client.connect();
        const db = client.db("E-Commerce");
            
        const document = { name: username, Mail: email, password: password };
    
        const collection = db.collection('users');
        const result = await collection.insertOne(document);
    
        if (result.insertedCount === 0) {
           throw new Error("Failed to insert data.");
        }
    
        res.json({ message: "Data Inserted successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to insert data" });
    } 
});

app.listen(8000, function() {
    console.log("Server is running on port number 8000");
});