import { useRouter } from "next/router";

export const Pagination = ({ pageable = {} }) => {
  const router = useRouter();
  const totalPage = pageable.totalPages;
  const pageNumber = pageable.pageable.pageNumber;

  if (totalPage <= pageNumber) return null;

  const handleClick = (number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: number },
    });
  };

  const page = (number, current = false) => {
    return current ? (
      <li>
        <div
          href="#"
          className="flex items-center justify-center border bg-white px-3 py-2 text-sm leading-tight text-blue-700"
        >
          {number}
        </div>
      </li>
    ) : (
      <li
        onClick={() => {
          handleClick(number);
        }}
      >
        <div
          href="#"
          className="flex cursor-pointer items-center justify-center border border-gray-300 bg-white px-3 py-2 text-sm leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
          {number}
        </div>
      </li>
    );
  };

  return (
    <nav
      className="flex flex-col items-start justify-between space-y-3 p-4 md:flex-row md:items-center md:space-y-0"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal text-gray-500">
        Showing
        <span className="font-semibold text-gray-900">
          {` `}
          {pageable?.number * pageable?.size + 1 || 0} to{" "}
          {pageable?.number * pageable?.size + pageable?.numberOfElements || 0}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900">
          {pageable?.totalElements}
        </span>
      </span>
      <ul className="inline-flex">
        <li
          onClick={() => {
            if (!pageable?.first) handleClick(pageNumber);
          }}
        >
          <div className="ml-0 flex h-full cursor-pointer items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
            <span className="sr-only">Previous</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </li>

        {pageNumber - 1 > 0 && page(pageNumber - 1)}
        {pageNumber > 0 && page(pageNumber)}
        {page(pageNumber + 1, true)}
        {totalPage - pageNumber > 1 && page(pageNumber + 2)}
        {totalPage - pageNumber > 2 && page(pageNumber + 3)}

        <li
          onClick={() => {
            if (!pageable?.last) handleClick(pageNumber + 2);
          }}
        >
          <a
            href="#"
            className="flex h-full cursor-pointer items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 py-1.5 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <span className="sr-only">Next</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
};
