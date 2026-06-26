import { useShallow } from "zustand/shallow";
import useAuthStore from "../../feature/auth/store/auth.store";
import PageLoader from "@/shared/components/PageLoader";
import { Navigate, Outlet } from "react-router-dom";
import { AnimatePresence } from "motion/react";

const PublicRoutes = () => {
  const { user, isCheckingAuth } = useAuthStore(
    useShallow((s) => ({
      user: s.user,
      isCheckingAuth: s.isCheckingAuth,
    })),
  );
  if (isCheckingAuth) return <PageLoader />;
  if (user) return <Navigate to={"/"} replace />;
  return (
    <main
      className="w-full h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url("/bg.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <AnimatePresence mode="wait">
        <Outlet />
      </AnimatePresence>
    </main>
  );
};

export default PublicRoutes;
