import React, { useState } from 'react';
import { FiBell, FiRepeat, FiCalendar } from 'react-icons/fi';

const TaskInput = ({ onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      onAddTask(taskTitle);
      setTaskTitle('');
    }
  };

  return (
    <div className="bg-white dark:bg-darkBg p-4 rounded-lg shadow-sm border dark:border-gray-800">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Add A Task"
          className="w-full px-4 py-2 bg-secondary-light dark:bg-secondary-dark rounded-lg dark:text-white placeholder-gray-500"
        />
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-4">
            <button type="button" className="p-2 hover:bg-secondary-light dark:hover:bg-secondary-dark rounded-lg dark:text-gray-800 text-white">
              <FiBell className="w-5 h-5" />
            </button>
            <button type="button" className="p-2 hover:bg-secondary-light dark:hover:bg-secondary-dark rounded-lg dark:text-gray-800 text-white">
              <FiRepeat className="w-5 h-5" />
            </button>
            <button type="button" className="p-2 hover:bg-secondary-light dark:hover:bg-secondary-dark rounded-lg dark:text-gray-800 text-white">
              <FiCalendar className="w-5 h-5" />
            </button>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white bg-gray-800 rounded-lg hover:bg-primary/90"
          >
            ADD TASK
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskInput;