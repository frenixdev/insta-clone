import Loader from "@/components/Loader";
import Button from "@auth/components/Button";
import { useAuth } from "@auth/context/useAuthContext";

const LogoutBtn = () => {
  const { user, logout, isLoading } = useAuth();
  const submitHandler = async () => {
    await logout();
  };
  return (
    user && <Button
      onClick={submitHandler}
      className="bg-red-500 px-3 py-1 hover:bg-red-600"
    >
      {isLoading ? <Loader /> : "Logout"}
    </Button>
  );
};

export default LogoutBtn;
