import React from 'react';

export const Row = ({ data, setDataDetails, handleShow }) => {
  const { type, name, amount, status, schoolYear, deletedAt } = data;

  console.log(deletedAt);

  const handleClick = () => {
    setDataDetails(data);
    handleShow();
  };

  return (
    <tr
      className={`border-b dark:border-gray-700 ${deletedAt ? "pointer-events-none bg-gray-200" : ""}`}>
      <th
        scope="row"
        className="px-10 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {name}
      </th>
      <td className="px-4 py-3">{status}</td>
      <td className="px-4 py-3">
        {!deletedAt && (
          <div className='flex gap-1'>
            <button onClick={handleClick} type="button" class="py-1 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              Details
            </button>
            <button type="button" className={`px-3 py-1 ${status.toLowerCase() == 'paid' ? 'text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700' : 'border border-gray-200 pointer-events-none'} dark:focus:ring-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm text-center `}>
              Download
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};
