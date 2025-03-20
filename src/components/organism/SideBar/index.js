import Button from "@/components/atoms/Button";
import useSignOut from "@/hooks/useSignOut";
import { closeAll, toggleDropdown } from "@/redux/navbarReduce";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  FaCog,
  FaHome,
  FaMoneyBillAlt,
  FaSignOutAlt,
  FaTachometerAlt,
  FaRegUser,
} from "react-icons/fa";
import { FaAngleDown, FaUserGraduate } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

const SideBarAdmin = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { dropdownOpen } = useSelector((state) => state.navbar);
  const { signOut } = useSignOut();

  const isActive = (path) => router.asPath === path;

  return (
    <div className="flex h-screen">
      <aside className="flex h-full w-56 flex-col bg-white p-4 text-gray-700 shadow-lg">
        <div className="mb-6 flex items-center gap-2">
          <FaGraduationCap size={24} className="text-gray-600" />
          <h1 className="text-lg font-semibold">
            SchoolPay <span className="text-blue-600">Admin</span>
          </h1>
        </div>

        <nav className="flex flex-col space-y-2">
          <Link
            href="/admin"
            className={`flex items-center rounded p-2 ${
              isActive("/admin")
                ? "bg-gray-300"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            <FaTachometerAlt className="mr-2" />
            Dashboard
          </Link>
          <Link
            href="/admin/students"
            className={`flex items-center rounded p-2 ${
              isActive("/admin/students")
                ? "bg-gray-300"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            <FaUserGraduate className="mr-2" />
            Students
          </Link>
          <Link
            href="/admin/settings/class"
            className={`flex items-center rounded p-2 ${
              isActive("/admin/settings/class")
                ? "bg-gray-300"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            <FaHome className="mr-2" />
            Class
          </Link>
          <Link
            href="/admin/user"
            className={`flex items-center rounded p-2 ${
              isActive("/admin/user")
                ? "bg-gray-300"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            <FaRegUser className="mr-2" />
            User
          </Link>
          <Link
            href="/admin/payments"
            className={`flex items-center rounded p-2 ${
              isActive("/admin/payments")
                ? "bg-gray-300"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            <FaMoneyBillAlt className="mr-2" />
            Payments
          </Link>

          <div className="relative">
            <button
              className="flex w-full items-center justify-between rounded p-2 text-gray-600 hover:bg-gray-200"
              onClick={() => dispatch(toggleDropdown())}
            >
              <div className="flex items-center">
                <FaCog className="mr-2" />
                Settings
              </div>
              <FaAngleDown
                className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-full rounded-lg bg-white shadow-md">
                <ul className="py-2 text-sm">
                  <li>
                    <Link
                      href={"/admin/settings/school-year"}
                      className={`block w-full px-4 py-2 text-left hover:bg-gray-100 ${
                        isActive("/admin/settings/school-year")
                          ? "bg-gray-300"
                          : "text-gray-600 hover:bg-gray-200"
                      }`}
                      onClick={() => dispatch(closeAll())}
                    >
                      School Year
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/admin/settings/payment-type"}
                      className={`block w-full px-4 py-2 text-left hover:bg-gray-100 ${
                        isActive("/admin/settings/payment-type")
                          ? "bg-gray-300"
                          : "text-gray-600 hover:bg-gray-200"
                      }`}
                      onClick={() => dispatch(closeAll())}
                    >
                      Payment Type
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div
            className={`flex items-center rounded p-2 text-gray-600 hover:bg-gray-200`}
          >
            <FaSignOutAlt className="mr-2" />
            <Button
              className="block w-full text-left text-red-600 hover:bg-red-100"
              onClick={() => {
                signOut();
                dispatch(closeAll());
              }}
            >
              Logout
            </Button>
          </div>
        </nav>
      </aside>

      <div className="flex-1 overflow-auto bg-gray-100 p-6">{children}</div>
    </div>
  );
};

export default SideBarAdmin;
