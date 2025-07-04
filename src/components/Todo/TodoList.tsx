// src/components/Todo/TodoList.tsx
import React, { useState } from 'react';
import { Check, Plus, Trash } from 'lucide-react';

const TodoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Reply to comments', completed: false },
    { id: 2, text: 'Check mentions', completed: true },
    { id: 3, text: 'Schedule new posts', completed: false }
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        text: newTask,
        completed: false
      }]);
      setNewTask('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="todo-container">
      <h3 className="section-title">Daily Tasks</h3>
      
      <div className="todo-input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task..."
          className="todo-input"
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <button 
          onClick={addTask}
          className="add-todo-btn"
        >
          <Plus size={20} />
        </button>
      </div>
      
      <ul className="todo-list">
        {tasks.map(task => (
          <li 
            key={task.id} 
            className={`todo-item ${task.completed ? 'completed' : ''}`}
          >
            <div className="flex items-center">
              <button 
                onClick={() => toggleTask(task.id)}
                className={`w-5 h-5 flex items-center justify-center rounded mr-2 ${
                  task.completed ? 'bg-green-500' : 'border border-gray-400'
                }`}
              >
                {task.completed && <Check size={14} className="text-white" />}
              </button>
              <span className={task.completed ? 'line-through text-gray-400' : ''}>
                {task.text}
              </span>
            </div>
            <div className="todo-actions">
              <button 
                onClick={() => deleteTask(task.id)}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;