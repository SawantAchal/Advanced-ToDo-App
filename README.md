# DoIt - Task Management Application

## Overview
DoIt is a modern task management application built with React and Redux, featuring a clean and intuitive interface for managing daily tasks. The application supports both list and grid views, task categorization, and real-time task status tracking.

## Features
- **User Authentication**
  - Email-based registration and login
  - Secure user session management
  - Personalized user dashboard

- **Task Management**
  - Create, edit, and delete tasks
  - Mark tasks as complete/incomplete
  - Flag tasks as important
  - Set due dates for tasks
  - Add notes and subtasks

- **Task Organization**
  - Multiple view options (List/Grid)
  - Filter tasks by:
    - All tasks
    - Today's tasks
    - Important tasks
    - Planned tasks
    - Assigned tasks

- **Visual Progress Tracking**
  - Real-time progress visualization
  - Task completion statistics
  - Interactive pie charts for task status

- **Responsive Design**
  - Mobile-friendly interface
  - Dark/Light mode support
  - Customizable layout with collapsible sidebar

## Technology Stack
- **Frontend**
  - React.js
  - Redux Toolkit (State Management)
  - Tailwind CSS (Styling)
  - React Icons
  - Recharts (Data Visualization)
  - Date-fns (Date Manipulation)

- **Storage**
  - Local Storage (Client-side data persistence)

## Installation

1. Clone the repository

bash
git clone https://github.com/yourusername/doit-task-manager.git


2. Navigate to the project directory

bash
cd doit-task-manager


3. Install dependencies

bash
npm install


4. Start the development server

bash
npm run dev


## Usage

### User Registration
1. Click on "Register" from the login page
2. Fill in your details (name, email, password)
3. Submit the registration form

### Task Management
1. Add new tasks using the input field at the top
2. Toggle task completion using the checkbox
3. Mark tasks as important using the star icon
4. View task details by clicking on the task title
5. Switch between list and grid views using the view toggle

### Task Filtering
Use the sidebar navigation to filter tasks:
- All Tasks: View all tasks
- Today: View tasks due today
- Important: View starred tasks
- Planned: View tasks with due dates
- Assigned: View tasks assigned to you


## Future Enhancements
- [ ] Cloud synchronization
- [ ] Task sharing and collaboration
- [ ] Task categories and tags
- [ ] Task priority levels
- [ ] Task search functionality
- [ ] Task reminders and notifications
- [ ] Task analytics and reporting
- [ ] Mobile application