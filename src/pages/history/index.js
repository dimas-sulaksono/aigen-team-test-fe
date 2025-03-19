import { Row } from '@/components/atoms/Row';
import Bar from '@/components/molecules/HistoryBar';
import { Pagination } from '@/components/molecules/Pagination';
import { Details } from '@/components/molecules/PaymentDetails';
import { downloadPDF, getUserPaymentHistory } from '@/services/payment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const HistoryPage = () => {
  const router = useRouter();
  const [data, setData] = useState();
  const [dataDetails, setDataDetails] = useState({});
  const [pageable, setPageable] = useState();

  const fetchPaymentUser = async () => {

    const response = await getUserPaymentHistory(router.query);
    if (response.status) {
      const { content, ...pageable } = response.data;
      setData(content);
      setPageable(pageable);

    }

  };


  useEffect(() => {
    if (!localStorage.getItem("token")) router.replace("/auth/login");
    fetchPaymentUser();
  }, [router]);

  const handleShow = () => {

    const element = document.getElementById("details");
    element.classList.toggle("hidden");
    element.classList.toggle("z-10");
    element.classList.toggle("flex");
  };

  const handleDownload = (payload) => {
    console.log(payload);
    downloadPDF(payload);

  };

  return (

    <section className="bg-gray-50 flex-grow flex flex-col relative">
      <div className="p-3 sm:p-5 mx-auto max-w-screen-xl px-4 lg:px-12 w-full flex-grow flex flex-col">
        <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden flex-grow flex flex-col">
          {/* Search & Filter */}
          <Bar />
          {/* Table */}
          <div className="h-full overflow-x-auto flex-grow">
            <table className="w-full text-sm text-left text-gray-500 ">
              {/* Table Head */}
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-10 py-3 w-3/5 truncate">
                    Payment Name
                  </th>

                  <th scope="col" className="px-4 py-3 w-1/5">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3 w-1/5">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {data?.map(item => (

                  <Row key={item.id} data={item} handleShow={handleShow} setDataDetails={setDataDetails} handleDownload={handleDownload} />
                ))}

              </tbody>
            </table>
          </div>
          {/* Pagination */}
          {pageable && (
            <Pagination pageable={pageable} />
          )}
        </div>
      </div>
      <div id="details" className="absolute hidden bg-gray-300/60 w-full h-full flex-col justify-center items-center">
        <Details handleShow={handleShow} data={dataDetails} handleDownload={handleDownload} />
      </div>
    </section>


  );
};




export default HistoryPage;