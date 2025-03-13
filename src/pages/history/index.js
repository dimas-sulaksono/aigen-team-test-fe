import { Row } from '@/components/atoms/Row';
import Bar from '@/components/molecules/HistoryBar';
import { Pagination } from '@/components/molecules/Pagination';
import { getUserPaymentHistory } from '@/services/payment';
import React, { useEffect, useState } from 'react';

const HistoryPage = () => {
  const [data, setData] = useState();
  const [pageable, setPageable] = useState();

  const fetchPaymentUser = async () => {
    console.log("Fetch payment user berjalan!");

    const response = await getUserPaymentHistory();
    if (response.status) {
      const { content, ...pageable } = response.data;
      setData(content);
      setPageable(pageable);

    } else {
      console.log(response.message);
    }

  };

  useEffect(() => {
    fetchPaymentUser();
  }, []);


  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 flex-grow flex flex-col">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12 w-full flex-grow flex flex-col">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden flex-grow flex flex-col">
          {/* Search & Filter */}
          <Bar />
          {/* Table */}
          <div className="h-full overflow-x-auto flex-grow">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
              {/* Table Head */}
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Payment type
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Payment name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    School Year
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {data?.map(item => (
                  <Row key={item.id} data={item} />
                ))}

              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <Pagination pageable={pageable} />
        </div>
      </div>
    </section>

  );
};




export default HistoryPage;