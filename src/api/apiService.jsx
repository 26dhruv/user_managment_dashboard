import axios from 'axios';

// Fetch users from an API
export const fetchUsers = () => {
  return axios.get(process.env.REACT_APP_API_URL)
    .then((response) => response.data)
    .catch((error) => console.error('Error fetching data:', error));
};



// Handle saving updated user information
 export const  saveUser= (id, updatedUser ) => {
  
  return axios.put(`${process.env.REACT_APP_API_URL}/${id}`, updatedUser, {
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  })
};

// Handle user deletion
export const deleteUser = (id) => {
  return axios.delete(`${process.env.REACT_APP_API_URL}/${id}`)
};

// Handle adding a new user
export const addUser = (newUser) => {
  return axios.post(process.env.REACT_APP_API_URL, newUser)
};
