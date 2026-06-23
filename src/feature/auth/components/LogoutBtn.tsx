import Loader from "@/shared/components/Loader";
import Button from "@auth/components/Button";
import useAuthStore from "../Store/auth.store";
import { useShallow } from "zustand/shallow";

const LogoutBtn = () => {
  const { user, isLoading, logout } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      isLoading: state.isLoading,
      logout: state.logout,
    })),
  );

  const submitHandler = async () => {
    await logout();
  };
  return (
    user && (
      <Button
        onClick={submitHandler}
        className="bg-red-500 px-3 py-1 hover:bg-red-600 h-10"
      >
        {isLoading ? <Loader /> : "Logout"}
      </Button>
    )
  );
};

export default LogoutBtn;
