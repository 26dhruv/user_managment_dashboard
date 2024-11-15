import Table from 'react-bootstrap/Table';
import { Form } from 'react-bootstrap';
import {  deleteUser, saveUser } from '../api/apiService';  // Import API functions
import { useUsers } from '../hooks/useUser';  // Import the Context custom hook
import {  useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useQuery } from '../hooks/useQuery';



export default function UserTable()
{
  const {query}=useQuery()
  const { users, setUsers } = useUsers();  // Get global state and setter function
  const [isEditing, setIsEditing] = useState(null);
//CRUDE HANDLING 
// Handle user editing by setting the editing state
const handleEdit = (id) => {
  setIsEditing(id);
};
//Handling save
 const handleSave = (id, updatedUser) => {
  return saveUser(id, updatedUser).then((response) => {
      setUsers(users.map((user) => (user.id === id ? response.data : user)));
      setIsEditing(null);
      console.log('Edit response:', response.data);
      alert('User Edited')
    })
    .catch((error) => console.error('Error editing user:', error));
};
//Delete handling 
const handleDelete = (id) => {
  const user = users.find((user) => user.id === id);
  const warning = `Are you sure you want to delete ${user ? user.name : 'this user'}? \nEither Continue or Cancel.`;

  if (window.confirm(warning)) {
    
      deleteUser(id).then(() => {
        setUsers(users.filter((user) => user.id !== id));
        alert(`User ${user.name} deleted successfully.`);
      })
      .catch((error) => console.error('Error deleting user:', error));
  } else {
    console.log("Deletion Cancelled by User");
  }
}


  return(
<>
      
   {/* Navigation to AddUser Page */}
   <Link to='/add-user'>
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
                  <Button variant="outline-success" onClick={() => handleSave(user.id, user)}>
                    Save
                  </Button>
                ) : (
                  <Button variant="warning" onClick={() => handleEdit(user.id, setIsEditing)}>
                    Edit
                  </Button>
                )}
                {' '}
                <Button variant="danger" onClick={() => handleDelete(user.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </>)}