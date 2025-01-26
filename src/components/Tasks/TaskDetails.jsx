import React, { useState } from 'react';
import { FiPlus, FiBell, FiCalendar, FiRepeat, FiX, FiTrash2 } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import { format, startOfToday } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask } from '../../redux/slices/taskSlice';

const TaskDetails = ({ task, onClose }) => {
  const dispatch = useDispatch();
  const [dueDate, setDueDate] = useState(task.dueDate ? new Date(task.dueDate) : null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [notes, setNotes] = useState(task.notes || '');

  const handleUpdateTask = (updates) => {
    // If updates contain a date, convert it to ISO string
    const serializedUpdates = {
      ...updates,
      dueDate: updates.dueDate ? updates.dueDate : null
    };
    
    dispatch(updateTask({ 
      id: task.id, 
      ...serializedUpdates 
    }));
  };


  const handleAddStep = () => {
    console.log('Add step clicked');
  };

  const handleSetReminder = () => {
    console.log('Set reminder clicked');
  };

  const handleDateChange = (date) => {
    setDueDate(date);
    handleUpdateTask({ 
      dueDate: date ? date.toISOString() : null 
    });
    setShowCalendar(false);
  };

  const handleRepeat = () => {
    console.log('Repeat clicked');
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    onClose();
  };

  return (
    <div className="w-96 border-l dark:border-gray-800 bg-white dark:bg-gray-800 h-screen overflow-y-auto">
      <div className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleUpdateTask({ completed: !task.completed })}
              className="w-5 h-5 rounded-sm border-gray-300"
            />
            <input
              type="text"
              value={task.title}
              onChange={(e) => handleUpdateTask({ title: e.target.value })}
              className="text-lg font-medium bg-transparent dark:text-white focus:outline-none"
            />
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-2 dark:text-white">
          <button
            onClick={handleAddStep}
            className="w-full flex items-center gap-2 px-4 py-2 text-left  hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <FiPlus className="w-5 h-5" />
            <span>Add Step</span>
          </button>

          <button
            onClick={handleSetReminder}
            className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <FiBell className="w-5 h-5" />
            <span>Set Reminder</span>
          </button>

          <div className="relative">
          <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        >
          <FiCalendar className="w-5 h-5" />
          <span>
            {dueDate 
              ? format(dueDate, 'MMM d, yyyy')
              : 'Add Due Date'
            }
          </span>
        </button>
            
            {showCalendar && (
              <div className="absolute z-50 mt-2">
                <DatePicker
                    selected={dueDate ? new Date(dueDate) : null}
                    onChange={handleDateChange}
                    minDate={startOfToday()}
                    inline
                    className="bg-white dark:bg-gray-800"
                    dateFormat="MMM d, yyyy"
                    placeholderText="Select due date"
                    popperClassName="dark:bg-gray-800"
                    calendarClassName="dark:bg-gray-800 dark:text-white"
                    dayClassName={date =>
                    date < startOfToday()
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-900 dark:text-white"
                    }
                />
              </div>
            )}
          </div>

          <button
            onClick={handleRepeat}
            className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <FiRepeat className="w-5 h-5" />
            <span>Repeat</span>
          </button>
        </div>

        <div className="flex-grow mt-4">
          <textarea
            placeholder="Add Notes"
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              handleUpdateTask({ notes: e.target.value });
            }}
            className="w-full h-32 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg resize-none focus:outline-none dark:text-white"
          />
        </div>

        <div className="mt-auto pt-4 flex justify-between items-center border-t dark:border-gray-800">
          <span className="text-sm text-gray-500">Created Today</span>
          <button
            onClick={handleDelete}
            className="text-gray-500 hover:text-red-600"
          >
            <FiTrash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;