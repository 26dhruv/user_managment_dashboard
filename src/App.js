import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from './api/usercontext';  // Import the UserProvider
import { UserTable } from './components/user_table';
import { AddUser } from './components/add_user';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <UserTable />,
    },
    {
      path: "/add-user",
      element: <AddUser />,
    },
  ]);

  return (
    <UserProvider>
      <div className="app-container">
        <RouterProvider router={router} />
      </div>
    </UserProvider>
  );
}

export default App;
