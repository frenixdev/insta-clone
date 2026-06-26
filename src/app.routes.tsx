import { createBrowserRouter } from "react-router-dom";

import Feed from "@/feature/post/pages/Feed";
import Login from "@/feature/auth/pages/Login";
import Profile from "@/feature/Profile/Profile";
import Register from "@/feature/auth/pages/Register";
import ProtectedRoutes from "@/shared/routes/ProtectedRoutes";
import PublicRoutes from "@/shared/routes/PublicRoutes";
import CreatePost from "@/feature/post/pages/CreatePostModel";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <PublicRoutes />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      { index: true, element: <Feed /> },
      { path: "create", element: <CreatePost /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
]);

export default router;
