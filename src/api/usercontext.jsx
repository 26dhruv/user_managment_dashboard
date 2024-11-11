import { createContext, useContext, useState, useEffect } from 'react';

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
    // Fetch users initially if needed, can be left empty if you're adding them directly
    fetchUsers().then(setUsers);
  }, []);

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};

// Function to fetch users
const fetchUsers = () => {
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .catch((error) => console.error('Error fetching users:', error));
};
