
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const { user, logout } = useAuth();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Digital Factory To‑Do</Typography>
        {user ? (
          <Box display="flex" alignItems="center" gap={2}>
            <Typography>{user.username}</Typography>
            <Button color="inherit" onClick={logout}>Logout</Button>
          </Box>
        ) : (
          <Box>
            <Button component={RouterLink} to="/login" color="inherit">Login</Button>
            <Button component={RouterLink} to="/signup" color="inherit">Sign Up</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
