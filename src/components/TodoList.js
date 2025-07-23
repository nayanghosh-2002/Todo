import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList({ theme, toggleTheme }) {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) return;

    const isDuplicate = todos.some(
      (item) =>
        item.text.toLowerCase().trim() === todo.text.toLowerCase().trim() &&
        item.time === todo.time
    );

    if (isDuplicate) {
      window.alert('⚠️ This task with the same time already exists!');
      return;
    }

    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) return;

    setTodos((prev) =>
      prev.map((item) =>
        item.id === todoId
          ? { ...item, text: newValue.text, time: newValue.time }
          : item
      )
    );
  };

  const removeTodo = (id) => {
    const removedArr = todos.filter((todo) => todo.id !== id);
    setTodos(removedArr);
  };

  const completeTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  const clearAllTodos = () => {
    if (window.confirm('Are you sure you want to clear all tasks?')) {
      setTodos([]);
    }
  };

  return (
    <>
      <div className='head'>
        <button className="theme-toggle" onClick={toggleTheme}>
           {theme === 'dark' ? '☀️' : '🌙'} 
        </button>
      </div>
        <h1>What's the plan for Today?</h1>

      <TodoForm onSubmit={addTodo} clearAllTodos={clearAllTodos} />
      <hr className={`divider ${theme}`} />
      <div className="task-scroll-area">
        <Todo
          todos={todos}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />
      </div>
    </>
  );
}

export default TodoList;
