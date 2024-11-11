import axios from 'axios';

// Fetch users from an API
export const fetchUsers = () => {
  return axios.get('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.data)
    .catch((error) => console.error('Error fetching data:', error));
};

// Handle user editing by setting the editing state
export const handleEdit = (id, setIsEditing) => {
  setIsEditing(id);
};

// Handle saving updated user information
export const handleSave = (id, updatedUser, users, setUsers, setIsEditing) => {
  return axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedUser, {
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  })
    .then((response) => {
      setUsers(users.map((user) => (user.id === id ? response.data : user)));
      setIsEditing(null);
      console.log('Edit response:', response.data);
      alert('User Edited')
    })
    .catch((error) => console.error('Error editing user:', error));
};

// Handle user deletion
export const handleDelete = (id, users, setUsers) => {
  const user = users.find((user) => user.id === id);
  const warning = `Are you sure you want to delete ${user ? user.name : 'this user'}? \nEither Continue or Cancel.`;

  if (window.confirm(warning)) {
    return axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
        alert(`User ${user.name} deleted successfully.`);
      })
      .catch((error) => console.error('Error deleting user:', error));
  } else {
    console.log("Deletion Cancelled by User");
  }
};

// Handle adding a new user
export const handleAdd = (newUser, users, setUsers, setNewUser, navigate) => {
  return axios.post('https://jsonplaceholder.typicode.com/users', newUser)
    .then((response) => {
      setUsers((prevUsers) => [...prevUsers, response.data]);
      setNewUser({ name: '', username: '', email: '' });
      alert('User added')
      navigate('/');
    })
    .catch((error) => console.error('Error adding user:', error));
};
