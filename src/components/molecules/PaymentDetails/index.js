import Button from '@/components/atoms/Button';
import { formatCurrency } from '@/helpers/utils/formatCurrency';
import React from 'react';

export const Details = ({ handleShow = () => { }, data = {}, handleDownload }) => {


  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    return status?.charAt(0).toUpperCase() + status?.slice(1);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Payment details #{data.id}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Payment Amount</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              disabled
              value={formatCurrency(data?.amount)}
              type="text"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
            />
          </div>
        </div>
        <div className="flex justify-center items-end">
          <button onClick={() => { handleDownload(data); }} className={`${data?.status?.toLowerCase() == 'paid' ? "bg-blue-500 hover:bg-blue-600 cursor-pointer" : "bg-gray-500 pointer-events-none"} py-2 px-4 text-white font-semibold rounded flex items-center `}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download
          </button>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Payment Name</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              value={data.name}
              disabled
              type="text"
              className="flex-1 block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              value={data.type}
              disabled
              type="text"
              className="flex-1 block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
            />
          </div>
        </div>
      </div>
      <div className="mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">School Year</label>
          <div className="flex rounded-md shadow-sm">
            <input
              value={data.schoolYear}
              disabled
              type="text"
              className="flex-1 block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
            />
          </div>
        </div>
      </div>
      <div className="mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <div className={`flex rounded-md shadow-sm ${getStatusColor(data.status)} p-2`}>
            {getStatusText(data.status)}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <Button onClick={handleShow} className="p-3 bg-red-500 w-60 rounded-lg text-white hover:bg-red-600 transition-colors duration-200">
          Close
        </Button>
      </div>
    </div>
  );
};
