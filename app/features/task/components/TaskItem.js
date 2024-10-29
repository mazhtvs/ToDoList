import React from 'react';
import { ListItem, ListItemText, Checkbox, IconButton, TextField, Button, Collapse } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const TaskItem = ({
  task,
  index,
  editingTaskIndex,
  setEditingTaskIndex,
  toggleTaskCompletion,
  deleteTask,
  toggleDescription,
  expandedTaskIndex,
  togglePriority,
  saveEditedTask,
  editingTaskText,
  setEditingTaskText,
  editingTaskDescription,
  setEditingTaskDescription,
  errors,
}) => {
  const handleEditTaskTextChange = (e) => {
    setEditingTaskText(e.target.value);
  };

  const handleEditTaskDescriptionChange = (e) => {
    setEditingTaskDescription(e.target.value);
  };

  return (
    <div>
      {editingTaskIndex === index ? (
        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#e0e0e0', padding: '10px', borderRadius: '8px' }}>
          <TextField
            value={editingTaskText}
            onChange={handleEditTaskTextChange}
            style={{ marginBottom: '10px' }}
            error={!!errors.task}
            helperText={errors.task}
          />
          <TextField
            value={editingTaskDescription}
            onChange={handleEditTaskDescriptionChange}
            multiline
            rows={3}
            style={{ marginBottom: '10px' }}
            error={!!errors.description}
            helperText={errors.description}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={() => saveEditedTask(index)}
            style={{ alignSelf: 'flex-end' }}
          >
            Сохранить
          </Button>
        </div>
      ) : (
        <ListItem
          disableGutters
          style={{
            backgroundColor: task.priority === 'важная' ? '#f8d7da' : '#e0e0e0',
            color: task.priority === 'важная' ? '#d32f2f' : '#000',
            padding: '10px',
            borderRadius: '8px',
            marginBottom:'10px'
          }}
        >
          <Checkbox checked={task.completed} onChange={() => toggleTaskCompletion(index)} />
          <ListItemText
            primary={task.priority ? `${task.text} (${task.priority})` : task.text}
            onClick={() => toggleDescription(index)}
            style={{
              textDecoration: task.completed ? 'line-through' : 'none',
              cursor: 'pointer',
              flex: 1
            }}
          />
          <IconButton onClick={() => togglePriority(index)}>
            {task.priority === 'важная' ? <StarIcon color="warning" /> : <StarOutlineIcon />}
          </IconButton>
          <IconButton edge="end" onClick={() => setEditingTaskIndex(index)}>
            <EditIcon />
          </IconButton>
          <IconButton edge="end" onClick={() => deleteTask(index)}>
            <DeleteIcon />
          </IconButton>
          <IconButton edge="end" onClick={() => toggleDescription(index)}>
            {expandedTaskIndex === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </ListItem>
      )}
      <Collapse in={expandedTaskIndex === index} timeout="auto" unmountOnExit>
        <ListItem style={{ paddingLeft: '20px', backgroundColor: '#f5f5f5' }}>
          <ListItemText secondary={task.description || 'Нет описания'} />
        </ListItem>
      </Collapse>
    </div>
  );
};
export default TaskItem;