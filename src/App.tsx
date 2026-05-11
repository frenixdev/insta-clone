import { Route, Routes } from "react-router-dom";
import Login from "./feature/auth/pages/Login";
import Register from "./feature/auth/pages/Register";
import Home from "./feature/Home/pages/Home";

function App() {
  return (
    <Routes>
      <Route element={<Login />} path="/login" />
      <Route element={<Register />} path="/register" />
      <Route element={<Home />} path="/" />
    </Routes>
  );
}

export default App;
