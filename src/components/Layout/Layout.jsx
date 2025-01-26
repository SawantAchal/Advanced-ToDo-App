import React, { useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);
  const tasks = useSelector(state => state.tasks.tasks || []);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleViewToggle = () => {
    setIsGridView(!isGridView);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
    if (isMobile && selectedTask) {
      setSelectedTask(null);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-secondary-light dark:bg-gray-800">
      <Navbar 
        onMenuClick={handleSidebarToggle}
        isGridView={isGridView}
        onViewToggle={handleViewToggle}
        isMobile={isMobile}
      />
      
      <div className="flex flex-1 overflow-hidden">
        
        {sidebarOpen && (
          <>
            {isMobile && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-20"
                onClick={handleSidebarToggle}
              />
            )}
            <div className={`${
              isMobile ? 'fixed left-0 top-0 h-full z-30' : 'relative'
            }`}>
              <Sidebar onClose={handleSidebarToggle} />
            </div>
          </>
        )}
        
        <main className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          sidebarOpen && !isMobile ? 'ml-72' : 'ml-0'
        }`}> 
          <div className="flex-1 p-2 sm:p-4 md:p-6 overflow-y-auto">
            <div className="max-w-3xl mx-auto h-full">
              <TaskInput onAddTask={handleAddTask} />
              {Array.isArray(tasks) && (
                isGridView ? (
                  <TaskGrid
                    tasks={tasks}
                    onToggleTask={handleToggleTask}
                    onToggleImportant={handleToggleImportant}
                    onTaskClick={handleTaskClick}
                    isMobile={isMobile}
                  />
                ) : (
                  <TaskList
                    tasks={tasks}
                    onToggleTask={handleToggleTask}
                    onToggleImportant={handleToggleImportant}
                    onTaskClick={handleTaskClick}
                    isMobile={isMobile}
                  />
                )
              )}
            </div>
          </div>
        </main>

        {selectedTask && (
          <div className={`${
            isMobile ? 'fixed inset-0 z-40' : 'relative'
          }`}>
            <TaskDetails
              task={selectedTask}
              onClose={() => setSelectedTask(null)}
              isMobile={isMobile}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;