const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

notes = [];
app.post("/api/notes", function (req, res) {
    jason = path.join(__dirname, "/db/db.json");
    newNote = req.body;
    function getJason() {
        fs.readFile(jason, "utf8", function (error, res) {
            if (error) {
                console.log(error);
            }
            notes = JSON.parse(response)
            writeJason();
        });
    } getJason()
    function writeJason() { 
        notes.push(newNote)
        for (let i = 0; i < notes.length; i++) {
            note = notes[i]
            note.id = i + 1
        } 
        fs.writeFile(jason, JSON.stringify(notes), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Your note has been entered and successfully saved.");
        });
    }
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.delete("/api/notes/:id", function (req, res) {
    res.send(req.body.id)
    const deletedId = (req.params.id);
    console.log(deletedId)
    jsonFile = path.join(__dirname, "/db/db.json");
    function getJason() {
        fs.readFile(jsonFile, "utf8", function (error, response) {
            if (error) {
                console.log(error);
            }
            notes = JSON.parse(response)
            deleteJason();
        });
    } getJason()
    function deleteJason() {
        notes.splice(id - 1, 1);
        writeFile();
    }
    function writeFile() {
        for (let i = 0; i < notes.length; i++) {
            note = notes[i]
            note.id = i + 1
        }
        fs.writeFile(jsonFile, JSON.stringify(notes), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("An update has been made to your notes.");
        });
    }
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });