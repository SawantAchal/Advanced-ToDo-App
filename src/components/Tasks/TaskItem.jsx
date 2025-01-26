import React from 'react';
import { FiStar } from 'react-icons/fi';

const TaskItem = ({ task, onToggle, onToggleImportant }) => {

  if (!task || typeof task !== 'object') {
    return null;
  }

  const { id, title, completed, important } = task;

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={completed || false}
          onChange={() => onToggle(id)}
          className="w-5 h-5 rounded-sm border-gray-300 text-primary focus:ring-primary"
        />
        
        <span className={completed ? 'line-through text-grayColor' : ''}>
          {String(title || '')}
        </span>
      </div>
      <button
        onClick={() => onToggleImportant(id)}
        className={`p-2 rounded-lg hover:bg-secondary ${
          important ? 'text-primary' : 'text-grayColor'
        }`}
      >
        <FiStar className="w-5 h-5" />
      </button>
    </div>
  );
};

export default TaskItem;