import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiList, FiCalendar, FiStar, FiMap, FiUsers, FiInfo, FiPlus } from "react-icons/fi";
import { setActiveFilter, selectTasks, selectActiveFilter } from "../../redux/slices/taskSlice.js";
import { isToday, parseISO } from 'date-fns';
import { PieChart, Pie, Cell } from 'recharts';

const Sidebar = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const activeFilter = useSelector(selectActiveFilter);
  const user = useSelector(state => state.auth.user); // 

  const getFilteredTasks = () => {
    switch (activeFilter) {
      case 'all':
        return tasks;
      case 'today':
        return tasks.filter((task) => {
          if (!task.dueDate) return false;
          try {
            return isToday(parseISO(task.dueDate));
          } catch (error) {
            console.error('Error parsing date:', error);
            return false;
          }
        });
      case 'important':
        return tasks.filter((task) => task.important);
      case 'planned':
        return tasks.filter((task) => task.dueDate);
      case 'assigned':
        return tasks.filter((task) => task.assigned);
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();
  const completedTasks = filteredTasks.filter((task) => task.completed);
  const pendingTasks = filteredTasks.filter((task) => !task.completed);

  // Move pieData definition here, after completedTasks and pendingTasks are defined
  const pieData = [
    { name: 'Pending', value: pendingTasks.length, color: '#EAB308' }, // Put pending first
    { name: 'Done', value: completedTasks.length, color: '#22C55E' }
  ];

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

  const getCounts = () => {
    return {
      all: tasks.length,
      today: tasks.filter(task => task.dueDate && isToday(parseISO(task.dueDate))).length,
      important: tasks.filter(task => task.important).length,
      planned: tasks.filter(task => task.dueDate).length,
      assigned: tasks.filter(task => task.assigned).length,
    };
  };

  const counts = getCounts();

  return (
    <aside className="w-72 bg-white dark:bg-gray-800 h-screen border-r dark:border-gray-800">
      <div className="p-6 space-y-4">
                {/* User Profile Box */}
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={user?.avatar || '/default-avatar.png'} // Add a default avatar image
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-700"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-700"></div>
            </div>
            <div className="flex-1">
              <h2 className="text-base font-medium text-gray-900 dark:text-white">
                Hey, {user?.name || 'User'}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user?.email || ''}
              </p>
            </div>
          </div>
        </div>
        {/* Navigation Box */}
        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
          <nav className="space-y-1 max-h-[250px] overflow-y-auto pr-2">
            {navItems.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className={`w-full flex items-center justify-between px-4 py-2 text-gray-700 dark:text-gray-200 rounded-lg ${
                  activeFilter === id
                    ? "bg-white dark:bg-gray-800 shadow-sm"
                    : "hover:bg-white dark:hover:bg-gray-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {counts[id]}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Add List Box */}
        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
          <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 rounded-lg">
            <FiPlus className="w-5 h-5" />
            <span>Add List</span>
          </button>
        </div>

        {/* Statistics Box */}
        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {activeFilter === "today" ? "Today's Tasks" : "Filtered Tasks"}
            </span>
            <button className="text-gray-400 hover:text-gray-600">
              <FiInfo className="w-4 h-4" />
            </button>
          </div>

          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {filteredTasks.length}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
            {filteredTasks.length > 0 ? (
              <div className="flex justify-center">
                <PieChart width={120} height={120}>
                  <Pie
                    data={pieData}
                    cx={60}
                    cy={60}
                    innerRadius={25}
                    outerRadius={50}
                    paddingAngle={0}
                    startAngle={90}
                    endAngle={450}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.value > 0 ? entry.color : 'transparent'}
                        strokeWidth={0}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </div>
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                No tasks yet
              </div>
            )}
          </div>

          <div className="flex justify-between items-center space-x-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Done ({completedTasks.length})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Pending ({pendingTasks.length})
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
