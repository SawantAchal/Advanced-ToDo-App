import React from "react";

const TaskGrid = ({ tasks, onToggleTask, onToggleImportant, onTaskClick }) => {
  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  const TaskCard = ({ task }) => (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg p-4 hover:shadow-md transition-shadow h-[120px] flex flex-col border border-gray-200 dark:border-gray-700"
    >
      <div className="flex justify-between items-start">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleTask(task.id)}
          className="w-5 h-5 rounded-sm border-gray-300 flex-shrink-0"
        />
        <button
          onClick={() => onToggleImportant(task.id)}
          className={`${
            task.important ? "text-yellow-500" : "text-gray-500"
          } hover:scale-110 transition-transform flex-shrink-0`}
        >
          ★
        </button>
      </div>
      
      <div className="flex-1 min-h-0 mt-2">
        <button
          className="w-full text-left hover:text-gray-700 dark:hover:text-gray-300"
          onClick={() => onTaskClick(task)}
        >
          <div 
            className={`line-clamp-2 text-sm ${
              task.completed ? "line-through text-gray-500" : ""
            }`}
            title={task.title}
          >
            {task.title}
          </div>
        </button>
      </div>
      
      {task.dueDate && (
        <div className="text-sm text-gray-500 mt-2 flex-shrink-0 truncate">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}
    </div>
  );

  const TaskListItem = ({ task }) => (
    <div
      className="p-4 bg-white dark:bg-gray-800 rounded-lg mb-2 flex justify-between items-center hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleTask(task.id)}
          className="w-5 h-5 rounded-sm border-gray-300"
        />
        <button
          className={`${
            task.completed ? "line-through text-gray-500" : ""
          } hover:text-gray-700 dark:hover:text-gray-300`}
          onClick={() => onTaskClick(task)}
        >
          {task.title}
        </button>
        {task.dueDate && (
          <span className="text-sm text-gray-500">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>
      <button
        onClick={() => onToggleImportant(task.id)}
        className={`ml-4 ${
          task.important ? "text-yellow-500" : "text-gray-500"
        } hover:scale-110 transition-transform`}
      >
        ★
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Incomplete Tasks Section in Grid */}
      <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300 sticky top-0 bg-gray-50 dark:bg-gray-900 py-2">
          Tasks ({incompleteTasks.length})
        </h2>
        <div className="h-[calc(100vh-600px)] overflow-y-auto pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {incompleteTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
            {incompleteTasks.length === 0 && (
              <div className="col-span-full text-center py-4 text-gray-500 dark:text-gray-400">
                No pending tasks
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Completed Tasks Section */}
      <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300 sticky top-0 bg-gray-50 dark:bg-gray-900 py-2">
          Completed ({completedTasks.length})
        </h2>
        <div className="h-[200px] overflow-y-auto pr-2">
          <div className="space-y-2 opacity-75">
            {completedTasks.map(task => (
              <TaskListItem key={task.id} task={task} />
            ))}
            {completedTasks.length === 0 && (
              <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                No completed tasks
              </div>
            )}
          </div>
        </div>
      </div>

      {/* No Tasks Message */}
      {tasks.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
          No tasks yet. Add your first task above!
        </div>
      )}
    </div>
  );
};

export default TaskGrid;