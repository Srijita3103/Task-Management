// import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => (
  <div className="mt-3">
    <h2>Tasks</h2>
    {tasks.map((task) => (
      <TaskItem
        key={task.id}
        task={task}
        onUpdateTask={onUpdateTask}
        onDeleteTask={onDeleteTask}
      />
    ))}
  </div>
);

export default TaskList;
