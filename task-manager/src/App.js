import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./Components/TaskList";
import TaskForm from "./Components/TaskForm";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");
  const [editTaskDueDate, setEditTaskDueDate] = useState("");

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
      setIsEditing(false);
      setEditTaskId(null);
      setEditTaskText("");
      setEditTaskDueDate("");
    });
  };

  // Delete task
  const deleteTask = (id) => {
    axios.delete(`/api/tasks/${id}`).then(() => {
      setTasks(tasks.filter((task) => task.id !== id));
    });
  };

  // Handle edit task
  const handleEditTask = (task) => {
    setIsEditing(true);
    setEditTaskId(task.id);
    setEditTaskText(task.title);
    setEditTaskDueDate(task.dueDate);
  };

  // Handle form submission for both adding and editing
  const handleSubmit = (task) => {
    if (isEditing) {
      updateTask({ ...task, id: editTaskId });
    } else {
      addTask(task);
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Task Management System</h1>
      <TaskForm
        onAddTask={handleSubmit}
        isEditing={isEditing}
        editTaskText={editTaskText}
        setEditTaskText={setEditTaskText}
        editTaskDueDate={editTaskDueDate}
        setEditTaskDueDate={setEditTaskDueDate}
      />
      <TaskList
        tasks={tasks}
        onUpdateTask={updateTask}
        onDeleteTask={deleteTask}
        onEditTask={handleEditTask}
      />
    </div>
  );
};

export default App;
