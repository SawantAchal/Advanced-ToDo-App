import React, { useState } from 'react';
import TaskList from '../Tasks/TaskList';
import TaskGrid from '../Tasks/TaskGrid';

const MainContent = ({ tasks, onToggleTask, onToggleImportant, onTaskClick }) => {
  const [isGridView, setIsGridView] = useState(false);

  return (
    <div className="p-6">
      {isGridView ? (
        <TaskGrid
          tasks={tasks}
          onToggleTask={onToggleTask}
          onToggleImportant={onToggleImportant}
          onTaskClick={onTaskClick}
        />
      ) : (
        <TaskList
          tasks={tasks}
          onToggleTask={onToggleTask}
          onToggleImportant={onToggleImportant}
          onTaskClick={onTaskClick}
        />
      )}
    </div>
  );
};

export default MainContent;