// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { FiList, FiCalendar, FiStar, FiMap, FiUsers, FiPlus, FiInfo } from 'react-icons/fi';
// import { setActiveFilter, selectTasks, selectActiveFilter } from '../../redux/slices/taskSlice.js';
// // import { selectUser } from '../../redux/slices/userSlice.js';

// const Sidebar = () => {
//   const dispatch = useDispatch();
//   const user = "ABCD";
//   const tasks = useSelector(selectTasks);
//   const activeFilter = useSelector(selectActiveFilter);

//   // Calculate task statistics
//   const todayTasks = tasks.filter(task => {
//     const taskDate = new Date(task.date);
//     const today = new Date();
//     return taskDate.toDateString() === today.toDateString();
//   });

//   const completedTodayTasks = todayTasks.filter(task => task.completed);
//   const progressPercentage = todayTasks.length > 0 
//     ? (completedTodayTasks.length / todayTasks.length) * 100 
//     : 0;

//   // Navigation items
//   const navItems = [
//     { id: 'all', icon: FiList, label: 'All Tasks' },
//     { id: 'today', icon: FiCalendar, label: 'Today' },
//     { id: 'important', icon: FiStar, label: 'Important' },
//     { id: 'planned', icon: FiMap, label: 'Planned' },
//     { id: 'assigned', icon: FiUsers, label: 'Assigned to me' },
//   ];

//   const handleNavClick = (filterId) => {
//     dispatch(setActiveFilter(filterId));
//   };

//   const handleAddList = () => {
//     // Implement your add list functionality
//     console.log('Add list clicked');
//   };

//   return (
//     <aside className="w-72 bg-white dark:bg-gray-800 h-screen border-r dark:border-gray-800">
//       <div className="p-6">
//         {/* Profile Section */}
//         <div className="flex items-center gap-4 mb-6">
//           <img 
//             src={user.avatar} 
//             alt={user} 
//             className="w-16 h-16 rounded-full object-cover"
//           />
//           <h2 className="text-lg font-medium dark:text-white">Hey, {user}</h2>
//         </div>

//         {/* Navigation Menu */}
//         <nav className="space-y-1">
//           {navItems.map(({ id, icon: Icon, label }) => (
//             <button
//               key={id}
//               onClick={() => handleNavClick(id)}
//               className={`w-full flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-200 rounded-lg
//                 ${activeFilter === id ? 'bg-secondary-light dark:bg-secondary-dark' : 'hover:bg-secondary-light dark:hover:bg-secondary-dark'}`}
//             >
//               <Icon className="w-5 h-5" />
//               <span>{label}</span>
//             </button>
//           ))}
//         </nav>

//         {/* Add List Button */}
//         <button 
//           onClick={handleAddList}
//           className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-secondary-light dark:hover:bg-secondary-dark rounded-lg mt-6"
//         >
//           <FiPlus className="w-5 h-5" />
//           <span>Add list</span>
//         </button>

//         {/* Tasks Progress Section */}
//         <div className="mt-8 p-4 bg-secondary-light dark:bg-secondary-dark rounded-lg">
//           <div className="flex justify-between items-center mb-1">
//             <span className="text-sm text-gray-600 dark:text-gray-300">Today Tasks</span>
//             <button className="text-gray-400 hover:text-gray-600">
//               <FiInfo className="w-4 h-4" />
//             </button>
//           </div>
          
//           <div className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
//             {todayTasks.length}
//           </div>

//           {/* Progress Bar */}
//           <div className="relative h-2 bg-white dark:bg-gray-700 rounded-full overflow-hidden">
//             <div 
//               className="absolute top-0 left-0 h-full bg-green-600 transition-all duration-300"
//               style={{ width: `${progressPercentage}%` }}
//             />
//           </div>

//           {/* Legend */}
//           <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
//             <span>Pending ({todayTasks.length - completedTodayTasks.length})</span>
//             <span>Done ({completedTodayTasks.length})</span>
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;


import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiList, FiCalendar, FiStar, FiMap, FiUsers, FiPlus, FiInfo } from "react-icons/fi";
import { setActiveFilter, selectTasks, selectActiveFilter } from "../../redux/slices/taskSlice.js";

const Sidebar = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const activeFilter = useSelector(selectActiveFilter);

  // Filter tasks based on active filter
  const filteredTasks =
    activeFilter === "all"
      ? tasks
      : activeFilter === "today"
      ? tasks.filter((task) => {
          const taskDate = new Date(task.date);
          const today = new Date();
          return taskDate.toDateString() === today.toDateString();
        })
      : activeFilter === "important"
      ? tasks.filter((task) => task.important)
      : [];

  const completedTasks = filteredTasks.filter((task) => task.completed);
  const progressPercentage =
    filteredTasks.length > 0
      ? (completedTasks.length / filteredTasks.length) * 100
      : 0;

  const navItems = [
    { id: "all", icon: FiList, label: "All Tasks" },
    { id: "today", icon: FiCalendar, label: "Today" },
    { id: "important", icon: FiStar, label: "Important" },
    { id: "planned", icon: FiMap, label: "Planned" },
    { id: "assigned", icon: FiUsers, label: "Assigned to me" },
  ];

  const handleNavClick = (filterId) => {
    dispatch(setActiveFilter(filterId));
  };

  return (
    <aside className="w-72 bg-white dark:bg-gray-800 h-screen border-r dark:border-gray-800">
      <div className="p-6">
        <nav className="space-y-1">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className={`w-full flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-200 rounded-lg ${
                activeFilter === id
                  ? "bg-secondary-light dark:bg-secondary-dark"
                  : "hover:bg-secondary-light dark:hover:bg-secondary-dark"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-8 p-4 bg-secondary-light dark:bg-secondary-dark rounded-lg">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {activeFilter === "today" ? "Today's Tasks" : "Filtered Tasks"}
            </span>
            <button className="text-gray-400 hover:text-gray-600">
              <FiInfo className="w-4 h-4" />
            </button>
          </div>

          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {filteredTasks.length}
          </div>

          <div className="relative h-2 bg-white dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-green-600 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
            <span>Pending ({filteredTasks.length - completedTasks.length})</span>
            <span>Done ({completedTasks.length})</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
