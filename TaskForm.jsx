
import { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, Checkbox } from '@mui/material';

export default function TaskForm({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState({ title: '', description: '', dueDate: '', completed: false });

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title || '',
        description: initial.description || '',
        dueDate: initial.dueDate ? initial.dueDate.substring(0, 10) : '',
        completed: !!initial.completed
      });
    } else {
      setForm({ title: '', description: '', dueDate: '', completed: false });
    }
  }, [initial]);

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      title: form.title,
      description: form.description,
      dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : undefined,
      completed: form.completed
    });
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{initial ? 'Edit Task' : 'New Task'}</DialogTitle>
      <DialogContent>
        <TextField label="Title" fullWidth margin="normal" value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })} required />
        <TextField label="Description" fullWidth margin="normal" multiline minRows={3} value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })} />
        <TextField label="Due Date" type="date" fullWidth margin="normal" value={form.dueDate}
          onChange={e => setForm({ ...form, dueDate: e.target.value })} InputLabelProps={{ shrink: true }} />
        <FormControlLabel control={
          <Checkbox checked={form.completed} onChange={e => setForm({ ...form, completed: e.target.checked })} />
        } label="Completed" />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>{initial ? 'Save' : 'Add'}</Button>
      </DialogActions>
    </Dialog>
  );
}
