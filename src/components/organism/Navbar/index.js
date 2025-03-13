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
    <nav className="sticky top-0 z-10 bg-white shadow">
      <div className="container mx-auto flex items-center justify-between px-5 py-4 lg:px-10">
        <div className="flex items-center gap-3.5">
          <Link href="/">
            <LogoIcon size={24} />
          </Link>

          <ul className="hidden md:flex md:space-x-6">
            {["/payments", "/history", "/support"].map((path, index) => (
              <li key={index}>
                <Link
                  href={path}
                  className={`text-sm font-medium hover:border-b-2 ${
                    isActive(path)
                      ? "border-b-2 border-black font-bold text-black"
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
          <IoMdNotificationsOutline className="cursor-pointer text-xl text-gray-600 hover:text-gray-800" />

          <div className="relative">
            <FaRegUser
              onClick={() => dispatch(toggleDropdown())}
              className="cursor-pointer text-xl text-gray-600 hover:text-gray-800"
            />
            {dropdownOpen && (
              <div className="absolute right-0 w-40 rounded-lg bg-white shadow-lg">
                <ul>
                  <li>
                    <Link
                      href="/userprofile"
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                      onClick={() => dispatch(closeAll())}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Button
                      className="block w-full px-4 py-2 text-left text-gray-600 hover:bg-gray-100"
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
            className="cursor-pointer text-2xl text-gray-600 hover:text-gray-800 lg:hidden"
            onClick={() => dispatch(toggleMenu())}
          />
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-64 transform bg-white shadow-lg lg:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform`}
      >
        <div className="p-5">
          <button
            className="text-xl text-gray-600 hover:text-gray-800"
            onClick={() => dispatch(closeAll())}
          >
            ✖
          </button>
          <ul className="mt-6 space-y-4 text-lg">
            {["/payments", "/history", "/support"].map((path, index) => (
              <li key={index}>
                <Link
                  href={path}
                  className={`block p-2 ${
                    isActive(path)
                      ? "border-l-4 border-black pl-3 font-bold text-black"
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
