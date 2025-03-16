import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";

export default function FilterDropdown() {
  const router = useRouter();
  const [payload, setPayload] = useState({});


  const handleChange = (filter) => {

    const [key, value] = Object.entries(filter)[0];
    if (!value) {
      setPayload((prev) => {
        const { [key]: _, ...fresh } = prev;
        return fresh;
      });
      return;
    }

    setPayload((prev) => ({
      ...prev,
      ...filter
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.search.value;
    if (!value.trim() && !payload.search) return;
    if (value.trim() == payload.search) return;

    handleChange({ search: value.trim() });
  };


  useEffect(() => {
    console.log(payload);
    router.push({
      pathname: router.pathname,
      query: payload
    });
  }, [payload]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
      <div className="w-full md:w-1/2 flex gap-3">
        {/* Size */}
        <div className="relative">
          <select
            onChange={(e) => handleChange({ size: e.target.value })}
            className="py-2 pr-6 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <option value="10">10</option>
            <option value="30">30</option>
            <option value="50">50</option>
          </select>

        </div>

        <form className="flex items-center w-full" onSubmit={(e) => { handleSubmit(e); }}>
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Search"
            />
          </div>
        </form>
      </div>
      <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
        <button
          type="button"
          className="flex items-center justify-center text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
        >
          <svg
            className="h-3.5 w-3.5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            />
          </svg>
          New payment
        </button>
        {/* Filter */}
        <select
          onChange={(e) => handleChange({ type: e.target.value })}
          className="w-full md:w-auto py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          <option value="">- Type -</option>
          <option value="SPP">SPP</option>
          <option value="UTS">UTS</option>
          <option value="UAS">UAS</option>
          <option value="Extrakurikuler">Extrakurikuler</option>
          <option value="Lainnya">Lainnya</option>
        </select>
        <select
          onChange={(e) => handleChange({ status: e.target.value })}
          className="w-full md:w-auto py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          <option value="">- Status -</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="overdue">Overdue</option>
        </select>

      </div>
    </div>
  );
}
