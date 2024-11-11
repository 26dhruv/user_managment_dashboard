import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  
} from "react-router-dom";
import { UserTable } from './components/user_table';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
       
          <UserTable />
      ),
    },
    {
      path: "/Edit/:id",
      element: <div>About</div>,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
