import Button from "@/components/atoms/Button";
import Form from "@/components/atoms/Form";
import Input from "@/components/atoms/Input";
import React from "react";
import { IoMdClose } from "react-icons/io";

const EditClassModal = ({ onClose, data, year }) => {
  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-2xl font-semibold text-gray-800">Edit Student</h2>
          <button
            onClick={onClose}
            className="text-gray-500 transition hover:text-gray-900"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        <Form className="mt-3 p-3">
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label
                htmlFor="className"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Name
              </label>
              <Input
                type="text"
                name="className"
                id="className"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600"
                defaultValue={data.name}
                required
              />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="schoolYear"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                School Year
              </label>
              <select
                id="schoolYear"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value={data?.year}>{data?.year}</option>
                {year?.map((y) => (
                  <option key={y.id} value={y.id}>
                    {y.schoolYear}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Button
            type="submit"
            className="flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none"
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            Update class
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditClassModal;
