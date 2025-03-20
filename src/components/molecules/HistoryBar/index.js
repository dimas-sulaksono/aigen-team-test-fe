import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";

export default function FilterDropdown() {
  const router = useRouter();
  const [payload, setPayload] = useState({});
  // const currentPath = router.pathname;

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
      ...filter,
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
    router.push({
      pathname: router.pathname,
      query: payload,
    });
  }, [payload]);

  return (
    <div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-y-0 md:space-x-4">
      <div className="flex w-full gap-3 md:w-1/2">
        {/* Size */}
        <div className="relative">
          <select
            onChange={(e) => handleChange({ size: e.target.value })}
            className="hover:text-primary-700 rounded-lg border border-gray-200 bg-white py-2 pr-6 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 focus:outline-none"
          >
            <option value="10">10</option>
            <option value="30">30</option>
            <option value="50">50</option>
          </select>
        </div>

        <form
          className="flex w-full items-center"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-gray-500"
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
              className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900"
              placeholder="Search"
            />
          </div>
        </form>
      </div>
      <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">

        {/* Filter */}
        <select
          onChange={(e) => handleChange({ type: e.target.value })}
          className="hover:text-primary-700 w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 focus:outline-none md:w-auto"
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
          className="hover:text-primary-700 w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 focus:outline-none md:w-auto"
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
