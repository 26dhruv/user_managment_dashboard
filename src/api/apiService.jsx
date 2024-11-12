import axios from 'axios';

// Fetch users from an API
export const fetchUsers = () => {
  return axios.get('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.data)
    .catch((error) => console.error('Error fetching data:', error));
};



// Handle saving updated user information
 export const  saveUser= (id, updatedUser ) => {
  
  return axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedUser, {
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  })
};

// Handle user deletion
export const deleteUser = (id) => {
  return axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
};

// Handle adding a new user
export const addUser = (newUser) => {
  return axios.post('https://jsonplaceholder.typicode.com/users', newUser)
};
