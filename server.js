const express = require("express");
const path = require("path");
const app = express();

const rootDir = path.join(__dirname, "dist");

app.use(express.static(rootDir));

app.get("*", (req, res) => {
  res.sendFile(path.join(rootDir, "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
