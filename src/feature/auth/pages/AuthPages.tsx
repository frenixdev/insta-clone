import { Outlet } from "react-router-dom";

const AuthPages = () => {
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
      <Outlet />
    </main>
  );
};

export default AuthPages;
