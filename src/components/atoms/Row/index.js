import React from 'react';

export const Row = ({ data }) => {
  const { type, name, amount, status, schoolYear } = data;
  return (
    <tr className="border-b dark:border-gray-700">
      <th
        scope="row"
        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {type}
      </th>
      <td className="px-4 py-3">{name}</td>
      <td className="px-4 py-3">{schoolYear}</td>
      <td className="px-4 py-3">{amount}</td>
      <td className="px-4 py-3">{status}</td>
      <td className="px-4 py-3 flex gap-3">
        <button type="button" class="py-1 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          Details
        </button>
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Download
        </button>
      </td>
    </tr>
  );
};
