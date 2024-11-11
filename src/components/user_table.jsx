import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { fetchUsers, handleEdit, handleSave, handleDelete, handleAdd } from '../api/api.jsx';

export function UserTable() {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', username: '', email: '' });

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Button variant="primary" onClick={() => handleAdd(newUser, users, setUsers, setNewUser)} style={{ marginBottom: '10px' }}>
        Add User
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {isEditing === user.id ? (
                  <Form.Control
                    type="text"
                    value={user.name}
                    onChange={(e) =>
                      setUsers(users.map((u) =>
                        u.id === user.id ? { ...u, name: e.target.value } : u
                      ))
                    }
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {isEditing === user.id ? (
                  <Form.Control
                    type="text"
                    value={user.username}
                    onChange={(e) =>
                      setUsers(users.map((u) =>
                        u.id === user.id ? { ...u, username: e.target.value } : u
                      ))
                    }
                  />
                ) : (
                  user.username
                )}
              </td>
              <td>
                {isEditing === user.id ? (
                  <Form.Control
                    type="text"
                    value={user.email}
                    onChange={(e) =>
                      setUsers(users.map((u) =>
                        u.id === user.id ? { ...u, email: e.target.value } : u
                      ))
                    }
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {isEditing === user.id ? (
                  <Button variant="success" onClick={() => handleSave(user.id, user, users, setUsers, setIsEditing)}>
                    Save
                  </Button>
                ) : (
                  <Button variant="warning" onClick={() => handleEdit(user.id, setIsEditing)}>
                    Edit
                  </Button>
                )}
                {' '}
                <Button variant="danger" onClick={() => handleDelete(user.id, users, setUsers)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

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
        <Button variant="primary" onClick={() => handleAdd(newUser, users, setUsers, setNewUser)} style={{ marginTop: '10px' }}>
          Add
        </Button>
      </Form>
    </>
  );
}
