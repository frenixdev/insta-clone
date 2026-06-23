import Button from "../auth/components/Button";
import useAuthStore from "../auth/Store/auth.store";

const Profile = () => {
  const logout = useAuthStore((s) => s.logout);
  
  return (
    <div>
      <Button className="px-5 py-2 bg-red-500" onClick={logout}>
        Logout
      </Button>
    </div>
  );
};

export default Profile;
