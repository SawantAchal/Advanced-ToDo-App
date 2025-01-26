const TaskList = ({ tasks, onToggleTask, onToggleImportant, onTaskClick }) => {
  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  const TaskItem = ({ task }) => (
    <div
      className="p-4 bg-white dark:bg-gray-800 rounded-lg flex justify-between items-center hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleTask(task.id)}
          className="w-5 h-5 flex-shrink-0 rounded-sm border-gray-300"
        />
        <div className="flex-1 min-w-0">
          <button
            className={`${
              task.completed ? "line-through text-gray-500" : ""
            } hover:text-gray-700 dark:hover:text-gray-300 w-full text-left`}
            onClick={() => onTaskClick(task)}
          >
            <div className="truncate max-w-[300px]" title={task.title}>
              {task.title}
            </div>
          </button>
        </div>
        {task.dueDate && (
          <span className="text-sm text-gray-500 flex-shrink-0 ml-2">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>
      <button
        onClick={() => onToggleImportant(task.id)}
        className={`ml-4 flex-shrink-0 ${
          task.important ? "text-yellow-500" : "text-gray-500"
        } hover:scale-110 transition-transform`}
      >
        ★
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Incomplete Tasks Section */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300 sticky top-0">
          Tasks ({incompleteTasks.length})
        </h2>
        <div className="h-[300px] overflow-y-auto pr-2">
          <div className="space-y-3">
            {incompleteTasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
            {incompleteTasks.length === 0 && (
              <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                No pending tasks
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Completed Tasks Section */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300 sticky top-0">
          Completed ({completedTasks.length})
        </h2>
        <div className="h-[200px] overflow-y-auto pr-2">
          <div className="space-y-3 opacity-75">
            {completedTasks.map(task => (
              <TaskItem key={task.id} task={task} />
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
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No tasks yet. Add your first task above!
        </div>
      )}
    </div>
  );
};

export default TaskList;