const path = require("path");
const router = require("express").Router();

router.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/notes.html"))
);

router.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/index.html"))
);

module.exports = router;

// var path = require("path");
// module.exports = function(app) {
//     app.get("/notes", function(req, res) {
//         res.sendFile(path.join(__dirname, "../public/notes.html"));
//     });
//     app.get("*", function(req, res) {
//         res.sendFile(path.join(__dirname, "../public/index.html"));
//     });
// }