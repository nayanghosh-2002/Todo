import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
    time: ''
  });

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: '',
      time: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
      key={todo.id}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        <div className='tsak' style={{  marginTop: '4px' }}>
          <strong>
            ⚒️ {todo.text}
          </strong>
        </div>
        {todo.time && (
          <div className='tsak' style={{  marginTop: '4px' }}><strong>
            ⏰ {todo.time}
            </strong>
          </div>
        )}
      </div>
      <div className='icons'>
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className='delete-icon'
        />
        <TiEdit
          onClick={() => {
            if (!todo.isComplete) {
              setEdit({
                id: todo.id,
                value: todo.text,
                time: todo.time
              });
            }
          }}
          className='edit-icon'
          style={{ opacity: todo.isComplete ? 0.5 : 1, cursor: todo.isComplete ? 'not-allowed' : 'pointer' }}
        />
      </div>
    </div>
  ));
};

export default Todo;
