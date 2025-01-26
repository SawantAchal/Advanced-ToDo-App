import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import { store } from './redux/store.js';
// import { ThemeProvider } from './context/ThemeContext.jsx';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <ThemeProvider>
    <Provider store={store}>
        <Router>
          <App />
        </Router>
    </Provider>
  // </ThemeProvider>
);
