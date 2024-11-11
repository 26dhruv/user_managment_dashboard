import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { fetchUsers, handleEdit, handleSave, handleDelete } from '../api/api.jsx';
import { Link } from 'react-router-dom';

export function UserTable() {
  //State declarations
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
//When component mounts users are fetched 
  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  

  return (
    <>
      <Link to='/AddUser'>
      <Button variant="primary" style={{ marginBottom: '10px' }}>
        Add User
      </Button>
      </Link>
      <Table  bordered hover border={3}>
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
                {
                //Logic for displaying text box for editing content

                isEditing === user.id ? (
                  <Form.Control
                    type="text"
                    value={user.name}
                    onChange={(e) =>
                      setUsers(users.map((u) =>
                        u.id === user.id ? { ...u, name: e.target.value } : u//updating local copy object with repsect to uid for name
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
                
                {
                isEditing === user.id ? (
                  <Button variant="outline-success" onClick={() => handleSave(user.id, user, users, setUsers, setIsEditing )}>
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

     
    </>
  );
}
