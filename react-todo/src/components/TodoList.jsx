
import React, { useState } from 'react';

const TodoList = () => {
  // Step 1: Initialize state with a few dummy todos for demonstration
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: true },
    { id: 2, text: 'Build a Todo App', completed: false },
    { id: 3, text: 'Write tests', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');

  // Step 2: Implement methods for adding, deleting, and toggling todos

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;

    const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
    setTodos([...todos, { id: newId, text: newTodo, completed: false }]);
    setNewTodo(''); // Clear the input field
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1>Todo List</h1>

      {/* Add Todo Form */}
      <form onSubmit={handleAddTodo} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          style={{ width: 'calc(100% - 70px)', padding: '8px', marginRight: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 12px' }}>Add</button>
      </form>

      {/* Todo List */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li 
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
              cursor: 'pointer',
              textDecoration: todo.completed ? 'line-through' : 'none'
            }}
          >
            <span onClick={() => handleToggleTodo(todo.id)} style={{ flexGrow: 1 }}>
              {todo.text}
            </span>
            <button onClick={() => handleDeleteTodo(todo.id)} style={{ padding: '4px 8px' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;