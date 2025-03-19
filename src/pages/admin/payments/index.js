import Section from '@/components/atoms/Section';
import { Pagination } from '@/components/molecules/Pagination';
import AdminLayout from '@/components/templates/AdminLayout';
import { getAllPayment } from '@/services/payment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const PaymentsAdminPage = () => {
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

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    fetchAllPayment();
  }, [router]);

  const fetchAllPayment = async () => {
    console.log("Fetching data ..");

    const response = await getAllPayment(router.query);
    if (response.status) {
      console.log(response.data);

      const { content, ...pageable } = response.data;
      setData(content);
      setPageable(pageable);

    } else {
      console.log(response.message);

    }
  };

  return (
    <AdminLayout>
      <section className='h-full'>
        <div className="relative h-full overflow-x-auto shadow-md sm:rounded-lg flex flex-col border-red-500">
          <div className='grow'>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4">
                      <p>{index + 1}</p>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
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
          {/* Pagination */}
          {pageable && (
            <Pagination pageable={pageable} />
          )}
        </div>

      </section>
    </AdminLayout>
  );
};

export default PaymentsAdminPage;