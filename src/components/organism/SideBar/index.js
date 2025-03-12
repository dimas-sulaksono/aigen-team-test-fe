import Button from "@/components/atoms/Button";
import useSignOut from "@/hooks/useSignOut";
import { closeAll, toggleDropdown } from "@/redux/navbarReduce";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FaCog, FaMoneyBillAlt, FaTachometerAlt } from "react-icons/fa";
import {
  FaAngleDown,
  FaFileInvoiceDollar,
  FaUserGraduate,
} from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

const SideBarAdmin = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { dropdownOpen } = useSelector((state) => state.navbar);
  const { signOut } = useSignOut();

  const isActive = (path) => router.asPath === path;
  return (
    <div className="flex flex-col w-full">
      <nav className="bg-white top-0 w-full fixed shadow-lg">
        <div className="container mx-auto lg:px-6 px-5 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3.5">
            <Link href="/" className="flex items-center gap-1.5">
              <FaGraduationCap size={24} className="text-gray-600" />
              <h1 className="font-semibold text-xl ">
                SchoolPay <span className="text-blue-600">Admin</span>
              </h1>
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex min-h-screen bg-gray-100 mt-14">
        <aside
          className={`w-56 bg-white text-gray-700 p-4 min-h-screen shadow-lg fixed`}
        >
          <nav>
            <Link
              href="/admin"
              className={`flex items-center p-2 rounded mb-2 ${
                isActive("/admin")
                  ? "bg-gray-300"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-300"
              }`}
            >
              <FaTachometerAlt className="mr-2" />
              Dashboard
            </Link>
            <Link
              href="/admin/students"
              className={`flex items-center p-2 rounded mb-2 ${
                isActive("/admin/students")
                  ? "bg-gray-300"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-300"
              }`}
            >
              <FaUserGraduate className="mr-2" />
              Students
            </Link>
            <Link
              href="#"
              className={`flex items-center p-2 rounded mb-2 ${
                isActive("/admin/payments")
                  ? "bg-gray-300"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-300"
              }`}
            >
              <FaMoneyBillAlt className="mr-2" />
              Payments
            </Link>
            <Link
              href="#"
              className={`flex items-center p-2 rounded mb-2 ${
                isActive("/admin/invoices")
                  ? "bg-gray-300"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-300"
              }`}
            >
              <FaFileInvoiceDollar className="mr-2" />
              Invoices
            </Link>
            <div className="flex items-center p-2 rounded hover:bg-gray-300 mb-2 relative">
              <div
                className="flex w-full justify-between items-center cursor-pointer"
                onClick={() => dispatch(toggleDropdown())}
              >
                <div className="flex items-center">
                  <FaCog className="mr-2" />
                  Settings
                </div>
                <FaAngleDown
                  className={` transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
              {dropdownOpen && (
                <div className="absolute mt-20 left-0 z-40 bg-gray-50 w-full shadow-lg rounded-lg">
                  <ul>
                    <li>
                      <Button
                        className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
                        onClick={() => {
                          signOut();
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
          </nav>
        </aside>
        <div className="lg:ml-56 w-full">{children}</div>
      </div>
    </div>
  );
};

export default SideBarAdmin;
