import Loader from "../../../components/Loader";
import Button from "../../auth/components/Button";
import { useAuth } from "../../auth/context/useAuthContext";

const Home = () => {
  const { user, logout } = useAuth();
  if (!user) return <Loader />;
  const submitHandler = async () => {
    await logout();
  };
  return (
    <div>
      <p>{user.username}</p>
      <Button onClick={submitHandler}
      className="bg-red-500 px-3 py-1 hover:bg-red-600"
      >Logout</Button>
    </div>
  );
};

export default Home;
