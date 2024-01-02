const express = require("express");
const { join } = require("node:path");

const app = express();
const port = process.env.PORT ?? 4040;

app.use(express.static(join(__dirname, "public")));

app.get("/", (req, res) => {
  res.set("Content-Type", "text/html");
  res.sendFile(join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log("http://localhost:" + port);
});
