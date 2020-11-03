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

// DELETE - filter function not working
// ---------------------------------------------------------------------------
router.delete("/notes/:id", (req, res) => {
  let noteToDeleteID = req.params.id
  console.log("note to delete id: " + noteToDeleteID);
  let notes = fs.readFile(path.join(__dirname, "../db/db.json"));
  let parsedNotes = JSON.parse(notes);
  // let notes = await JSON.parse(readFileAsync(path.join(__dirname, "../db/db.json"))); // try later
  console.log("PARSED: ", parsedNotes);

  return parsedNotes
    .then((notes) => notes.filter((note) => note.id !== noteToDeleteID))
    .then((filteredNotes) => write(filteredNotes))
  // console.log("FILTERED: ", filteredNotes);

  function write(notes) {
    fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes, null, 2), (err) => {
      console.log("inside writeFilteredNotes")
      if (err) {
        console.log(err);
        return res.status(500).json(err)
      };
      res.json(true);
    })
  }
});

module.exports = router;

// router.delete("/notes/:id", async (req, res) => {
//   let queryNoteId = req.params.id
//   console.log("query note to delete: " + queryNoteId);
//   let notes = await readFileAsync(path.join(__dirname, "../db/db.json"));
//   let parsedNotes = JSON.parse(notes);
//   // let notes = await readFileAsync(JSON.parse(path.join(__dirname, "../db/db.json")));
//   console.log(parsedNotes);

//   let filteredNotes = parsedNotes.filter((noteArrayItem) => filteredNotes(noteArrayItem.id !== queryNoteId));

//   console.log("FILTERED: ", filteredNotes);

//   fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(filteredNotes, null, 2), (err) => {
//     console.log("inside writeFilteredNotes")
//     if (err) {
//       console.log(err);
//       return res.status(500).json(err)
//     };
//     res.json(true);
//   })
// });



// let filteredNotes = parsedNotes.filter((noteArrayItem) => {
//   console.log("insideFilter noteArrayItem.id: " + noteArrayItem.id);
//   console.log("insideFilter queryNoteId: " + queryNoteId);
//   if (noteArrayItem.id === queryNoteId) { 
//     return false 
//   }
//   else { 
//     return true 
//   }
// });



// let filteredNotes = parsedNotes.filter((noteArrayItem) => filteredNotes(noteArrayItem.id !== queryNoteId));
// let filteredNotes = parsedNotes.filter((noteArrayItem) => noteArrayItem.id !== queryNoteId);




// AWAIT FILTER ----------------------------------------------------------------
// let filteredNotes = await parsedNotes.map((noteArrayItem) => {
//   if (noteArrayItem.id !== queryNoteId) {
//     return noteArrayItem;
//   }
// });


// FUNCTION THEN FILTER ----------------------------------------------------------------
// function compareId (note) {
//   return note.id !== queryNoteId
// } 
// let filteredNotes = parsedNotes.filter(compareId);



// FOR EACH ----------------------------------------------------------------
// let filteredNotes = [];
  // parsedNotes.forEach(function (noteArrayItem) {
  //   if ((parsedNotes.id).includes(queryNoteId)) {
  //     console.log(id)
  //   }
  //   else {
  //     filteredNotes.push(noteArrayItem); // add to a NEW array
  //   }
  // });


// FOR LOOP ----------------------------------------------------------------
// let filteredNotes = [];
  // function compareId() {
  //   for (let i = 0; i < parsedNotes.length; i++) {
  //     console.log(parsedNotes[i].id)
  //     if (parsedNotes[i].id === queryNoteId) {
  //       return
  //     }
  //     else {
  //       filteredNotes.push(parsedNotes[i])
  //     }
  //   }
  // };
  // compareId()


// FOR IN ----------------------------------------------------------------
// let filteredNotes = [];
  // for (const id in parsedNotes) {
  //   if (id === queryNoteId) {
  //     console.log(id)
  //   }
  //   else {
  //     filteredNotes.push(parsedNotes)
  //   }
  // }