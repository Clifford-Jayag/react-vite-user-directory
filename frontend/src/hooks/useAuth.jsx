import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  // Task 2.3: Throw error if used outside AuthProvider[cite: 15]
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};