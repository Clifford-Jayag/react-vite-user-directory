import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Students from './pages/Students';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './hooks/useAuth';

// Helper component to handle root path redirect based on auth status[cite: 17]
function RootRedirect() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/students" replace /> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Task 4.3: Public routes[cite: 17] */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Task 4.3: Protected route wrapper[cite: 17] */}
        <Route element={<ProtectedRoute />}>
          <Route path="/students" element={<Students />} />
        </Route>

        {/* Task 4.3: Redirect root path based on auth status[cite: 17] */}
        <Route path="/" element={<RootRedirect />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}