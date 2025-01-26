import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  activeFilter: "all", 
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    toggleImportant: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) task.important = !task.important;
    },
    setActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },

    updateTask: (state, action) => {
        const { id, ...updates } = action.payload;
        const task = state.tasks.find(t => t.id === id);
        if (task) {
        Object.assign(task, updates);
        }
    },
    deleteTask: (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  },
});

export const { addTask, toggleTask, toggleImportant, setActiveFilter, updateTask, deleteTask } =
  taskSlice.actions;

export const selectTasks = (state) => state.tasks.tasks;
export const selectActiveFilter = (state) => state.tasks.activeFilter;

export default taskSlice.reducer;



// import { createSlice } from '@reduxjs/toolkit';
// import { isToday, parseISO } from 'date-fns';

// // Load tasks from localStorage
// const loadTasksFromStorage = () => {
//   try {
//     const savedTasks = localStorage.getItem('tasks');
//     return savedTasks ? JSON.parse(savedTasks) : [];
//   } catch (error) {
//     console.error('Error loading tasks from localStorage:', error);
//     return [];
//   }
// };

// const initialState = {
//   tasks: loadTasksFromStorage(),
//   activeFilter: 'all'
// };

// const taskSlice = createSlice({
//   name: 'tasks',
//   initialState,
//   reducers: {
//     addTask: (state, action) => {
//       state.tasks.push(action.payload);
//       // Save to localStorage
//       localStorage.setItem('tasks', JSON.stringify(state.tasks));
//     },
//     toggleTask: (state, action) => {
//       const task = state.tasks.find(t => t.id === action.payload);
//       if (task) {
//         task.completed = !task.completed;
//         localStorage.setItem('tasks', JSON.stringify(state.tasks));
//       }
//     },
//     toggleImportant: (state, action) => {
//       const task = state.tasks.find(t => t.id === action.payload);
//       if (task) {
//         task.important = !task.important;
//         localStorage.setItem('tasks', JSON.stringify(state.tasks));
//       }
//     },
//     setActiveFilter: (state, action) => {
//         state.activeFilter = action.payload;
//       },
//     updateTask: (state, action) => {
//       const { id, ...updates } = action.payload;
//       const taskIndex = state.tasks.findIndex(t => t.id === id);
//       if (taskIndex !== -1) {
//         // Create a new task object with the updates
//         state.tasks[taskIndex] = {
//           ...state.tasks[taskIndex],
//           ...updates
//         };
//         // Save to localStorage
//         localStorage.setItem('tasks', JSON.stringify(state.tasks));
//       }
//     },
//     deleteTask: (state, action) => {
//       state.tasks = state.tasks.filter(task => task.id !== action.payload);
//       localStorage.setItem('tasks', JSON.stringify(state.tasks));
//     }
//   }
// });

// export const { 
//   addTask, 
//   toggleTask, 
//   toggleImportant, 
//   updateTask, 
//   deleteTask,
//   setActiveFilter
// } = taskSlice.actions;

// export const selectTasks = (state) => {
//     const tasks = state.tasks.tasks;
//     const activeFilter = state.tasks.activeFilter;
  
//     switch (activeFilter) {
//       case 'all':
//         return tasks;
//       case 'today':
//         return tasks.filter(task => {
//           if (!task.dueDate) return false;
//           try {
//             return isToday(parseISO(task.dueDate));
//           } catch (error) {
//             console.error('Error parsing date:', error);
//             return false;
//           }
//         });
//       case 'important':
//         return tasks.filter(task => task.important);
//       case 'planned':
//         return tasks.filter(task => task.dueDate);
//       default:
//         return tasks;
//     }
//   };
// export const selectActiveFilter = (state) => state.tasks.activeFilter;

// export default taskSlice.reducer;