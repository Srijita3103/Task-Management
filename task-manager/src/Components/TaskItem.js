import React from "react";

const TaskItem = ({ task, onUpdateTask, onDeleteTask }) => (
  <div className="card my-2">
    <div className="card-body">
      <h5 className="card-title">{task.title}</h5>
      <p className="card-text">Due: {task.dueDate}</p>
      <button
        onClick={() => onUpdateTask({ ...task, completed: !task.completed })}
        className="btn btn-primary"
      >
        {task.completed ? "Mark Incomplete" : "Mark Complete"}
      </button>
      <button
        onClick={() => onDeleteTask(task.id)}
        className="btn btn-danger ml-2"
      >
        Delete
      </button>
    </div>
  </div>
);

export default TaskItem;
