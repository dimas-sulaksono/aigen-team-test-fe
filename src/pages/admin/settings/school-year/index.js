import Button from "@/components/atoms/Button";
import Form from "@/components/atoms/Form";
import Input from "@/components/atoms/Input";
import Section from "@/components/atoms/Section";
import AdminLayout from "@/components/templates/AdminLayout";
import { getAllSchoolYear } from "@/services/schoolYear";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import AddSchoolYearModal from "./AddSchoolYearModal";
import EditSchoolYearModal from "./EditSchoolYearModal";
import DeleteSchoolYearModal from "./deleteSchoolYearModal";

const SettingSchoolYearAdminPage = () => {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [addData, setAddData] = useState(false);
  const [editData, setEditData] = useState(false);
  const [deleteData, setDeleteData] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    const res = await getAllSchoolYear(currentPage, itemsPerPage);
    if (res.status) {
      setData(res.data?.data?.content);
    }
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchData();
  }, [refresh, fetchData]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <AdminLayout>
        <Section>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="mb-4 flex w-full flex-col">
              <h2 className="pb-4 text-xl font-semibold text-gray-700">
                School year List
              </h2>
              <div className="flex flex-row justify-between">
                <Button
                  onClick={() => setAddData(true)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700"
                >
                  + Add School Year
                </Button>
              </div>
            </div>

            <hr className="my-4 text-slate-200" />

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="border-b border-gray-300 bg-gray-50 text-xs uppercase">
                  <tr>
                    <th className="py-3 pl-4">No</th>
                    <th className="py-3 pl-2">School Year</th>
                    <th className="px-6 py-3">Start Date</th>
                    <th className="px-6 py-3">End Date</th>
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
                        {item.schoolYear}
                      </td>
                      <td className="px-6 py-4">{item.startDate}</td>
                      <td className="px-6 py-4">{item.endDate}</td>
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

          <nav
            className="flex-column flex items-center justify-end py-4 md:flex-row"
            aria-label="Table navigation"
          >
            <ul className="inline-flex h-8 -space-x-px text-sm rtl:space-x-reverse">
              <li>
                <Button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`ms-0 flex h-8 items-center justify-center rounded-s-lg border border-gray-300 px-3 leading-tight ${currentPage === 1 ? "cursor-not-allowed bg-gray-200 text-gray-400" : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`}
                >
                  Previous
                </Button>
              </li>

              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i}>
                  <Button
                    onClick={() => handlePageChange(i + 1)}
                    className={`flex h-8 items-center justify-center border px-3 leading-tight ${currentPage === i + 1 ? "bg-blue-50 text-blue-600" : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`}
                  >
                    {i + 1}
                  </Button>
                </li>
              ))}

              <li>
                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex h-8 items-center justify-center rounded-e-lg border px-3 leading-tight ${currentPage === totalPages ? "cursor-not-allowed bg-gray-200 text-gray-400" : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`}
                >
                  Next
                </Button>
              </li>
            </ul>
          </nav>
        </Section>
      </AdminLayout>
      {addData && (
        <AddSchoolYearModal
          dispatch={dispatch}
          onClose={() => setAddData(false)}
          onRefresh={() => setRefresh((prev) => !prev)}
        />
      )}
      {editData && (
        <EditSchoolYearModal
          data={editData}
          dispatch={dispatch}
          onClose={() => setEditData(false)}
          onRefresh={() => setRefresh((prev) => !prev)}
        />
      )}
      {deleteData && (
        <DeleteSchoolYearModal
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
