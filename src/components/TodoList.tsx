import React from 'react';
import TodoItem from './TodoItem';
import type { Task } from '../types';

interface TodoListProps {
  tasks: Task[];
  onDeleteTask: (id: number) => void;
  onToggleTask: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, onDeleteTask, onToggleTask }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onDelete={() => onDeleteTask(task.id)}
          onToggle={() => onToggleTask(task.id)}
        />
      ))}
    </ul>
  );
};

export default TodoList;