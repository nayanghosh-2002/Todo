import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';

function App() {
  
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div>
      <h1 className='header'>Todo App</h1>

      <div className="todo-app">
        <TodoList theme={theme} toggleTheme={toggleTheme} />
      </div>
    </div>
  );
}

export default App;
