import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './index.css';
 // определяем  интерфейс для задачи
interface Task {
  id: number;
  title: string;
  done: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]); //  Создаем состояние пустое состояние таски

  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all'); // Создаем состояние filter all.

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks'); // первый хук  загружает  задачи из локала при первом рендеринге.
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => { 
    localStorage.setItem('tasks', JSON.stringify(tasks));// второй хук сохранаяет задачи  в локале  при изменении состояния таски
  }, [tasks]);

  const addTask = (title: string) => {
    setTasks([...tasks, { id: Date.now(), title, done: false }]);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };
// фильтр  задачь в зависимости от выбранного фильтра.
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.done;
    if (filter === 'completed') return task.done;
    return false;
  });

  return (
    <div className="app">
      <h1>Список задач</h1>
      <div>
        <button onClick={() => setFilter('all')}>Все</button>
        <button onClick={() => setFilter('active')}>Активные</button>
        <button onClick={() => setFilter('completed')}>Выполненные</button>
      </div>
      <TodoForm onAddTask={addTask} />
      <TodoList tasks={filteredTasks} onDeleteTask={deleteTask} onToggleTask={toggleTask} />
    </div>
  );
};

export default App;