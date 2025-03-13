import Button from "@/components/atoms/Button";
import useSignOut from "@/hooks/useSignOut";
import { closeAll, toggleDropdown } from "@/redux/navbarReduce";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FaCog, FaMoneyBillAlt, FaTachometerAlt } from "react-icons/fa";
import { FaAngleDown, FaFileInvoiceDollar, FaUserGraduate } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

const SideBarAdmin = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { dropdownOpen } = useSelector((state) => state.navbar);
  const { signOut } = useSignOut();

  const isActive = (path) => router.asPath === path;

  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <aside className="w-56 bg-white text-gray-700 p-4 shadow-lg flex flex-col h-full">
        <div className="flex items-center gap-2 mb-6">
          <FaGraduationCap size={24} className="text-gray-600" />
          <h1 className="font-semibold text-lg">
            SchoolPay <span className="text-blue-600">Admin</span>
          </h1>
        </div>

        <nav className="flex flex-col space-y-2">
          <Link
            href="/admin"
            className={`flex items-center p-2 rounded ${
              isActive("/admin") ? "bg-gray-300" : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            <FaTachometerAlt className="mr-2" />
            Dashboard
          </Link>
          <Link
            href="/admin/students"
            className={`flex items-center p-2 rounded ${
              isActive("/admin/students") ? "bg-gray-300" : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            <FaUserGraduate className="mr-2" />
            Students
          </Link>
          <Link
            href="/admin/payments"
            className={`flex items-center p-2 rounded ${
              isActive("/admin/payments") ? "bg-gray-300" : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            <FaMoneyBillAlt className="mr-2" />
            Payments
          </Link>
          <Link
            href="/admin/invoices"
            className={`flex items-center p-2 rounded ${
              isActive("/admin/invoices") ? "bg-gray-300" : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            <FaFileInvoiceDollar className="mr-2" />
            Invoices
          </Link>

          {/* Settings Dropdown */}
          <div className="relative">
            <button
              className="flex items-center justify-between p-2 rounded w-full text-gray-600 hover:bg-gray-200"
              onClick={() => dispatch(toggleDropdown())}
            >
              <div className="flex items-center">
                <FaCog className="mr-2" />
                Settings
              </div>
              <FaAngleDown className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 w-full mt-2 bg-white shadow-md rounded-lg">
                <ul className="py-2 text-sm">
                  <li>
                    <Button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => dispatch(closeAll())}
                    >
                      Class
                    </Button>
                  </li>
                  <li>
                    <Button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => dispatch(closeAll())}
                    >
                      School Year
                    </Button>
                  </li>
                  <li>
                    <Button
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
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

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">{children}</div>
    </div>
  );
};

export default SideBarAdmin;
