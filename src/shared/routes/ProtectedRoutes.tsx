import PageLoader from "@/shared/components/PageLoader";
import useAuthStore from "../../feature/auth/store/auth.store";
import { Navigate, Outlet } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import NavBar from "@/shared/components/NavBar";

const ProtectedRoutes = () => {
  const user = useAuthStore((e) => e.user);
  const isChekingAuth = useAuthStore((e) => e.isCheckingAuth);
  if (isChekingAuth) return <PageLoader />;
  if (!user) return <Navigate to={"/auth/login"} replace />;
  return (
    <SkeletonTheme baseColor="#151515" highlightColor="#313131">
      <div className="w-full flex relative md:flex-row flex-col">
        <div className="md:w-20  md:h-screen h-15 w-full sticky top-0 left-0 z-99">
          <NavBar userImg={user.profileImg} />
        </div>
        <main className="grow">
          <Outlet />
        </main>
      </div>
    </SkeletonTheme>
  );
};

export default ProtectedRoutes;
