import Link from "next/link";
import React from "react";
import { FaRegUser, FaBars } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import LogoIcon from "@/components/molecules/LogoIcon";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { closeAll, toggleDropdown, toggleMenu } from "@/redux/navbarReduce";
import useSignOut from "@/hooks/useSignOut";
import Button from "@/components/atoms/Button";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { menuOpen, dropdownOpen } = useSelector((state) => state.navbar);
  const { signOut } = useSignOut();

  const isActive = (path) => router.asPath === path;

  return (
    <nav className="bg-white shadow sticky top-0 z-10">
      <div className="container mx-auto lg:px-10 px-5 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3.5">
          <Link href="/">
            <LogoIcon size={24} />
          </Link>

          <ul className="md:flex md:space-x-6 hidden">
            {["/payments", "/history", "/support"].map((path, index) => (
              <li key={index}>
                <Link
                  href={path}
                  className={`font-medium hover:border-b-2 text-sm ${
                    isActive(path)
                      ? "text-black font-bold border-b-2 border-black"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {path.replace("/", "").toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center space-x-4">
          <IoMdNotificationsOutline className="text-gray-600 hover:text-gray-800 cursor-pointer text-xl" />

          <div className="relative">
            <FaRegUser
              onClick={() => dispatch(toggleDropdown())}
              className="text-gray-600 hover:text-gray-800 cursor-pointer text-xl"
            />
            {dropdownOpen && (
              <div className="absolute right-0 bg-white shadow-lg w-40 rounded-lg">
                <ul>
                  <li>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                      onClick={() => dispatch(closeAll())}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Button
                      className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
                      onClick={() => {
                        signOut;
                        dispatch(closeAll());
                      }}
                    >
                      Logout
                    </Button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <FaBars
            className="lg:hidden text-gray-600 hover:text-gray-800 cursor-pointer text-2xl"
            onClick={() => dispatch(toggleMenu())}
          />
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg lg:hidden transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform`}
      >
        <div className="p-5">
          <Button
            className="text-gray-600 hover:text-gray-800 text-xl"
            onClick={() => dispatch(closeAll())}
          >
            ✖
          </Button>
          <ul className="mt-6 space-y-4 text-lg">
            {["/payments", "/history", "/support"].map((path, index) => (
              <li key={index}>
                <Link
                  href={path}
                  className={`block p-2 ${
                    isActive(path)
                      ? "text-black font-bold border-l-4 border-black pl-3"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => dispatch(closeAll())}
                >
                  {path.replace("/", "").toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
