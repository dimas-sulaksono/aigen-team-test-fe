import Button from "@/components/atoms/Button";
import Form from "@/components/atoms/Form";
import Input from "@/components/atoms/Input";
import Section from "@/components/atoms/Section";
import AdminLayout from "@/components/templates/AdminLayout";
import Link from "next/link";
import React, { useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SettingSchoolYearAdminPage = () => {
  const data = [
    {
      id: 1,
      name: "2022/2023",
      startDate: "01-01-2022",
      endDate: "01-06-2022",
      createdAt: "01-01-2023",
    },
  ];
  return (
    <AdminLayout>
      <Section>
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="mb-4 flex w-full flex-col">
            <h2 className="pb-4 text-xl font-semibold text-gray-700">
              School year List
            </h2>
            <div className="flex flex-row justify-between">
              <Button
                onClick={() => setAddStudent(true)}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700"
              >
                + Add Class
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
                      {item.name}
                    </td>
                    <td className="px-6 py-4">{item.startDate}</td>
                    <td className="px-6 py-4">{item.endDate}</td>
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
            Showing <span className="font-semibold text-gray-900">1-10</span> of{" "}
            <span className="font-semibold text-gray-900">1000</span>
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
  );
};

export default SettingSchoolYearAdminPage;
