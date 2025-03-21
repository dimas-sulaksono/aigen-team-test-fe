import Button from "@/components/atoms/Button";
import Section from "@/components/atoms/Section";
import AdminLayout from "@/components/templates/AdminLayout";
import { getAllPaymentType, searchPaymentType } from "@/services/paymentType";
import React, { useCallback, useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import AddPaymentTypeModal from "./AddPaymentTypeModal";
import EditPaymentTypeModal from "./EditPaymentTypeModal";
import DeletePaymentTypeModal from "./deletePaymentTypeModal";
import Form from "@/components/atoms/Form";
import Input from "@/components/atoms/Input";
import { useRouter } from "next/router";
import { LoadingStatus } from "@/components/molecules/LoadingStatus";
const SettingSchoolYearAdminPage = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [addData, setAddData] = useState(false);
  const [editData, setEditData] = useState(false);
  const [deleteData, setDeleteData] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await getAllPaymentType(currentPage, itemsPerPage);
    if (res.status) {
      setData(res.data?.data?.content);
      setTotalElements(res.data.data.totalElements);
      setTotalPages(res.data.data.totalPages);
    }
    setLoading(false);
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchData();
  }, [refresh, fetchData]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const keyword = e.target.search.value;
    router.push({
      pathname: "/admin/settings/payment-type",
      query: { keyword },
    });
    try {
      const response = await searchPaymentType(keyword);
      console.log(response);

      if (response.status) {
        const searchData = response.data.data.content;
        setData(searchData);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    router.push(
      {
        pathname: "/admin/settings/payment-type",
        query: { ...router.query, page, size: itemsPerPage },
      },
      undefined,
      { shallow: true },
    );
  };

  return (
    <>
      <AdminLayout>
        <Section className={"relative"}>
          {loading && <LoadingStatus />}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="mb-4 flex w-full flex-col">
              <h2 className="pb-4 text-xl font-semibold text-gray-700">
                Payment List
              </h2>
              <div className="flex flex-row justify-between">
                <Button
                  onClick={() => setAddData(true)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700"
                >
                  + Add Payment List
                </Button>
                <Form
                  onSubmit={handleSearch}
                  className="flex flex-row items-center overflow-hidden rounded-md border border-gray-300"
                >
                  <Input
                    type="text"
                    name="search"
                    placeholder="Search invoice"
                    className="border-0 bg-gray-50 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600"
                  />
                  <Button
                    type={"submit"}
                    className="h-full cursor-pointer bg-blue-600 px-2 text-sm text-white"
                  >
                    Search
                  </Button>
                </Form>
              </div>
            </div>

            <hr className="my-4 text-slate-200" />

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="border-b border-gray-300 bg-gray-50 text-xs uppercase">
                  <tr>
                    <th className="py-3 pl-4">No</th>
                    <th className="py-3 pl-2">Name</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-200 bg-white hover:bg-gray-50"
                    >
                      <td className="py-4 pl-4">{index + 1}</td>
                      <td className="py-4 pl-2 font-medium whitespace-nowrap text-gray-900">
                        {item.paymentTypeName}
                      </td>
                      <td className="flex gap-3 px-6 py-4">
                        <Button
                          className="cursor-pointer text-blue-600 hover:text-blue-700"
                          onClick={() => setEditData(item)}
                        >
                          <FaRegEdit size={18} />
                        </Button>
                        <Button
                          className="cursor-pointer text-red-600 hover:text-red-700"
                          onClick={() => setDeleteData(item)}
                        >
                          <FaRegTrashCan size={18} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <span className="text-sm font-normal text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {currentPage * itemsPerPage + 1} -{" "}
                {Math.min(
                  (currentPage + 1) * itemsPerPage,
                  totalPages * itemsPerPage,
                )}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900">
                {totalPages * itemsPerPage}
              </span>
            </span>

            <ul className="inline-flex h-8 -space-x-px text-sm">
              <li>
                <Button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                  className="flex h-8 items-center justify-center rounded-s-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                >
                  Previous
                </Button>
              </li>

              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index}>
                  <Button
                    onClick={() => handlePageChange(index)}
                    className={`flex h-8 items-center justify-center border px-3 leading-tight ${currentPage === index ? "border-blue-500 text-blue-600" : "border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`}
                  >
                    {index + 1}
                  </Button>
                </li>
              ))}

              <li>
                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages - 1}
                  className="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                >
                  Next
                </Button>
              </li>
            </ul>
          </div>
        </Section>
      </AdminLayout>
      {addData && (
        <AddPaymentTypeModal
          dispatch={dispatch}
          onClose={() => setAddData(false)}
          onRefresh={() => setRefresh((prev) => !prev)}
        />
      )}
      {editData && (
        <EditPaymentTypeModal
          data={editData}
          dispatch={dispatch}
          onClose={() => setEditData(false)}
          onRefresh={() => setRefresh((prev) => !prev)}
        />
      )}
      {deleteData && (
        <DeletePaymentTypeModal
          data={deleteData}
          dispatch={dispatch}
          onClose={() => setDeleteData(false)}
          onRefresh={() => setRefresh((prev) => !prev)}
        />
      )}
    </>
  );
};

export default SettingSchoolYearAdminPage;
