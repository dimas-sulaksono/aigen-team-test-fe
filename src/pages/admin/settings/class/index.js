import Button from "@/components/atoms/Button";
import Section from "@/components/atoms/Section";
import AdminLayout from "@/components/templates/AdminLayout";
import { getAllClass, searchClass } from "@/services/class";
import React, { useCallback, useEffect, useState } from "react";
import AddClassModal from "./AddClassModal";
import EditClassModal from "./EditClassModal";
import { getAllSchoolYear } from "@/services/schoolYear";
import DeleteClassModal from "./deleteClassModal";
import { useDispatch } from "react-redux";
import { FaRegTrashCan, FaTrash } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import SoftDeleteClassModal from "./softDeleteClassModal";
import Input from "@/components/atoms/Input";
import Form from "@/components/atoms/Form";
import { useRouter } from "next/router";

const SettingClassAdminPage = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [year, setYear] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [addData, setAddData] = useState(false);
  const [editData, setEditData] = useState(false);
  const [softDeleteData, setSoftDeleteData] = useState(false);
  const [deleteData, setDeleteData] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    const res = await getAllClass(currentPage, itemsPerPage);
    if (res.status) {
      setData(res.data?.content);
      setTotalElements(res.data.totalElements);
      setTotalPages(res.data.totalPages);
    }
  }, [currentPage, itemsPerPage]);

  const fetchYear = useCallback(async () => {
    const res = await getAllSchoolYear(currentPage, itemsPerPage);
    if (res.status) {
      const filteredData = res.data?.data?.content.filter(
        (item) => !item.deletedAt,
      );
      setYear(filteredData);
    }
  }, [currentPage, itemsPerPage]);

  console.log(year);

  useEffect(() => {
    fetchYear();
    fetchData();
  }, [fetchData, refresh]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const name = e.target.search.value;
    router.push({
      pathname: "/admin/settings/class",
      query: { name, page: currentPage, size: itemsPerPage },
    });
    try {
      const response = await searchClass(name, currentPage, itemsPerPage);
      console.log(response);

      if (response.status) {
        const searchData = response.data.content;
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
        pathname: "/admin/settings/class",
        query: { ...router.query, page, size: itemsPerPage },
      },
      undefined,
      { shallow: true },
    );
  };

  return (
    <>
      <AdminLayout>
        <Section>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="mb-4 flex w-full flex-col">
              <h2 className="pb-4 text-xl font-semibold text-gray-700">
                Class List
              </h2>
              <div className="flex flex-row justify-between">
                <Button
                  onClick={() => setAddData(true)}
                  className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700"
                >
                  + Add Class
                </Button>
                <Form
                  onSubmit={handleSearch}
                  className="flex flex-row items-center overflow-hidden rounded-md border border-gray-300"
                >
                  <Input
                    type="text"
                    name="search"
                    placeholder="Search class"
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
                    <th className="py-3 pl-2">Class</th>
                    <th className="px-6 py-3">School Year</th>
                    <th className="px-6 py-3">Created At</th>
                    <th className="px-6 py-3">Status</th>
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
                        {item.name}
                      </td>
                      <td className="px-6 py-4">{item.year}</td>
                      <td className="px-6 py-4">{item.createdAt}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-block h-2 w-2 rounded-full ${
                              item.deletedAt === null
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          ></span>
                          {item.deletedAt === null ? "Active" : "Inactive"}
                        </div>
                      </td>
                      <td className="flex gap-3 px-6 py-4">
                        {item.deletedAt === null ? (
                          <>
                            <Button
                              className="cursor-pointer text-blue-600 hover:text-blue-700"
                              onClick={() => setEditData(item)}
                            >
                              <FaRegEdit size={18} />
                            </Button>
                            <Button
                              className="cursor-pointer text-red-600 hover:text-red-700"
                              onClick={() => setSoftDeleteData(item)}
                            >
                              <FaRegTrashCan size={18} />
                            </Button>
                          </>
                        ) : (
                          <>
                            {/* <Button
                                className="cursor-pointer text-green-600 hover:text-green-700"
                                onClick={() => setSoftDeleteData(item)}
                              >
                                <FaTrashRestore size={18} />
                              </Button> */}
                            <Button
                              className="cursor-pointer text-red-800 hover:text-red-900"
                              onClick={() => setDeleteData(item)}
                            >
                              <FaTrash size={18} />
                            </Button>
                          </>
                        )}
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
        <AddClassModal
          onClose={() => setAddData(false)}
          year={year}
          dispatch={dispatch}
          onRefresh={() => setRefresh((prev) => !prev)}
        />
      )}
      {editData && (
        <EditClassModal
          onClose={() => setEditData(null)}
          data={editData}
          year={year}
          dispatch={dispatch}
          onRefresh={() => setRefresh((prev) => !prev)}
        />
      )}
      {softDeleteData && (
        <SoftDeleteClassModal
          onRefresh={() => setRefresh((prev) => !prev)}
          onClose={() => setSoftDeleteData(null)}
          dispatch={dispatch}
          data={softDeleteData}
        />
      )}
      {deleteData && (
        <DeleteClassModal
          onRefresh={() => setRefresh((prev) => !prev)}
          onClose={() => setDeleteData(null)}
          dispatch={dispatch}
          data={deleteData}
        />
      )}
    </>
  );
};

export default SettingClassAdminPage;
