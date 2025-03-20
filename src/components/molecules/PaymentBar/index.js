import { getAllSchoolYear } from '@/services/schoolYear';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa6';

export const PaymentBar = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [year, setYear] = useState();
  const router = useRouter();


  const handleSubmitFilter = (e) => {
    e.preventDefault();

    const payload = {
      ...(router.query.type && { type: router.query.type }),
      ...(e.target.user.value && { username: e.target.user.value }),
      ...(e.target.student.value && { student: e.target.student.value }),
      ...(e.target.status.value && { status: e.target.status.value }),
      ...(e.target.year.value && { year: e.target.year.value }),
    };
    console.log(payload);

    router.push({
      pathname: router.pathname,
      query: { ...payload }

    });
  };


  useEffect(() => {
    getAllSchoolYear()
      .then(item => setYear(item.data.data.content))
      .catch(console.log("Error while get schoolYear data")
      );
  }, []);

  return (
    <div className='flex justify-start py-4'>
      <div className='grow flex gap-4'>
        <form className="flex items-center" onSubmit={(e) => { handleSubmit(e); }}>
          <label htmlFor="simple-search" className="sr-only">
            Search Student
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500"
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 "
              placeholder="Search Student"
            />
          </div>
        </form>
        <div className='flex items-center p-2 relative w-full'>
          <div
            onClick={() => {
              setShowFilter(!showFilter);
            }}
            className='flex items-center px-4 gap-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2 cursor-pointer'
          >
            <FaFilter />
            <span>Filters</span>
          </div>
          <form onSubmit={handleSubmitFilter}
            className={`absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-md p-4 z-10 ${showFilter ? '' : 'hidden'
              }`}
          >
            <div className='flex flex-col gap-4'>
              <input
                id='user'
                type='text'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2 w-full sm:w-auto'
                placeholder='user : -'
              />
              <input
                id='student'
                type='text'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2 w-full sm:w-auto'
                placeholder='student : -'
              />
              <select
                id='status'
                type='text'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2 w-full sm:w-auto'
              >
                <option value="">- status -</option>
                <option value="paid">paid</option>
                <option value="pending">pending</option>
                <option value="overdue">overdue</option>
              </select>
              <select
                id='year'
                type='text'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2 w-full sm:w-auto'
              >
                <option value="" selected>- tahun -</option>
                {year?.map(item => (
                  <option key={item.id} value={item.id}>{item.schoolYear}</option>
                ))}

              </select>

              <div className='flex gap-4'>
                <button type='button' className='grow bg-white-500 border border-gray-300 text-gray-900 text-sm rounded-lg p-2 w-full sm:w-auto'>
                  Reset
                </button>
                <button type='submit' className='grow bg-blue-500 border border-gray-300 text-white text-sm rounded-lg p-2 w-full sm:w-auto'>
                  Apply
                </button>
              </div>
            </div>
          </form>
        </div>


      </div>
      <div>

      </div>
      {/* <div>
        <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Export</button>
      </div> */}
    </div>
  );
};
