const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});