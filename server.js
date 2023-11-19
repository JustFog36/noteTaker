const express = require('express');
const fs = require('fs-extra');
const notes = require('./db/db.json');
const path = require('path');
const uuid = require('uuid');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './db/db.json'))
}); 

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.listen(PORT, () => {
    console.log(`Application is running on http://localhost:${PORT}`);
});