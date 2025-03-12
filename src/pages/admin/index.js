import AdminLayout from "@/components/templates/AdminLayout";
import React from "react";
import { FaMoneyBillAlt, FaUserCircle } from "react-icons/fa";
import { FaBell, FaChartLine, FaUserGraduate } from "react-icons/fa6";

const AdminPage = () => {
  return (
    <AdminLayout>
      <main className="flex-1 p-8">
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded p-4">
            <h3 className="lg:text-lg text-sm font-semibold mb-2">
              Total Students
            </h3>
            <div className="flex items-center">
              <span className="lg:text-3xl text-md font-bold mr-2">2,543</span>
              <FaUserGraduate className="text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded p-4">
            <h3 className="lg:text-lg text-sm font-semibold mb-2">
              Total Payments
            </h3>
            <div className="flex items-center">
              <span className="lg:text-3xl text-md font-bold mr-2">
                $234,567
              </span>
              <FaMoneyBillAlt className="text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded p-4">
            <h3 className="lg:text-lg text-sm font-semibold mb-2">
              Pending Payments
            </h3>
            <div className="flex items-center">
              <span className="lg:text-3xl text-md font-bold mr-2">
                $12,345
              </span>
              <FaMoneyBillAlt className="text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded p-4">
            <h3 className="lg:text-lg text-sm font-semibold mb-2">
              Today{"'"}s Collection
            </h3>
            <div className="flex items-center">
              <span className="lg:text-3xl text-md font-bold mr-2">$3,456</span>
              <FaChartLine className="text-gray-500" />
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded p-4">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="py-2">Student</th>
                <th className="py-2">Payment ID</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Status</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="py-2">
                  <div className="flex items-center">
                    <FaUserCircle className="h-8 w-8 mr-2" />
                    John Doe
                  </div>
                </td>
                <td className="py-2">#PAY-2025001</td>
                <td className="py-2">$500</td>
                <td className="py-2">
                  <span className="bg-green-200 text-green-800 px-2 py-1 rounded">
                    Completed
                  </span>
                </td>
                <td className="py-2">Jan 15, 2025</td>
              </tr>
              <tr className="border-t">
                <td className="py-2">
                  <div className="flex items-center">
                    <FaUserCircle className="h-8 w-8 mr-2" />
                    Jane Smith
                  </div>
                </td>
                <td className="py-2">#PAY-2025002</td>
                <td className="py-2">$750</td>
                <td className="py-2">
                  <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                    Pending
                  </span>
                </td>
                <td className="py-2">Jan 14, 2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </AdminLayout>
  );
};

export default AdminPage;
