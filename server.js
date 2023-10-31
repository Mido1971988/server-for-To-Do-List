const express = require("express");
const app = express();
const tasks = require("./initialTasksJson.json");
const cors = require("cors");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send(tasks);
});

app.post("/", (req, res) => {
  let jsonReq = JSON.stringify(req.body);
  fs.writeFileSync("./initialTasksJson.json", jsonReq, "utf8");
  res.header("Content-Type", "text/plain");
  res.send("Thnx For Tasks!");
});

// to read file sync
// const x = fs.readFile("./test.txt", "utf-8");
// console.log(x);

// to read File Async
// fs.readFile("./test.txt", "utf-8", (e, txt) => {
//   console.log(txt);
// });

// to read JSON File Async
// fs.readFile("./initialTasksJson.json", "utf-8", (e, txt) => {
//   console.log(JSON.parse(txt));
// });

// to read and write JSSON File
// fs.readFile("./test.json", "utf8", (e, txt) => {
//   fs.writeFileSync("./initialTasksJson.json", txt, "utf8");
// });

app.listen("3500", () => console.log("Server Running on Port 3500..."));
