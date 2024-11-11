import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useUsers } from '../api/usercontext';  // Import the Context custom hook
import { handleDelete, handleEdit, handleSave } from '../api/api';  // Import API functions
import { Form } from 'react-bootstrap';
export function UserTable() {
  const { users, setUsers } = useUsers();  // Get global state and setter function
  const [isEditing, setIsEditing] = useState(null);
  const [query,setQuery]=useState('')
  return (
    <>
    {/* search Bar */}
    <form className="form-inline my-2 my-lg-0">
        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>{setQuery(e.target.value)}}></input>
      </form>
      <Link to='/AddUser'>
        <Button variant="primary" style={{ marginBottom: '10px' }}>
          Add User
        </Button>
      </Link>
      
      <Table bordered hover border={3}>
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
          {users.filter(user => user.name.includes(query)).map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                
                {//Control swtich to editing and displaying text box
                isEditing === user.id ? (
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
                  <Button variant="outline-success" onClick={() => handleSave(user.id, user, users, setUsers, setIsEditing)}>
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
