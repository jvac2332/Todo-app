
import { useState } from 'react';
import { Container, TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await login(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  }

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>Log In</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit}>
        <TextField label="Email" type="email" fullWidth margin="normal" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })} required />
        <TextField label="Password" type="password" fullWidth margin="normal" value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })} required />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>Log In</Button>
      </Box>
      <Typography sx={{ mt: 2 }}>
        No account? <Link to="/signup">Sign up</Link>
      </Typography>
    </Container>
  );
}
