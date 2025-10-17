import React from 'react';
import type { Task } from '../types';

interface TodoItemProps {
  task: Task;
  onDelete: () => void;
  onToggle: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, onDelete, onToggle }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.done}
        onChange={onToggle}
      />
      <span style={{ flexGrow: 8 , textDecoration: task.done ? 'line-through' : 'none' }}>
        {task.title}
      </span>
      <button onClick={onDelete}>Удалить</button>
    </li>
  );
};

export default TodoItem;