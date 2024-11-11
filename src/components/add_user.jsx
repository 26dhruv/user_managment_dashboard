import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { handleAdd } from '../api/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export function AddUser(){
    //Local state declaration
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', username: '', email: '' });
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
      };
      //Form rendering for Add User
    return(<>
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
  <Button variant="primary" onClick={() => handleAdd(newUser, users, setUsers, setNewUser,navigate)
    //calling API for inserting Employee Data 
  } style={{ marginTop: '10px' }}>
    Add
  </Button>
</Form>
</>)}