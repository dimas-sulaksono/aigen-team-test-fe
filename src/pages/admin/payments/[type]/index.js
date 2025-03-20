import Section from '@/components/atoms/Section';
import FilterDropdown from '@/components/molecules/HistoryBar';
import { LoadingStatus } from '@/components/molecules/LoadingStatus';
import { Pagination } from '@/components/molecules/Pagination';
import { PaymentBar } from '@/components/molecules/PaymentBar';
import AdminLayout from '@/components/templates/AdminLayout';
import { getAllPayment, getFilterPayment } from '@/services/payment';
import { getAllPaymentType } from '@/services/paymentType';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const PaymentsAdminPage = ({ paymentType }) => {

  const router = useRouter();
  const [data, setData] = useState([{
    "id": null,
    "name": "",
    "user": {
      "id": null,
      "name": ""
    },
    "student": {
      "nis": "",
      "name": ""
    },
    "type": "",
    "schoolYear": "",
    "amount": null,
    "status": "",
    "description": "",
    "createdAt": null,
    "updatedAt": null,
    "deletedAt": null
  }]);
  const [pageable, setPageable] = useState({
    "pageable": {
      "pageNumber": null,
      "pageSize": null,
      "sort": {
        "empty": false,
        "sorted": true,
        "unsorted": false
      },
      "offset": 0,
      "paged": true,
      "unpaged": false
    },
    "last": true,
    "totalPages": 0,
    "totalElements": 0,
    "size": 1,
    "number": 0,
    "sort": {
      "empty": false,
      "sorted": true,
      "unsorted": false
    },
    "first": true,
    "numberOfElements": 0,
    "empty": true
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    fetchDataPayment();
  }, [router]);

  const fetchDataPayment = async () => {
    console.log("Fetching data ..");

    if (!Object.keys(router.query).length) {
      const response = await getAllPayment();
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
    if (e.target.value) {
      router.push("/admin/payments/" + e.target.value);
      return;
    }
    router.push("/admin/payments");
  };




  return (
    <AdminLayout>
      <section className='h-full px-10 py-4 relative'>
        <div className="relative h-full overflow-x-auto shadow-md sm:rounded-lg flex flex-col border-red-500 p-4 bg-white">
          <div className='flex gap-5'>
            <p>Payment List</p>
            <select onChange={handleOnChangeType} id="type" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-52 p-2.5 ">
              <option value={""}>ALL</option>
              {paymentType?.map((item) => (

                <option key={item.id} value={item.paymentTypeName} selected={router.query.type == item.paymentTypeName}>{item.paymentTypeName}</option>
              ))}
            </select>
          </div>
          {/* Bar */}
          <PaymentBar />
          <div className='grow'>
            {/* Table */}
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
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
                  <tr key={index} className="bg-white border-b border-gray-200 hover:bg-gray-50 ">
                    <td className="w-4 p-4">
                      <p>{index + 1}</p>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {item.name}
                    </th>
                    <td className="px-6 py-4">{item.user.name}</td>
                    <td className="px-6 py-4">{item.student.nis}</td>
                    <td className="px-6 py-4">{item.student.name}</td>
                    <td className="px-6 py-4">{item.status}</td>
                    <td className="px-6 py-4">{item.amount}</td>
                    <td className="px-6 py-4">Action</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Pagination */}
        {pageable && (
          <Pagination pageable={pageable} />
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
      }
    };
  }
  return {
    props: {
      paymentType: null,
    }
  };
}

export default PaymentsAdminPage;
