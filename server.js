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

app.post('/api/notes', (req,res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json'));
    const newNotes = req.body;
    newNotes.id = uuid.v4();
    notes.push(newNotes);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(notes)
})

app.delete('/api/notes/:id', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json'));
    const deleteNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
    fs.writeFileSync('./db/db.json', JSON.stringify(deleteNote));
    res.json(deleteNote);
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.listen(PORT, () => {
    console.log(`Application is running on http://localhost:${PORT}`);
});