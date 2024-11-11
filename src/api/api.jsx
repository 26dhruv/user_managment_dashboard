// ALL API FUNCTIONS DEFINED HERE 

// Handles GET request for showing table data 
export const fetchUsers = () => {
  return fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .catch((error) => console.error('Error fetching data:', error));
};

// Used to set the ID for editing
export const handleEdit = (id, setIsEditing) => {
  setIsEditing(id);
};

// Sends PUT request to save data once confirmed by the user
export const handleSave = (id, updatedUser, users, setUsers, setIsEditing) => {
  return fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedUser),
      headers: {
          'Content-type': 'application/json; charset=UTF-8',
      },
  })
      .then((response) => response.json())
      .then((data) => {
          setUsers(users.map((user) => (user.id === id ? data : user)));
          setIsEditing(null);
          console.log('Edit response:', data);
      })
      .catch((error) => console.error('Error editing user:', error));
};

// Sends DELETE request to remove a user
export const handleDelete = (id, users, setUsers) => {
  const user = users.find((user) => user.id === id);
  const warning = `Are you sure you want to delete ${user ? user.name : 'this user'}? \nEither Continue or Cancel.`;
  
  if (window.confirm(warning) === true) {//asking for confirmation before deletion
      return fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
          method: 'DELETE',
      })
          .then((response) => {
              if (response.ok) {
                  setUsers(users.filter((user) => user.id !== id));
                  console.log(`User with ID ${id} deleted successfully.`);
              }
          })
          .catch((error) => console.error('Error deleting user:', error));
  } else {
      return console.log("Deletion Cancelled by User");
  }
};

// Sends POST request to add a new user
export const handleAdd = (newUser, users, setUsers, setNewUser, Navigate) => {
  return fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
          'Content-type': 'application/json; charset=UTF-8',
      },
  })
      .then((response) => response.json())
      .then((data) => {
          setUsers([...users, { id: data.id, ...newUser }]);
          setNewUser({ name: '', username: '', email: '' });
          console.log('Add response:', data);
          alert('Employee Added');
          Navigate('/');
      })
      .catch((error) => {
          console.error('Error adding user:', error);
          alert('Employee Not Added. Error');
      });
};
