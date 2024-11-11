import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  
} from "react-router-dom";
import { UserTable } from './components/user_table';
import { AddUser } from './components/add_user';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
       
          <UserTable />
      ),
    },
    {
      path: "/AddUser",
      element: <AddUser/>,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
