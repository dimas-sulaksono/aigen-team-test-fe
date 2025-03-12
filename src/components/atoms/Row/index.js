import React from 'react';

export const Row = ({ data, show, setShow }) => {
  const { type, name, year, amount, status } = data;
  return (
    <tr className="border-b dark:border-gray-700">
      <th
        scope="row"
        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {type}
      </th>
      <td className="px-4 py-3">{name}</td>
      <td className="px-4 py-3">{year}</td>
      <td className="px-4 py-3">{amount}</td>
      <td className="px-4 py-3">{status}</td>
      <td className="px-4 py-3 flex items-center justify-end relative">
        <button
          onClick={(e) => {
            e.stopPropagation()
            setShow();
          }}
          className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
          type="button"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </button>
        {show && (

          <div
            className="absolute top-10 right-0 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul
              className="py-1 text-sm text-gray-700 dark:text-gray-200"
            >
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Show
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Edit
                </a>
              </li>
            </ul>
            <div className="py-1">
              <a
                href="#"
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Delete
              </a>
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};
