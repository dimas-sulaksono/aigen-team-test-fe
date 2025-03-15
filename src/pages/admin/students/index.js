import Button from "@/components/atoms/Button";
import Section from "@/components/atoms/Section";
import AdminLayout from "@/components/templates/AdminLayout";
import React, { useState } from "react";
import StudentDetailModal from "./StudentDetailModal";
import AddStudentModal from "./AddStudentModal";
import EditStudentModal from "./EditStudentModal";
import { IoMdClose } from "react-icons/io";
import { FaFilter } from "react-icons/fa6";
import { useSelector } from "react-redux";
import Form from "@/components/atoms/Form";
import Input from "@/components/atoms/Input";
import Link from "next/link";

const StudentsAdminPage = () => {
  const [selectedStudent, setSelectedStudent] = useState(false);
  const [addStudent, setAddStudent] = useState(false);
  const [editStudent, setEditStudent] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("Any");

  const classes = ["Any", "Class A", "Class B", "Class C", "Class D"];

  const data = [
    {
      id: 1,
      name: "Muhammad",
      nis: "123456",
      class: "XII RPL 1",
      birthdate: "01-01-2000",
      phone: "08123456789",
    },
  ];

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
                  <Button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-1 rounded-md border border-gray-300 bg-transparent px-4 py-2 transition"
                  >
                    <FaFilter /> Filters
                  </Button>
                  {isOpen && (
                    <div className="absolute left-0 z-50 mt-2 w-60 rounded-lg bg-white p-4 shadow-lg">
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
                          className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                          value={selectedClass}
                          onChange={(e) => setSelectedClass(e.target.value)}
                        >
                          {classes.map((cls) => (
                            <option key={cls} value={cls}>
                              {cls}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <Button
                          className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
                          onClick={() => setSelectedClass("Any")}
                        >
                          Reset
                        </Button>
                        <Button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                          Apply
                        </Button>
                      </div>
                    </div>
                  )}
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
                    <th className="px-6 py-3">Phone</th>
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
                      <td className="px-6 py-4">{item.class}</td>
                      <td className="px-6 py-4">{item.birthdate}</td>
                      <td className="px-6 py-4">{item.phone}</td>
                      <td className="flex gap-3 px-6 py-4">
                        <Button
                          onClick={() => setSelectedStudent(item)}
                          className="text-green-600 hover:underline"
                        >
                          Detail
                        </Button>
                        <Button
                          className="text-blue-600 hover:underline"
                          onClick={() => setEditStudent(item)}
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <nav
            className="flex-column flex flex-wrap items-center justify-between py-4 md:flex-row"
            aria-label="Table navigation"
          >
            <span className="mb-4 block w-full text-sm font-normal text-gray-500 md:mb-0 md:inline md:w-auto">
              Showing <span className="font-semibold text-gray-900">1-10</span>{" "}
              of <span className="font-semibold text-gray-900">1000</span>
            </span>
            <ul className="inline-flex h-8 -space-x-px text-sm rtl:space-x-reverse">
              <li>
                <Link
                  href="#"
                  className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Previous
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  1
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  2
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  aria-current="page"
                  className="flex h-8 items-center justify-center border border-gray-300 bg-blue-50 px-3 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                >
                  3
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  4
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  5
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Next
                </Link>
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
      {addStudent && <AddStudentModal onClose={() => setAddStudent(false)} />}
      {editStudent && (
        <EditStudentModal
          onClose={() => setEditStudent(null)}
          user={editStudent}
        />
      )}
    </>
  );
};

export default StudentsAdminPage;
