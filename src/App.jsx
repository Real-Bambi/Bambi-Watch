import { createBrowserRouter, RouterProvider } from "react-router";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Watchroom from "./pages/Watchroom";
import Error from "./pages/Error";

const bambiWatchRouter = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/sign-up", element: <SignUp /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/profile", element: <Profile /> },
  { path: "/watchroom", element: <Watchroom /> },
  { path: "*", element: <Error /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={bambiWatchRouter} />
    </>
  )
}

export default App