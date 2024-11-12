import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../hooks/useUser';  // Import the custom hook
import { addUser } from '../api/apiService';  // Import handleAdd function from api.jsx


//Handle add
const handleAdd = (newUser, users, setUsers, setNewUser, navigate) => {
  return addUser(newUser)
    .then((response) => {
      setUsers((prevUsers) => [...prevUsers, response.data]);
      setNewUser({ name: '', username: '', email: '' });
      alert('User added')
      navigate('/');
    })
    .catch((error) => console.error('Error adding user:', error));
};
export function AddUserForm() {
  const { users, setUsers } = useUsers();  // Get global state and setter function
  const [newUser, setNewUser] = useState({ name: '', username: '', email: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <h4>Add New User</h4>
      <Form>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={newUser.username}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button
          variant="primary"
          onClick={() => handleAdd(newUser, users, setUsers, setNewUser, navigate)}
        >
          Add
        </Button>
      </Form>
    </>
  );
}
