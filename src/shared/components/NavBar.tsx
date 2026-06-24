import { FaInstagram } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { RxHamburgerMenu } from "react-icons/rx";
import {  NavLink } from "react-router-dom";
import Img from "./Img";

type Props = {
  userImg: string;
};

const NavBar = ({ userImg }: Props) => {
  return (
    <header className="w-full  h-full z-99 bg-[#121212] p-5 ">
      <nav className=" flex items-center justify-between md:flex-col h-full w-full ">
        <NavLink to="/" className=" text-3xl">
          <FaInstagram />
        </NavLink>
        <div className="w-full h-auto gap-5 flex md:flex-col justify-between px-2 md:p-0">
          <NavLink
            to="/create"
            className="flex items-center justify-center gap-1 transition-all duration-100 "
          >
            <GoPlus className=" text-3xl" />
          </NavLink>

          <NavLink
            to="/profile"
            className="h-10 aspect-square rounded-full overflow-hidden mt-auto"
          >
            <Img
              src={userImg}
              alt="user image"
              className="w-full object-center object-cover  h-full"
            />
          </NavLink>
        </div>
        <div className="hidden md:static">
          <RxHamburgerMenu className="text-3xl" />
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
