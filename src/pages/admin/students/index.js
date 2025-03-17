import Button from "@/components/atoms/Button";
import Section from "@/components/atoms/Section";
import AdminLayout from "@/components/templates/AdminLayout";
import React, { useCallback, useEffect, useState } from "react";
import StudentDetailModal from "./StudentDetailModal";
import AddStudentModal from "./AddStudentModal";
import EditStudentModal from "./EditStudentModal";
import { IoMdClose } from "react-icons/io";
import { FaFilter, FaTrash } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Form from "@/components/atoms/Form";
import Input from "@/components/atoms/Input";
import { BiDetail } from "react-icons/bi";
import { getAllStudent } from "@/services/student";
import { current } from "@reduxjs/toolkit";
import { getAllClass } from "@/services/class";
import { FaEdit } from "react-icons/fa";
import DeleteStudentModal from "./DeleteStudentModal";

const StudentsAdminPage = () => {
  const [data, setData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(false);
  const [addStudent, setAddStudent] = useState(false);
  const [editStudent, setEditStudent] = useState(false);
  const [deleteStudent, setDeleteStudent] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedClass, setSelectedClass] = useState("Any");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 30;

  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    const res = await getAllStudent(currentPage, itemsPerPage);
    if (res.status) {
      setData(res.data.content);
    }
  }, [currentPage, itemsPerPage]);

  const fetchClass = useCallback(async () => {
    const res = await getAllClass(currentPage, itemsPerPage);
    if (res.status) {
      setClasses(res.data.content);
    }
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchData();
    fetchClass();
  }, [fetchData, fetchClass, refresh]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  console.log(data);

  return (
    <>
      <AdminLayout>
        <Section>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="mb-4 flex w-full flex-col">
              <h2 className="pb-4 text-xl font-semibold text-gray-700">
                Student List
              </h2>
              <div className="flex flex-row justify-between">
                <div className="flex gap-2 text-sm">
                  <Button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative flex items-center gap-1 rounded-md border border-gray-300 bg-transparent px-4 py-2 transition"
                  >
                    <FaFilter /> Filters
                  </Button>
                  {isOpen && (
                    <Form className="absolute z-50 mt-10 w-60 rounded-lg bg-white p-4 shadow-lg">
                      <div className="flex items-center justify-between border-b pb-2">
                        <h3 className="text-lg font-semibold text-gray-800">
                          Filter
                        </h3>
                        <Button
                          onClick={() => setIsOpen(false)}
                          className="text-gray-500 hover:text-gray-900"
                        >
                          <IoMdClose />
                        </Button>
                      </div>
                      <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Class
                        </label>
                        <select
                          className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                          value={selectedClass}
                          onChange={(e) => setSelectedClass(e.target.value)}
                        >
                          <option value="Any">Any</option>
                          {classes.map((cls) => (
                            <option key={cls.id} value={cls.id}>
                              {cls.name} - {cls.year}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="mt-4 flex justify-end gap-2">
                        <Button
                          className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
                          type="reset"
                        >
                          Reset
                        </Button>
                        <Button
                          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                          type="submit"
                        >
                          Apply
                        </Button>
                      </div>
                    </Form>
                  )}
                  <Form className="flex flex-row items-center overflow-hidden rounded-md border border-gray-300">
                    <Input
                      type="text"
                      placeholder="Search invoice"
                      className="border-0 bg-gray-50 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600"
                    />
                    <Button className="h-full cursor-pointer bg-blue-600 px-2 text-sm text-white">
                      Search
                    </Button>
                  </Form>
                </div>

                <Button
                  onClick={() => setAddStudent(true)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700"
                >
                  + Add Student
                </Button>
              </div>
            </div>

            <hr className="my-4 text-slate-200" />

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="border-b border-gray-300 bg-gray-50 text-xs uppercase">
                  <tr>
                    <th className="py-3 pl-4">No</th>
                    <th className="py-3 pl-2">Name</th>
                    <th className="px-6 py-3">NIS</th>
                    <th className="px-6 py-3">Class</th>
                    <th className="px-6 py-3">Birthdate</th>
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
                      <td className="px-6 py-4">{item.nis}</td>
                      <td className="px-6 py-4">{item.className}</td>
                      <td className="px-6 py-4">{item.birthdate}</td>
                      <td className="flex gap-3 px-6 py-4">
                        <Button
                          onClick={() => setSelectedStudent(item)}
                          className="cursor-pointer text-green-600 hover:text-green-700"
                        >
                          <BiDetail size={18} />
                        </Button>
                        <Button
                          className="cursor-pointer text-blue-600 hover:text-blue-700"
                          onClick={() => setEditStudent(item)}
                        >
                          <FaEdit size={18} />
                        </Button>
                        <Button
                          className="cursor-pointer text-red-600 hover:text-red-700"
                          onClick={() => setDeleteStudent(item)}
                        >
                          <FaTrash size={16} />
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
      {selectedStudent && (
        <StudentDetailModal
          user={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
      {addStudent && (
        <AddStudentModal
          dispatch={dispatch}
          onClose={() => setAddStudent(false)}
          onRefresh={() => setRefresh((prev) => !prev)}
          classes={classes}
        />
      )}
      {editStudent && (
        <EditStudentModal
          onClose={() => setEditStudent(null)}
          user={editStudent}
          onRefresh={() => setRefresh((prev) => !prev)}
          classes={classes}
          dispatch={dispatch}
        />
      )}
      {deleteStudent && (
        <DeleteStudentModal
          onClose={() => setDeleteStudent(null)}
          data={deleteStudent}
          onRefresh={() => setRefresh((prev) => !prev)}
          dispatch={dispatch}
        />
      )}
    </>
  );
};

export default StudentsAdminPage;
