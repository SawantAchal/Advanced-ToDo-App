import React from "react";

const TaskList = ({ tasks, onToggleTask, onToggleImportant, onTaskClick }) => (
  <div>
    {tasks.map((task) => (
      <div
        key={task.id}
        className="p-4 bg-white dark:bg-gray-800 rounded-lg mb-2 flex justify-between items-center"
      >
        <div>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleTask(task.id)}
            className="mr-2"
          />
          <button
            className={`${
              task.completed ? "line-through text-gray-500" : ""
            }`}
            onClick={() => onTaskClick(task)}
          >
            {task.title}
          </button>
        </div>
        <button
          onClick={() => onToggleImportant(task.id)}
          className={`ml-4 ${
            task.important ? "text-yellow-500" : "text-gray-500"
          }`}
        >
          ★
        </button>
      </div>
    ))}
  </div>
);

export default TaskList;
