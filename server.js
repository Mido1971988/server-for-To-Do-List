const express = require("express");
const app = express();
const tasks = require("./tasks/tasks.json");
const listOfUsers = require("./listOfUsers/listOfUsers.json");
const cors = require("cors");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/tasks", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send(tasks);
});

app.get("/listOfUsers", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send(listOfUsers);
});

app.post("/tasks", (req, res) => {
  fs.readFile("./tasks/tasks.json", "utf8", (e, txt) => {
    let serverTasks = JSON.parse(txt);
    serverTasks.map((task) => {
      if (task[req.body[0]]) task[req.body[0]] = req.body[1];
    });
    fs.writeFileSync("./tasks/tasks.json", JSON.stringify(serverTasks), "utf8");
  });
  res.send(`Tasks For user ${req.body[0]} Saved`);
});

app.post("/listOfUsers", (req, res) => {
  let jsonReq = JSON.stringify(req.body);
  fs.writeFileSync("./tasks.json", jsonReq, "utf8");
  res.header("Content-Type", "text/plain");
  res.send("Thnx For Tasks!");
});

app.listen("3500", () => console.log("Server Running on Port 3500..."));
