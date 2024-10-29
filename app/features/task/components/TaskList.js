import React from 'react';
import { List } from '@mui/material';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, setTasks, editingTaskIndex, setEditingTaskIndex, expandedTaskIndex, setExpandedTaskIndex, toggleTaskCompletion, deleteTask, toggleDescription, togglePriority, saveEditedTask, editingTaskText, setEditingTaskText, editingTaskDescription, setEditingTaskDescription, errors }) => {
  return (
    <List>
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          index={index}
          editingTaskIndex={editingTaskIndex}
          setEditingTaskIndex={setEditingTaskIndex}
          toggleTaskCompletion={toggleTaskCompletion}
          deleteTask={deleteTask}
          toggleDescription={toggleDescription}
          expandedTaskIndex={expandedTaskIndex}
          togglePriority={togglePriority}
          saveEditedTask={saveEditedTask}
          editingTaskText={editingTaskText}
          setEditingTaskText={setEditingTaskText}
          editingTaskDescription={editingTaskDescription}
          setEditingTaskDescription={setEditingTaskDescription}
          errors={errors}
        />
      ))}
    </List>
  );
};
export default TaskList;