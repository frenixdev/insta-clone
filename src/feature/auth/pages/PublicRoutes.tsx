import { useShallow } from "zustand/shallow";
import useAuthStore from "../Store/auth.store";
import PageLoader from "@/shared/components/PageLoader";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const { user, isCheckingAuth } = useAuthStore(
    useShallow((s) => ({
      user: s.user,
      isCheckingAuth: s.isCheckingAuth,
    })),
  );
  if (isCheckingAuth) return <PageLoader />;
  if (user) return <Navigate to={"/"} replace/>;
  return <Outlet />;
};

export default PublicRoutes;
