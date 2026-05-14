import Loader from "../../../components/Loader";
import LogoutBtn from "../../auth/components/LogoutBtn";
import { useAuth } from "../../auth/context/useAuthContext";

const Home = () => {
  const { user } = useAuth();
  if (!user)
    return (
      <main className="h-screen w-full">
        <Loader />;
      </main>
    );
  return (
    <div>
      <p>{user.username}</p>
      <LogoutBtn />
    </div>
  );
};

export default Home;
