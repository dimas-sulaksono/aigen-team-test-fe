import Link from "next/link";
import React from "react";
import { FaCog, FaMoneyBillAlt, FaTachometerAlt } from "react-icons/fa";
import { FaFileInvoiceDollar, FaUserGraduate } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa6";

const SideBarAdmin = ({ children }) => {
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
              href="#"
              className="flex items-center p-2 rounded hover:bg-gray-300 mb-2"
            >
              <FaTachometerAlt className="mr-2" />
              Dashboard
            </Link>
            <Link
              href="#"
              className="flex items-center p-2 rounded hover:bg-gray-300 mb-2"
            >
              <FaUserGraduate className="mr-2" />
              Students
            </Link>
            <Link
              href="#"
              className="flex items-center p-2 rounded hover:bg-gray-300 mb-2"
            >
              <FaMoneyBillAlt className="mr-2" />
              Payments
            </Link>
            <Link
              href="#"
              className="flex items-center p-2 rounded hover:bg-gray-300 mb-2"
            >
              <FaFileInvoiceDollar className="mr-2" />
              Invoices
            </Link>
            <Link
              href="#"
              className="flex items-center p-2 rounded hover:bg-gray-300 mb-2"
            >
              <FaCog className="mr-2" />
              Settings
            </Link>
          </nav>
        </aside>
        <div className="lg:ml-56 w-full">{children}</div>
      </div>
    </div>
  );
};

export default SideBarAdmin;
