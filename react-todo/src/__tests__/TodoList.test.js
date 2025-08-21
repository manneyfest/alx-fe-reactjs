// src/__tests__/TodoList.test.js

import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList';

// Test 1: Verify initial render
test('renders the TodoList component with initial todos', () => {
  render(<TodoList />);
  expect(screen.getByText(/learn react/i)).toBeInTheDocument();
  expect(screen.getByText(/build a todo app/i)).toBeInTheDocument();
  expect(screen.getByText(/write tests/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/add a new todo/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
});

// Test 2: Test adding a new todo
test('allows users to add a new todo', () => {
  render(<TodoList />);
  
  // Find the input field and the add button
  const input = screen.getByPlaceholderText(/add a new todo/i);
  const addButton = screen.getByRole('button', { name: /add/i });

  // Simulate typing a new todo and clicking the button
  fireEvent.change(input, { target: { value: 'New Test Todo' } });
  fireEvent.click(addButton);

  // Assert that the new todo is now in the document
  expect(screen.getByText(/new test todo/i)).toBeInTheDocument();
  
  // Also assert that the input field is cleared
  expect(input.value).toBe('');
});

// Test 3: Test toggling a todo's completion status
test('allows a todo to be toggled', () => {
  render(<TodoList />);
  
  // Find the "Build a Todo App" todo (initially not completed)
  const todoItem = screen.getByText(/build a todo app/i);

  // Assert that it does NOT have the line-through style initially
  expect(todoItem).not.toHaveStyle('text-decoration: line-through');

  // Simulate a click to toggle the completion status
  fireEvent.click(todoItem);

  // Assert that the todo now has the line-through style
  expect(todoItem).toHaveStyle('text-decoration: line-through');
});

// Test 4: Test deleting a todo
test('allows a todo to be deleted', () => {
  render(<TodoList />);

  // Find the "Delete" button for the first todo
  const deleteButton = screen.getAllByRole('button', { name: /delete/i })[0];
  
  // Find the text of the todo we are about to delete
  const todoText = screen.getByText(/learn react/i);

  // Simulate a click on the delete button
  fireEvent.click(deleteButton);

  // Assert that the todo item is no longer in the document
  expect(todoText).not.toBeInTheDocument();
});