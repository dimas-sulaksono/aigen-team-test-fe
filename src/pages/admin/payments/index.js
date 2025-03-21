import { RowPayment } from "@/components/atoms/RowPayment";
import { LoadingStatus } from "@/components/molecules/LoadingStatus";
import { Pagination } from "@/components/molecules/Pagination";
import { PaymentBar } from "@/components/molecules/PaymentBar";
import PaymentDetailModal from "@/components/molecules/PaymentDetailModal";
import UpdateStatusModal from "@/components/molecules/PaymentUpdateModal";
import AdminLayout from "@/components/templates/AdminLayout";
import { getAllPayment, getFilterPayment } from "@/services/payment";
import { getAllPaymentType } from "@/services/paymentType";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const PaymentsAdminPage = ({ paymentType }) => {
  const router = useRouter();
  const [data, setData] = useState([
    {
      id: null,
      name: "",
      user: {
        id: null,
        name: "",
      },
      student: {
        nis: "",
        name: "",
      },
      type: "",
      schoolYear: "",
      amount: null,
      status: "",
      description: "",
      createdAt: null,
      updatedAt: null,
      deletedAt: null,
    },
  ]);
  const [pageable, setPageable] = useState({
    pageable: {
      pageNumber: null,
      pageSize: null,
      sort: {
        empty: false,
        sorted: true,
        unsorted: false,
      },
      offset: 0,
      paged: true,
      unpaged: false,
    },
    last: true,
    totalPages: 0,
    totalElements: 0,
    size: 1,
    number: 0,
    sort: {
      empty: false,
      sorted: true,
      unsorted: false,
    },
    first: true,
    numberOfElements: 0,
    empty: true,
  });
  const [selectedData, setSelectedData] = useState();
  const [selectedDataUpdate, setSelectedDataUpdate] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDataPayment();
  }, [router]);

  const fetchDataPayment = async () => {
    setIsLoading(true);

    if (!Object.keys(router.query).length) {
      const response = await getAllPayment();
      if (response.status) {
        const { content, ...pageable } = response.data;
        setData(content);
        setPageable(pageable);
      } else {
        console.log(response.message);
      }
      setIsLoading(false);
      return;
    }

    const response = await getFilterPayment(router.query);
    if (response.status) {
      console.log(response.data);
      const { content, ...pageable } = response.data;
      setData(content);
      setPageable(pageable);
    } else {
      console.log(response.message);
    }
    setIsLoading(false);
    return;
  };

  const handleOnChangeType = (e) => {
    if (e.target.value) router.push(router.pathname + "/" + e.target.value);
  };

  return (
    <AdminLayout>
      <section className="relative h-full py-4">
        <div className="relative flex flex-col overflow-x-auto bg-white p-4 shadow-md sm:rounded-lg">
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold">Payment List</span>
            <select
              onChange={handleOnChangeType}
              id="type"
              className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring focus:ring-blue-200 focus:outline-none"
            >
              <option value="">All</option>
              {paymentType?.map((item) => (
                <option key={item.id} value={item.paymentTypeName}>
                  {item.paymentTypeName}
                </option>
              ))}
            </select>
          </div>
          {/* Bar */}
          <PaymentBar />
          <div className="grow">
            {/* Table */}
            <table className="w-full text-left text-sm text-gray-500 rtl:text-right">
              <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nis
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Student
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <RowPayment
                    key={index}
                    index={index}
                    item={item}
                    handleSelect={setSelectedData}
                    handleUpdate={setSelectedDataUpdate}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Pagination */}
        {pageable && <Pagination pageable={pageable} />}

        {selectedData && (
          <PaymentDetailModal
            data={selectedData}
            onClose={() => {
              setSelectedData(null);
            }}
          />
        )}
        {selectedDataUpdate && (
          <UpdateStatusModal
            data={selectedDataUpdate}
            onClose={() => {
              setSelectedDataUpdate(null);
            }}
            onSuccess={fetchDataPayment}
          />
        )}

        {isLoading && <LoadingStatus />}
      </section>
    </AdminLayout>
  );
};

export async function getServerSideProps() {
  const response = await getAllPaymentType();
  if (response.status) {
    return {
      props: {
        paymentType: response.data.data.content,
      },
    };
  }
  return {
    props: {
      paymentType: null,
    },
  };
}

export default PaymentsAdminPage;
