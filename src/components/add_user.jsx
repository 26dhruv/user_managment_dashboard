import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../api/usercontext';  // Import the custom hook
import { handleAdd } from '../api/api';  // Import handleAdd function from api.jsx

export function AddUser() {
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
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
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
