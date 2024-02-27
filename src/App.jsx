import React, { useState } from 'react';
import './App.css'

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const handleEditTodo = (id, newText) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, text: newText };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleToggleCompleted = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') {
      return todo.completed;
    } else if (filter === 'active') {
      return !todo.completed;
    }
    return true;
  });

  return (
    <div className='edit'>
      <h1>To-Do List</h1>
      <input className='edit-1'
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter a new task"
      />
      <button onClick={handleAddTodo}>Add</button>
      <div className='edit-2'>
        <button onClick={() => setFilter('all')}>All-Tasks</button>
        <button onClick={() => setFilter('active')}>Uncompleted</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>
      <ul className='edit-3'>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button className='edit-5' onClick={() => handleToggleCompleted(todo.id)}>
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button className='edit-5' onClick={() => handleEditTodo(todo.id, prompt('Edit task:', todo.text))}>
              Edit
            </button>
            <button className='edit-5' onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
