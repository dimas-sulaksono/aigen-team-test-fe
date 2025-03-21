import { LoadingStatus } from "@/components/molecules/LoadingStatus";
import AdminLayout from "@/components/templates/AdminLayout";
import { formatCurrency } from "@/helpers/utils/formatCurrency";
import {
  getAllPayment,
  getAmountPending,
  getAmoutPaid,
} from "@/services/payment";
import { getCountStudents } from "@/services/student";
import React, { useCallback, useEffect, useState } from "react";
import { FaMoneyBillAlt, FaUserCircle } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa6";

const AdminPage = () => {
  const [students, setStudents] = useState([]);
  const [payments, setPayments] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [recent, setRecent] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    const res = await getCountStudents();

    if (res.status) {
      setStudents(res.data);
    }
    setLoading(false);
  }, []);

  const fetchPaymentsPaid = useCallback(async () => {
    const res = await getAmoutPaid();
    if (res.status) {
      setPayments(res.data);
    }
  }, []);

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    const res = await getAllPayment(0, 5);
    // console.log(res);

    if (res.status) {
      const data = res.data.content
        .slice(0, 5)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setRecent(data);
    }
    setLoading(false);
  }, []);

  const fetchPaymentPending = useCallback(async () => {
    const res = await getAmountPending();
    if (res.status) {
      setTransactions(res.data);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
    fetchPayments();
    fetchPaymentsPaid();
    fetchPaymentPending();
  }, [fetchStudents, fetchPayments, fetchPaymentPending, fetchPaymentsPaid]);

  console.log("ini payments :", recent);

  return (
    <AdminLayout>
      <main className="relative flex-1 p-8">
        {loading && <LoadingStatus />}

        <div className="mb-8 grid grid-cols-3 gap-3">
          <div className="rounded bg-white p-4">
            <h3 className="mb-2 text-sm font-semibold lg:text-lg">
              Total Students
            </h3>
            <div className="flex items-center">
              <span className="text-md mr-2 font-bold lg:text-xl">
                {students}
              </span>
              <FaUserGraduate className="text-amber-500 lg:text-xl" />
            </div>
          </div>
          <div className="rounded bg-white p-4">
            <h3 className="mb-2 text-sm font-semibold lg:text-lg">
              Total Payments
            </h3>
            <div className="flex items-center">
              <span className="text-md mr-2 font-bold lg:text-xl">
                {formatCurrency(payments, "id-ID", "IDR")}
              </span>
              <FaMoneyBillAlt className="text-blue-500 lg:text-xl" />
            </div>
          </div>
          <div className="rounded bg-white p-4">
            <h3 className="mb-2 text-sm font-semibold lg:text-lg">
              Pending Payments
            </h3>
            <div className="flex items-center">
              <span className="text-md mr-2 font-bold lg:text-xl">
                {formatCurrency(transactions, "id-ID", "IDR")}
              </span>
              <FaMoneyBillAlt className="text-green-500 lg:text-xl" />
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="rounded bg-white p-4">
          <h2 className="mb-4 text-xl font-semibold">Recent Transactions</h2>
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
              {recent.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2">
                    <div className="flex items-center">
                      <FaUserCircle className="mr-2 h-8 w-8" />
                      {item?.name}
                    </div>
                  </td>
                  <td className="py-2">{item?.id}</td>
                  <td className="py-2">
                    {formatCurrency(item?.amount, "id-ID", "IDR")}
                  </td>
                  <td className="py-2">
                    <span
                      className={`rounded px-2 py-1 ${
                        item?.status?.toLowerCase() === "paid"
                          ? "w-10 bg-green-200 text-green-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {item?.status}
                    </span>
                  </td>
                  <td className="py-2">
                    {new Date(item?.createdAt).toISOString().split("T")[0]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </AdminLayout>
  );
};

export default AdminPage;
