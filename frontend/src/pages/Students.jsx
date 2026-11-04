import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  // Task 5.1: Clears localStorage, resets AuthContext, and redirects to /login
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/students', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setStudents(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch student list.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [token]);

  return (
    <div className="page-container" style={{ padding: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Students Directory</h2>
        {/* Task 5.1: Logout button */}
        <button onClick={handleLogout}>Logout</button>
      </header>

      {loading && <p>Loading students...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <ul>
          {students.map((student) => (
            <li key={student.id || student.email} style={{ margin: '0.5rem 0' }}>
              <strong>{student.name}</strong> ({student.course || student.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}