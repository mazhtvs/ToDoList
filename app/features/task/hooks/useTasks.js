import { useState, useEffect } from 'react';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Проверяем, доступен ли window
    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem('tasks');
      setTasks(savedTasks ? JSON.parse(savedTasks) : []);
    }
  }, []); 

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]); // Синхронизация tasks с localStorage при каждом изменении tasks

  return [tasks, setTasks];
};

export default useTasks;
