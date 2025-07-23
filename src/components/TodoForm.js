import React, { useState, useEffect, useRef } from 'react';

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  const [time, setTime] = useState(props.edit ? props.edit.time : '');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = e => {
    if (!input.trim()) {
    alert('Task cannot be empty!');
    return;
}
    e.preventDefault();
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
      time: time
    });
    setInput('');
    setTime('');
  };

  const handleClearAll = (e) => {
    e.preventDefault();
    if (props.clearAllTodos) {
      props.clearAllTodos();
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={props.edit ? 'Update your item' : 'Add a task'}
        value={input}
        name="text"
        className={`todo-input ${props.edit ? 'edit' : ''}`}
        onChange={(e) => setInput(e.target.value)}
        ref={inputRef}
      />
      <input
        type="time"
        value={time}
        className="todo-input"
        onChange={(e) => setTime(e.target.value)}
      />
      <div className='btns'>
        <button className={`todo-button ${props.edit ? 'edit' : ''}`} type="submit"> 
          {props.edit ? 'Update' : 'Add '}
        </button>
        <button className="todo-button clear-all" onClick={handleClearAll} disabled={props.edit} style={props.edit ? { opacity: 0.5, cursor: 'not-allowed' } : {}}>
          Clear All
        </button>
      </div>
      
    </form>
  );
}

export default TodoForm;
