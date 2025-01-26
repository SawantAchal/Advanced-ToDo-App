import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from './Sidebar.jsx';
import TaskInput from '../Tasks/TaskInput.jsx';
import TaskList from '../Tasks/TaskList.jsx';
import { addTask, toggleTask, toggleImportant } from '../../redux/slices/taskSlice.js';
import Navbar from './Navbar.jsx';
import TaskDetails from '../Tasks/TaskDetails.jsx';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
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

  return (
    <div className="flex flex-col h-screen bg-secondary-light dark:bg-gray-800">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex">
        {sidebarOpen && (
        <Sidebar onClose={() => setSidebarOpen(false)} />
      )}
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-3xl mx-auto">
            <TaskInput onAddTask={handleAddTask} />
            {Array.isArray(tasks) && (
              <TaskList
                tasks={tasks}
                onToggleTask={handleToggleTask}
                onToggleImportant={handleToggleImportant}
                onTaskClick={handleTaskClick}
              />
            )}
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