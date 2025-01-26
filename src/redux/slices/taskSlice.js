// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   tasks: [],
//   activeFilter: 'today'
// };

// const taskSlice = createSlice({
//   name: 'tasks',
//   initialState,
//   reducers: {
//     addTask: (state, action) => {
//       state.tasks.push(action.payload);
//     },
//     toggleTask: (state, action) => {
//       const task = state.tasks.find(t => t.id === action.payload);
//       if (task) {
//         task.completed = !task.completed;
//       }
//     },
//     toggleImportant: (state, action) => {
//       const task = state.tasks.find(t => t.id === action.payload);
//       if (task) {
//         task.important = !task.important;
//       }
//     },
//     setActiveFilter: (state, action) => {
//       state.activeFilter = action.payload;
//     }
//   }
// });

// export const { addTask, toggleTask, toggleImportant, setActiveFilter } = taskSlice.actions;
// export default taskSlice.reducer;

// // Selectors
// export const selectTasks = (state) => state.tasks.tasks;
// export const selectActiveFilter = (state) => state.tasks.activeFilter;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  activeFilter: "all", // Default filter
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
    // Add these to your reducers
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
