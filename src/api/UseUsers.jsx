import { createContext, useContext, useState, useEffect } from 'react';
import { fetchUsers } from './apiService';

// Create a context for users
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUsers = () => {
  return useContext(UserContext);
};

// Context provider component to wrap around the app
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users initially 
    fetchUsers().then(setUsers);
  }, []);

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};

