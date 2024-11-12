import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from './api/UseUsers';  // Import the UserProvider
import { UserTable } from './components/DashboardPage';
import { AddUser } from './components/AddUserPage';

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
