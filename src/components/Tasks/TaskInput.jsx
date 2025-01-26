import React, { useState } from 'react';
import { FiBell, FiRepeat, FiCalendar } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { startOfToday } from 'date-fns';

const TaskInput = ({ onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      onAddTask({
        title: taskTitle,
        dueDate: dueDate ? dueDate.toISOString() : null
      });
      setTaskTitle('');
      setDueDate(null);
    }
  };

  const handleDateChange = (date) => {
    setDueDate(date);
    setShowCalendar(false);
  };

  return (
    <div className="bg-white dark:bg-green-200 p-4 rounded-lg shadow-sm border dark:border-gray-800">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Add A Task"
          className="w-full px-4 py-2 bg-secondary-light dark:bg-green-200 rounded-lg dark:text-black placeholder-gray-500"
        />
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-4">
            <button 
              type="button" 
              className="p-2 hover:bg-secondary-light dark:hover:bg-secondary-dark rounded-lg text-gray-600 dark:text-gray-800"
            >
              <FiBell className="w-5 h-5" />
            </button>
            <button 
              type="button" 
              className="p-2 hover:bg-secondary-light dark:hover:bg-secondary-dark rounded-lg text-gray-600 dark:text-gray-800"
            >
              <FiRepeat className="w-5 h-5" />
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowCalendar(!showCalendar)}
                className={`p-2 hover:bg-secondary-light dark:hover:bg-secondary-dark rounded-lg text-gray-600 dark:text-gray-800 
                  ${dueDate ? 'text-primary dark:text-primary' : ''}`}
              >
                <FiCalendar className="w-5 h-5" />
              </button>
              
              {showCalendar && (
                <div className="absolute z-50 mt-2">
                  <DatePicker
                    selected={dueDate}
                    onChange={handleDateChange}
                    minDate={startOfToday()}
                    inline
                    className="bg-white dark:bg-gray-800"
                    dateFormat="MMM d, yyyy"
                    placeholderText="Select due date"
                    popperClassName="dark:bg-gray-800"
                    calendarClassName="dark:bg-gray-800 dark:text-white border dark:border-gray-700"
                    dayClassName={date =>
                      date < startOfToday()
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-900 dark:text-white"
                    }
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {dueDate && (
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Due: {dueDate.toLocaleDateString()}
              </span>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              ADD TASK
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskInput;