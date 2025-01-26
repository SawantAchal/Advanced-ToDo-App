import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiList, FiCalendar, FiStar, FiMap, FiUsers, FiInfo } from "react-icons/fi";
import { setActiveFilter, selectTasks, selectActiveFilter } from "../../redux/slices/taskSlice.js";
import { isToday, parseISO } from 'date-fns';
import { PieChart, Pie, Cell } from 'recharts';

const Sidebar = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const activeFilter = useSelector(selectActiveFilter);

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
    { name: 'Done', value: completedTasks.length, color: '#22C55E' },
    { name: 'Pending', value: pendingTasks.length, color: '#EAB308' }
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
      <div className="p-6">
        <nav className="space-y-1">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className={`w-full flex items-center justify-between px-4 py-2 text-gray-700 dark:text-gray-200 rounded-lg ${
                activeFilter === id
                  ? "bg-secondary-light dark:bg-secondary-dark"
                  : "hover:bg-secondary-light dark:hover:bg-secondary-dark"
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

          <div className="flex justify-center mb-4">
            {filteredTasks.length > 0 ? (
                <div className="relative">
                <PieChart width={120} height={120}>
                    <Pie
                    data={pieData.filter(item => item.value > 0)} // Only include non-zero values
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
                        fill={entry.color}
                        strokeWidth={0}
                        />
                    ))}
                    </Pie>
                </PieChart>
                
                </div>
                ) : (
                    <div className="text-center text-gray-500 dark:text-gray-400">
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