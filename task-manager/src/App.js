import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./Components/TaskList";
import TaskForm from "./Components/TaskForm";

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks on load
  useEffect(() => {
    axios.get("/api/tasks").then((response) => setTasks(response.data));
  }, []);

  // Add task
  const addTask = (task) => {
    axios.post("/api/tasks", task).then((response) => {
      setTasks([...tasks, response.data]);
    });
  };

  // Update task
  const updateTask = (updatedTask) => {
    axios.put(`/api/tasks/${updatedTask.id}`, updatedTask).then((response) => {
      setTasks(
        tasks.map((task) => (task.id === updatedTask.id ? response.data : task))
      );
    });
  };

  // Delete task
  const deleteTask = (id) => {
    axios.delete(`/api/tasks/${id}`).then(() => {
      setTasks(tasks.filter((task) => task.id !== id));
    });
  };

  return (
    <div className="container">
      <h1 className="my-4">Task Management System</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList
        tasks={tasks}
        onUpdateTask={updateTask}
        onDeleteTask={deleteTask}
      />
    </div>
  );
};

export default App;
