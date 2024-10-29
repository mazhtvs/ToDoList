'use client';

import React, { useState, useRef } from 'react';
import { TextField, Button } from '@mui/material';
import useTasks from './hooks/useTasks';
import TaskList from './components/TaskList';

const TaskPage = () => {
  const [tasks, setTasks] = useTasks();
  const [newTask, setNewTask] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [expandedTaskIndex, setExpandedTaskIndex] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState('');
  const [editingTaskDescription, setEditingTaskDescription] = useState('');
  const [errors, setErrors] = useState({ task: '', description: '' });

  const descriptionInputRef = useRef(null);

  const Fields = () => {
    let newErrors = { task: '', description: '' };
    let isValid = true;

    if (!newTask.trim()) {
      newErrors.task = 'Заполните это поле';
      console.error('Ошибка: не заполнено название задачи');
      isValid = false;
    }

    if (!newDescription.trim()) {
      newErrors.description = 'Заполните это поле';
      console.error('Ошибка: не заполнено описание задачи');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const addTask = () => {
    if (Fields()) {
      setTasks([...tasks, { text: newTask, description: newDescription, priority: '', completed: false }]);
      setNewTask('');
      setNewDescription('');
      setErrors({ task: '', description: '' });
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);
  };

  const toggleDescription = (index) => {
    setExpandedTaskIndex(expandedTaskIndex === index ? null : index);
  };

  const togglePriority = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].priority = updatedTasks[index].priority === 'важная' ? '' : 'важная';
    setTasks(updatedTasks);
  };

  const saveEditedTask = (index) => {
    const newErrors = { task: '', description: '' };
    let isValid = true;

    if (!editingTaskText.trim()) {
      newErrors.task = 'Заполните это поле';
      console.error('Ошибка: не заполнено название задачи');
      isValid = false;
    }

    if (!editingTaskDescription.trim()) {
      newErrors.description = 'Заполните это поле';
      console.error('Ошибка: не заполнено описание задачи');
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      const updatedTasks = [...tasks];
      updatedTasks[index] = { ...updatedTasks[index], text: editingTaskText, description: editingTaskDescription };
      setTasks(updatedTasks);
      setEditingTaskIndex(null);
      setEditingTaskText('');
      setEditingTaskDescription('');
      setErrors({ task: '', description: '' });
    }
  };

  const handleDescriptionKeyPress = (event) => {
    if (event.key === 'Enter' && event.shiftKey) {
      setNewDescription(newDescription + '\n');
      event.preventDefault();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      addTask();
    }
  };

  const handleTaskKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (descriptionInputRef.current) {
        descriptionInputRef.current.focus();
      }
    }
  };

  return (
    <div style={{ margin: '25px auto', padding: '30px', maxWidth: '980px', backgroundColor: '#f2f2f2', borderRadius: '10px' }}>
      <h1 style={{ color: '#000', textAlign: 'center', marginBottom: '10px' }}>Список задач</h1>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <TextField
          label="Название задачи"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleTaskKeyPress} // Обработчик нажатия клавиши для названия задачи
          style={{ marginBottom: '15px', width: '100%' }}
          error={!!errors.task}
          helperText={errors.task}
        />
        <TextField
          label="Описание"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          multiline
          rows={3}
          inputRef={descriptionInputRef}
          onKeyDown={handleDescriptionKeyPress} // Обработчик нажатия клавиши для описания
          style={{ marginBottom: '10px', width: '100%' }}
          error={!!errors.description}
          helperText={errors.description}
        />
      </div>
      <TaskList 
        tasks={tasks} 
        setTasks={setTasks} 
        editingTaskIndex={editingTaskIndex} 
        setEditingTaskIndex={setEditingTaskIndex} 
        expandedTaskIndex={expandedTaskIndex} 
        setExpandedTaskIndex={setExpandedTaskIndex} 
        toggleTaskCompletion={toggleTaskCompletion} 
        deleteTask={deleteTask} 
        toggleDescription={toggleDescription} 
        togglePriority={togglePriority} 
        saveEditedTask={saveEditedTask} 
        editingTaskText={editingTaskText} 
        setEditingTaskText={setEditingTaskText} 
        editingTaskDescription={editingTaskDescription} 
        setEditingTaskDescription={setEditingTaskDescription} 
        errors={errors} 
      />
    </div>
  );
};
export default TaskPage;