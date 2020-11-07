const fs = require('fs');
const path = require("path");
const router = require("express").Router();

let allNotes;

// READ 
// ---------------------------------------------------------------------------
function read() {
  fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function (err, data) {
    if (err) {
      console.log(err);
      return res.status(500).json(err)
    }
    allNotes = JSON.parse(data);
  });
}
read();

// WRITE 
// ---------------------------------------------------------------------------
function write(notes) {
  fs.writeFile(path.join(__dirname, "../db/db.json"), notes, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err)
    };
    res.json(allNotes);
  })
}

// GET 
// ---------------------------------------------------------------------------
router.get("/notes", (req, res) => {
  res.json(allNotes)
});

// POST 
// ---------------------------------------------------------------------------
router.post("/notes", (req, res) => {
  let newNote = req.body;
  newNote.id = Date.now();
  allNotes.push(newNote);
  let stringifiedNotes = JSON.stringify(allNotes, null, 2)
  write(stringifiedNotes);
});

// DELETE 
// ---------------------------------------------------------------------------
router.delete("/notes/:id", (req, res) => {
  noteToDeleteID = JSON.parse(req.params.id);
  let filteredNotes = allNotes.filter(note => (note.id !== noteToDeleteID));
  let stringifiedNotes = JSON.stringify(filteredNotes, null, 2)
  write(stringifiedNotes);
  read()
});

module.exports = router;
