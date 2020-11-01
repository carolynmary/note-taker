const fs = require('fs');
const path = require("path");
const router = require("express").Router();
const util = require("util");
// const db = path.join(__dirname, "../db/db.json");
// const db = require("../db/db.json");
// const db = require(JSON.parse(path.join(__dirname, "../db/db.json")));

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// GET 
// ---------------------------------------------------------------------------
router.get("/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, notes) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err)
    }
    // console.log(JSON.parse(notes))
    return res.json(JSON.parse(notes));
  })
});

// POST 
// ---------------------------------------------------------------------------
router.post("/notes", async (req, res) => {
  let newNote = req.body;
  newNote.id = Date.now();
  let notes = await readFileAsync(path.join(__dirname, "../db/db.json"));
  let parsedNotes = JSON.parse(notes);
  fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify([...parsedNotes, newNote], null, 2), (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err)
    };
    res.json(true);
  });
});

// DELETE - filtered function not working
// ---------------------------------------------------------------------------
router.delete("/notes/:id", async (req, res) => {
  let queryNoteId = req.params.id
  console.log("query note to delete: " + queryNoteId);
  let notes = await readFileAsync(path.join(__dirname, "../db/db.json"));
  let parsedNotes = JSON.parse(notes);
  console.log(parsedNotes); // returns the correct array
  let filteredNotes = await parsedNotes.filter((note) => note.id !== queryNoteId);
  console.log(filteredNotes);  // returns the same as parsedNotes (2 lines above)
  fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(filteredNotes, null, 2), (err) => {
    console.log("inside writeFilteredNotes")
    if (err) {
      console.log(err);
      return res.status(500).json(err)
    };
    res.json(true);
  })
});

module.exports = router;

// function compareId (note) {
//   return note.id !== queryNoteId
// } 
// let filteredNotes = parsedNotes.filter(compareId);