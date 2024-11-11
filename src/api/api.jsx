//ALL API FUNCTIONS DEFINED HERE 
//Handles get for showing table data 
export const fetchUsers = () => {
    return fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .catch((error) => console.error('Error fetching data:', error));
  };
  //Used to pass U ID for editing
  export const handleEdit = (id, setIsEditing) => {
    setIsEditing(id);
  };
  //Sending PUT request for saving data once confirmed by user
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
  //Delete user API CALL
  export const handleDelete = (id, users, setUsers) => {
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
  };
  //Add user POST API CALL
  export const handleAdd = (newUser, users, setUsers, setNewUser,Navigate) => {
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
        alert('employee Added')
        Navigate('/')

      })
      .catch((error) => {console.error('Error adding user:', error)
        alert('employee Not Added Error')

      });
  };
  