
import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { Container, Typography, Button, List, ListItem, ListItemText, IconButton, Chip, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import TaskForm from './TaskForm';

export default function Todo() {
  const { tasks, loading, addTask, updateTask, deleteTask } = useTasks();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">My Tasks</Typography>
        <Button startIcon={<AddIcon />} variant="contained" onClick={() => { setEditing(null); setDialogOpen(true); }}>
          New Task
        </Button>
      </Stack>

      {loading ? <Typography sx={{ mt: 2 }}>Loading…</Typography> : (
        <List>
          {tasks.map(task => (
            <ListItem key={task._id} secondaryAction={
              <>
                <IconButton edge="end" onClick={() => { setEditing(task); setDialogOpen(true); }}><EditIcon /></IconButton>
                <IconButton edge="end" onClick={() => deleteTask(task._id)}><DeleteIcon /></IconButton>
              </>
            }>
              <ListItemText
                primary={task.title}
                secondary={task.description}
              />
              {task.completed ? <Chip label="Done" color="success" size="small" /> : <Chip label="Open" size="small" />}
            </ListItem>
          ))}
        </List>
      )}

      <TaskForm
        open={dialogOpen}
        initial={editing}
        onClose={() => setDialogOpen(false)}
        onSave={async (payload) => {
          if (editing) await updateTask(editing._id, payload);
          else await addTask(payload);
          setDialogOpen(false);
        }}
      />
    </Container>
  );
}
