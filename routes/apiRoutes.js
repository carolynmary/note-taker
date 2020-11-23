const fs = require('fs');
const path = require("path");
const router = require("express").Router();
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

let allNotes;

// GET 
router.get("/notes", (req, res) => {
  res.json(allNotes)
});

// POST 
router.post("/notes", (req, res) => {
  let newNote = req.body;
  newNote.id = Date.now();
  allNotes.push(newNote);
  let stringifiedNotes = JSON.stringify(allNotes, null, 2)
  write(stringifiedNotes);
  res.json(allNotes);  // - new
  read();
});

// DELETE
router.delete("/notes/:id", (req, res) => {
  noteToDeleteID = JSON.parse(req.params.id);
  let filteredNotes = allNotes.filter(note => (note.id !== noteToDeleteID));
  let stringifiedNotes = JSON.stringify(filteredNotes, null, 2)
  write(stringifiedNotes);
  res.json(allNotes);
  read()
});

// ===================================================================================================================
// FUNCTIONS
// ===================================================================================================================

// READ 
async function read() {
  await readFileAsync(path.join(__dirname, "../db/db.json"), "utf8", function (err, data) {
    if (err) {
      console.log(err);
      return res.status(500).json(err)
    }
    allNotes = JSON.parse(data);
  });
}
read();

// WRITE 
async function write(notes) {
  await writeFileAsync(path.join(__dirname, "../db/db.json"), notes, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err)
    };
    res.json(allNotes);
  })
}

module.exports = router;