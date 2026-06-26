import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./app.routes";
import useAuthStore from "@/feature/auth/store/auth.store";
import "react-loading-skeleton/dist/skeleton.css";

const App = () => {
  const checkAuth = useAuthStore((e) => e.checkAuth);
  useEffect(() => {
    checkAuth();
  }, []);
  return <RouterProvider router={router} />;
};

export default App;
