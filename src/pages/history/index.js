import { Row } from "@/components/atoms/Row";
import Bar from "@/components/molecules/HistoryBar";
import { LoadingStatus } from "@/components/molecules/LoadingStatus";
import { Pagination } from "@/components/molecules/Pagination";
import { Details } from "@/components/molecules/PaymentDetails";
import { downloadPDF, getUserPaymentHistory } from "@/services/payment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const HistoryPage = () => {
  const router = useRouter();
  const [data, setData] = useState();
  const [dataDetails, setDataDetails] = useState({});
  const [pageable, setPageable] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchPaymentUser = async () => {
    setIsLoading(true);
    const response = await getUserPaymentHistory(router.query);
    if (response.status) {
      const { content, ...pageable } = response.data;
      setData(content);
      setPageable(pageable);
    }
    setIsLoading(false);
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
    <section className="relative flex flex-grow flex-col bg-gray-50">
      <div className="mx-auto flex w-full max-w-screen-xl flex-grow flex-col p-3 px-4 sm:p-5 lg:px-12">
        <div className="relative flex flex-grow flex-col overflow-hidden bg-white shadow-md sm:rounded-lg">
          {/* Search & Filter */}
          <Bar />
          {/* Table */}
          <div className="h-full flex-grow overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
              {/* Table Head */}
              <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
                <tr>
                  <th scope="col" className="w-3/5 truncate px-10 py-3">
                    Payment Name
                  </th>

                  <th scope="col" className="w-1/5 px-4 py-3">
                    Status
                  </th>
                  <th scope="col" className="w-1/5 px-4 py-3">
                    {/* <span className="sr-only">Actions</span> */}
                    Actions
                  </th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {data?.map((item) => (
                  <Row
                    key={item.id}
                    data={item}
                    handleShow={handleShow}
                    setDataDetails={setDataDetails}
                    handleDownload={handleDownload}
                  />
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          {pageable && <Pagination pageable={pageable} />}
        </div>
      </div>
      <div
        id="details"
        className="absolute hidden h-full w-full flex-col items-center justify-center bg-gray-300/60"
      >
        <Details
          handleShow={handleShow}
          data={dataDetails}
          handleDownload={handleDownload}
        />
      </div>
      {isLoading && <LoadingStatus />}
    </section>
  );
};

export default HistoryPage;
