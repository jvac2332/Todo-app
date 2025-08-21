
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Todo from './pages/Todo';

export default function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Todo />} />
            </Route>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}
