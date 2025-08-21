
import { useState } from 'react';
import { Container, TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function SignUp() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await register(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  }

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>Sign Up</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit}>
        <TextField label="Username" fullWidth margin="normal" value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })} required />
        <TextField label="Email" type="email" fullWidth margin="normal" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })} required />
        <TextField label="Password" type="password" fullWidth margin="normal" value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })} required />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>Create Account</Button>
      </Box>
      <Typography sx={{ mt: 2 }}>
        Already have an account? <Link to="/login">Log in</Link>
      </Typography>
    </Container>
  );
}
