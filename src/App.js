import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from './api/UseUsers';  // Import the UserProvider
import { UserDashboard } from './components/DashboardPage';
import {  AddUserForm } from './components/AddUserPage';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <UserDashboard />,
    },
    {
      path: "/add-user",
      element: <AddUserForm />,
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
