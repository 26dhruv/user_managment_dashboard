import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from './hooks/useUser';  // Import the UserProvider
import { UserDashboard } from './pages/DashboardPage';
import AddUser from './pages/AddUserPage';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <UserDashboard />,
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
