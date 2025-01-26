import React, { useEffect, useState } from 'react';
import { FiPlus, FiBell, FiCalendar, FiRepeat, FiX, FiTrash2, FiStar } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import { format, startOfToday } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import { updateTask, deleteTask, toggleTask, toggleImportant } from '../../redux/slices/taskSlice';

const TaskDetails = ({ task, onClose }) => {
  const dispatch = useDispatch();
  const currentTask = useSelector(state => 
    state.tasks.tasks.find(t => t.id === task.id)
  );

  const [dueDate, setDueDate] = useState(task.dueDate ? new Date(task.dueDate) : null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [notes, setNotes] = useState(task.notes || '');
  const [title, setTitle] = useState(task.title);

  useEffect(() => {
    setDueDate(currentTask.dueDate ? new Date(currentTask.dueDate) : null);
    setNotes(currentTask.notes || '');
    setTitle(currentTask.title);
  }, [currentTask]);

  const handleUpdateTask = (updates) => {
    const serializedUpdates = {
      ...updates,
      dueDate: updates.dueDate ? updates.dueDate : null
    };
    
    dispatch(updateTask({ 
      id: currentTask.id, 
      ...serializedUpdates 
    }));
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    handleUpdateTask({ title: newTitle });
  };

  const handleToggleCompleted = () => {
    dispatch(toggleTask(currentTask.id));
  };

  const handleToggleImportant = () => {
    dispatch(toggleImportant(currentTask.id));
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
          <div className="flex items-center gap-3 flex-1">
          <input
              type="checkbox"
              checked={currentTask.completed}
              onChange={handleToggleCompleted}
              className="w-5 h-5 rounded-sm border-gray-300 mt-1"
            />
            <div className="flex-1 min-w-0"> 
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="text-lg font-medium bg-transparent dark:text-white focus:outline-none w-full break-words"
            placeholder="Task title"
            style={{ 
              wordWrap: 'break-word',
              height: 'auto',
              minHeight: '28px'
            }}
          />
        </div>
        <button
          onClick={handleToggleImportant}
          className={`ml-2 transition-colors flex-shrink-0 mt-1 ${
            currentTask.important ? 'text-yellow-500' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <FiStar 
            className="w-5 h-5" 
            fill={currentTask.important ? 'currentColor' : 'none'} 
          />
        </button>
          </div>
          
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
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX className="w-6 h-6" />
          </button>
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