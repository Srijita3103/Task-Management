const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

app.use(bodyParser.json());

// GET all tasks
app.get("/api/tasks", (req, res) => {
  const tasks = JSON.parse(fs.readFileSync("data.json"));
  res.json(tasks);
});

// POST a new task
app.post("/api/tasks", (req, res) => {
  const tasks = JSON.parse(fs.readFileSync("data.json"));
  const newTask = { id: tasks.length + 1, ...req.body };
  tasks.push(newTask);
  fs.writeFileSync("data.json", JSON.stringify(tasks));
  res.status(201).json(newTask);
});

// PUT to update a task
app.put("/api/tasks/:id", (req, res) => {
  const tasks = JSON.parse(fs.readFileSync("data.json"));
  const taskIndex = tasks.findIndex(
    (task) => task.id === parseInt(req.params.id)
  );
  if (taskIndex === -1) return res.status(404).send("Task not found");
  tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
  fs.writeFileSync("data.json", JSON.stringify(tasks));
  res.json(tasks[taskIndex]);
});

// DELETE a task
app.delete("/api/tasks/:id", (req, res) => {
  let tasks = JSON.parse(fs.readFileSync("data.json"));
  tasks = tasks.filter((task) => task.id !== parseInt(req.params.id));
  fs.writeFileSync("data.json", JSON.stringify(tasks));
  res.send("Task deleted");
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
