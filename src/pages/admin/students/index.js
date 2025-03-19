import Button from "@/components/atoms/Button";
import Section from "@/components/atoms/Section";
import AdminLayout from "@/components/templates/AdminLayout";
import React, { useCallback, useEffect, useState } from "react";
import StudentDetailModal from "./StudentDetailModal";
import AddStudentModal from "./AddStudentModal";
import EditStudentModal from "./EditStudentModal";
import { IoMdClose } from "react-icons/io";
import {
  FaCaretDown,
  FaCaretUp,
  FaFilter,
  FaRegTrashCan,
  FaTrash,
} from "react-icons/fa6";
import { useDispatch } from "react-redux";
import Form from "@/components/atoms/Form";
import Input from "@/components/atoms/Input";
import { TbCaretUpDownFilled } from "react-icons/tb";
import { BiDetail } from "react-icons/bi";
import {
  filterStudent,
  getAllStudent,
  searchStudent,
  sortStudent,
} from "@/services/student";
import { getAllClass } from "@/services/class";
import { FaEdit, FaRegEdit } from "react-icons/fa";
import DeleteStudentModal from "./DeleteStudentModal";
import { getAllSchoolYear } from "@/services/schoolYear";
import { useRouter } from "next/router";
import SoftDeleteStudentModal from "./softDeleteClassModal";
import { Pagination } from "@/components/molecules/Pagination";

const StudentsAdminPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [schoolYear, setSchoolYear] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(false);
  const [selectedSchoolYear, setSelectedSchoolYear] = useState("Any");
  const [addStudent, setAddStudent] = useState(false);
  const [editStudent, setEditStudent] = useState(false);
  const [deleteStudent, setDeleteStudent] = useState(false);
  const [softDeleteStudent, setSoftDeleteStudent] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchData = useCallback(async () => {
    const { startDate, endDate, name, sort } = router.query;

    // console.log("Fetching data dengan filter:", { startDate, endDate, name });

    let res;
    if (name) {
      res = await searchStudent(name, currentPage, itemsPerPage);
    } else if (startDate && endDate) {
      res = await filterStudent(
        startDate,
        endDate,
        currentPage,
        itemsPerPage,
        sort,
      );
    } else if (sort) {
      res = await sortStudent(sort, currentPage, itemsPerPage);
    } else {
      res = await getAllStudent(currentPage, itemsPerPage);
    }

    if (res.status) {
      setData(res.data.content);
      setTotalPages(res.data.totalPages);
      setTotalElements(res.data.totalElements);
    }
  }, [router.query, currentPage, itemsPerPage]);

  const fetchClass = useCallback(async () => {
    const res = await getAllClass(0, itemsPerPage);
    if (res.status) {
      const filteredData = res.data.content.filter(
        (classData) => !classData.deletedAt,
      );
      setClasses(filteredData);
    }
  }, []);

  const fetchSchoolYear = useCallback(async () => {
    const res = await getAllSchoolYear(0, itemsPerPage);
    if (res.status) {
      const filteredData = res.data.data.content.filter(
        (schoolYear) => !schoolYear.deletedAt,
      );
      setSchoolYear(filteredData);
    }
  }, []);

  useEffect(() => {
    fetchData();
    fetchClass();
    fetchSchoolYear();
  }, [fetchData, refresh, router.query, currentPage]);

  const handleFilter = (event) => {
    event.preventDefault();

    if (!selectedSchoolYear || selectedSchoolYear === "Any") {
      router.push({ pathname: "/admin/students" });
      return;
    }

    const selected = schoolYear.find(
      (s) => s.id.toString() === selectedSchoolYear,
    );
    if (!selected) return;

    const { startDate, endDate } = selected;
    router.push(
      {
        pathname: "/admin/students",
        query: {
          startDate,
          endDate,
          sort: router.query.sort || "asc",
          page: currentPage || 0,
          size: itemsPerPage,
        },
      },
      undefined,
      { shallow: true },
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const name = e.target.search.value;
    router.push({
      pathname: "/admin/students",
      query: { ...router.query, name, page: 0, size: itemsPerPage },
    });
  };

  const handleSort = () => {
    const currentSort = router.query.sort;

    let newSort;
    if (!currentSort) {
      newSort = `asc`;
    } else if (currentSort === `asc`) {
      newSort = `desc`;
    } else if (currentSort === `desc`) {
      newSort = undefined;
    }

    router.push(
      {
        pathname: "/admin/students",
        query: {
          ...router.query,
          sort: newSort,
          page: currentPage,
          size: itemsPerPage,
        },
      },
      undefined,
      { shallow: true },
    );
  };

  const getSortIcon = () => {
    if (!router.query.sort) return <TbCaretUpDownFilled />;
    if (router.query.sort === `asc`) return <FaCaretUp />;
    if (router.query.sort === `desc`) return <FaCaretDown />;
    return <TbCaretUpDownFilled />;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    router.push(
      {
        pathname: "/admin/students",
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
                Student List
              </h2>
              <div className="flex flex-row justify-between">
                <div className="flex gap-2 text-sm">
                  <select
                    name="itemsPerPage"
                    className="mt-1 w-18 rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(e.target.value);
                      router.push(
                        {
                          pathname: "/admin/students",
                          query: {
                            ...router.query,
                            size: e.target.value,
                            page: currentPage,
                          },
                        },
                        undefined,
                        { shallow: true },
                      );
                    }}
                  >
                    <option value="10">Items</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                  <Button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative flex items-center gap-1 rounded-md border border-gray-300 bg-transparent px-4 py-2 transition"
                  >
                    <FaFilter /> Filters
                  </Button>
                  {isOpen && (
                    <Form
                      onSubmit={handleFilter}
                      className="absolute z-50 mt-10 w-60 rounded-lg bg-white p-4 shadow-lg"
                    >
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
                          School Year
                        </label>
                        <select
                          name="schoolYear"
                          className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                          value={selectedSchoolYear}
                          onChange={(e) =>
                            setSelectedSchoolYear(e.target.value)
                          }
                        >
                          <option value="Any">Any</option>
                          {schoolYear.map((school) => (
                            <option key={school.id} value={school.id}>
                              {school.schoolYear} ({school.startDate} -{" "}
                              {school.endDate})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="mt-4 flex justify-end gap-2">
                        <Button
                          className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
                          onClick={() => {
                            setSelectedSchoolYear("Any");
                            router.push(
                              { pathname: "/admin/students" },
                              undefined,
                              { shallow: true },
                            );
                          }}
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
                  <Form
                    onSubmit={handleSearch}
                    className="flex flex-row items-center overflow-hidden rounded-md border border-gray-300"
                  >
                    <Input
                      type="text"
                      name={"search"}
                      placeholder="Search student name..."
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
                    <th
                      className="flex cursor-pointer items-center py-3 pl-3"
                      onClick={() => handleSort("name")}
                    >
                      Name {getSortIcon()}
                    </th>
                    <th className="px-6 py-3">NIS</th>
                    <th className="px-6 py-3">Class</th>
                    <th className="px-6 py-3">School Year</th>
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
                      <td className="py-4 pl-3 font-medium whitespace-nowrap text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4">{item.nis}</td>
                      <td className="px-6 py-4">{item.className}</td>
                      <td className="px-6 py-4">{item.schoolYear}</td>
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
                              onClick={() => setSelectedStudent(item)}
                              className="cursor-pointer text-green-600 hover:text-green-700"
                            >
                              <BiDetail size={18} />
                            </Button>
                            <Button
                              className="cursor-pointer text-blue-600 hover:text-blue-700"
                              onClick={() => setEditStudent(item)}
                            >
                              <FaRegEdit size={18} />
                            </Button>
                            <Button
                              className="cursor-pointer text-red-600 hover:text-red-700"
                              onClick={() => setSoftDeleteStudent(item)}
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
                              onClick={() => setDeleteStudent(item)}
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
      {softDeleteStudent && (
        <SoftDeleteStudentModal
          onClose={() => setSoftDeleteStudent(null)}
          data={softDeleteStudent}
          onRefresh={() => setRefresh((prev) => !prev)}
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
