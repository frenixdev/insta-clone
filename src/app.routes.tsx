import { createBrowserRouter } from "react-router-dom";
import Register from "@/feature/auth/pages/Register";
import Login from "@/feature/auth/pages/Login";
import ProtectedRoutes from "@/feature/auth/components/ProtectedRoutes";
import AuthPages from "./feature/auth/pages/AuthPages";
import PublicRoutes from "./feature/auth/pages/PublicRoutes";
import Feed from "./feature/Feed/Feed";
import CreatePost from "./feature/CreatePost/CreatePost";
import Profile from "./feature/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <PublicRoutes />,
    children: [
      {
        element: <AuthPages />,
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      { index: true,element: <Feed /> },
      { path: "create", element: <CreatePost /> },
      {path: "/profile", element: <Profile/>}
    ],
  },
]);

export default router;
