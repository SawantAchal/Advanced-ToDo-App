import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from './Sidebar.jsx';
import TaskInput from '../Tasks/TaskInput.jsx';
import TaskList from '../Tasks/TaskList.jsx';
import TaskGrid from '../Tasks/TaskGrid.jsx'; 
import { addTask, toggleTask, toggleImportant } from '../../redux/slices/taskSlice.js';
import Navbar from './Navbar.jsx';
import TaskDetails from '../Tasks/TaskDetails.jsx';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isGridView, setIsGridView] = useState(false);
  const tasks = useSelector(state => state.tasks.tasks || []);
  const dispatch = useDispatch();

  const handleAddTask = (taskData) => {
    if (!taskData.title || typeof taskData.title !== 'string') return;
    
    const newTask = {
      id: Date.now().toString(),
      title: taskData.title.trim(),
      completed: false,
      important: false,
      dueDate: taskData.dueDate,
      notes: '',
      steps: []
    };
    dispatch(addTask(newTask));
  };

  const handleToggleTask = (taskId) => {
    if (taskId) {
      dispatch(toggleTask(taskId));
    }
  };

  const handleToggleImportant = (taskId) => {
    if (taskId) {
      dispatch(toggleImportant(taskId));
    }
  };

  const handleTaskClick = (task) => {
    const currentTask = tasks.find(t => t.id === task.id);
    setSelectedTask(currentTask);
  };

  const handleViewToggle = () => {
    setIsGridView(!isGridView);
  };

  return (
    <div className="flex flex-col h-screen bg-secondary-light dark:bg-gray-800">
      <Navbar 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
        isGridView={isGridView}
        onViewToggle={handleViewToggle}
      />
      
      <div className="flex flex-1 overflow-hidden"> {/* Added overflow-hidden here */}
        {sidebarOpen && (
          <Sidebar onClose={() => setSidebarOpen(false)} />
        )}
        
        <main className="flex-1 flex flex-col overflow-hidden"> {/* Updated main container */}
          <div className="flex-1 p-6 overflow-y-auto"> {/* Added flex-1 and overflow-y-auto */}
            <div className="max-w-3xl mx-auto h-full"> {/* Added h-full */}
              <TaskInput onAddTask={handleAddTask} />
              {Array.isArray(tasks) && (
                isGridView ? (
                  <TaskGrid
                    tasks={tasks}
                    onToggleTask={handleToggleTask}
                    onToggleImportant={handleToggleImportant}
                    onTaskClick={handleTaskClick}
                  />
                ) : (
                  <TaskList
                    tasks={tasks}
                    onToggleTask={handleToggleTask}
                    onToggleImportant={handleToggleImportant}
                    onTaskClick={handleTaskClick}
                  />
                )
              )}
            </div>
          </div>
        </main>

        {selectedTask && (
          <TaskDetails
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Layout;