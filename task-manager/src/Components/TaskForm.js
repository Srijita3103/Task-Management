import React, { useEffect } from "react";

const TaskForm = ({
  onAddTask,
  isEditing,
  editTaskText,
  setEditTaskText,
  editTaskDueDate,
  setEditTaskDueDate,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editTaskText.trim() === "" || editTaskDueDate.trim() === "") {
      return; // Prevent submission if inputs are empty
    }
    onAddTask({
      title: editTaskText,
      dueDate: editTaskDueDate,
      completed: false,
    });
    setEditTaskText("");
    setEditTaskDueDate("");
  };

  useEffect(() => {
    if (!isEditing) {
      setEditTaskText("");
      setEditTaskDueDate("");
    }
  }, [isEditing, setEditTaskText, setEditTaskDueDate]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          value={editTaskText}
          onChange={(e) => setEditTaskText(e.target.value)}
          placeholder={isEditing ? "Edit your task" : "Enter a new task"}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="date"
          value={editTaskDueDate}
          onChange={(e) => setEditTaskDueDate(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mt-2">
        {isEditing ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;

