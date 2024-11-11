import axios from "axios";

// ALL API FUNCTIONS DEFINED HERE 

// Handles GET request for showing table data 
export const fetchUsers = () => {
  return axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.data)
      .catch((error) => console.error('Error fetching data:', error));
};

// Used to set the ID for editing
export const handleEdit = (id, setIsEditing) => {
  setIsEditing(id);
};

// Sends PUT request to save data once confirmed by the user
export const handleSave = (id, updatedUser, users, setUsers, setIsEditing) => {
  return axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedUser, {
      headers: {
          'Content-type': 'application/json; charset=UTF-8',
      },
  })
      .then((response) => {
          setUsers(users.map((user) => (user.id === id ? response.data : user)));
          setIsEditing(null);
          console.log('Edit response:', response.data);
      })
      .catch((error) => console.error('Error editing user:', error));
};

// Sends DELETE request to remove a user
export const handleDelete = (id, users, setUsers) => {
  const user = users.find((user) => user.id === id);
  const warning = `Are you sure you want to delete ${user ? user.name : 'this user'}? \nEither Continue or Cancel.`;

  if (window.confirm(warning)) { // asking for confirmation before deletion
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

// Sends POST request to add a new user
export const handleAdd = (newUser, users, setUsers, setNewUser, Navigate) => {
  return axios.post('https://jsonplaceholder.typicode.com/users', newUser, {
      headers: {
          'Content-type': 'application/json; charset=UTF-8',
      },
  })
      .then((response) => {
          setUsers([...users, { id: response.data.id, ...newUser }]);
          setNewUser({ name: '', username: '', email: '' });
          console.log('Add response:', response.data);
          alert('Employee Added');
          Navigate('/');
      })
      .catch((error) => {
          console.error('Error adding user:', error);
          alert('Employee Not Added. Error');
      });
};
