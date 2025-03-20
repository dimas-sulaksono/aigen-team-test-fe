import React from "react";

export const Row = ({ data, setDataDetails, handleShow, handleDownload }) => {
  const { name, status, deletedAt } = data;

  const handleClick = () => {
    setDataDetails(data);
    handleShow();
  };

  return (
    <tr
      className={`border-b dark:border-gray-700 ${deletedAt ? "pointer-events-none bg-gray-200" : ""}`}
    >
      <td className="px-10 py-3">{name}</td>
      <td className="px-4 py-3">{status}</td>
      <td className="px-4 py-3">
        {!deletedAt && (
          <div className="flex gap-1">
            <button
              onClick={handleClick}
              type="button"
              class="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
            >
              Details
            </button>
            <button
              onClick={() => {
                handleDownload(data);
              }}
              type="button"
              className={`px-3 py-1 ${status.toLowerCase() == "paid" ? "bg-blue-700 text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700" : "pointer-events-none border border-gray-200"} rounded-full text-center text-sm font-medium focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800`}
            >
              Download
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};
