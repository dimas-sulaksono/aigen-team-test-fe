import Section from '@/components/atoms/Section';
import AdminLayout from '@/components/templates/AdminLayout';
import React, { useEffect } from 'react';

const PaymentsAdminPage = () => {

  useEffect(() => {

  }, []);

  return (
    <AdminLayout>
      <Section>
        <div class="overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 border-b border-slate-800">
              <tr>
                <th scope="col" class="pl-4 py-3">
                  No
                </th>
                <th scope="col" class="pl-2 py-3">
                  Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Nis
                </th>
                <th scope="col" class="px-6 py-3">
                  Class
                </th>
                <th scope="col" class="px-6 py-3">
                  Birthdate
                </th>
                <th scope="col" class="px-6 py-3">
                  Phone
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b border-gray-200 hover:bg-gray-50">
                <td class="pl-4 py-4">1</td>
                <th
                  scope="row"
                  class="pl-2 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  Rizky
                </th>
                <td class="px-6 py-4">4121319</td>
                <td class="px-6 py-4">2</td>
                <td class="px-6 py-4">20-19-9</td>
                <td class="px-6 py-4">08992812</td>
                <td class="px-6 py-4">
                  <a href="#" class="font-medium text-blue-600 hover:underline">
                    Edit
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <nav
          class="flex items-center flex-column flex-wrap md:flex-row justify-between py-4"
          aria-label="Table navigation"
        >
          <span class="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing <span class="font-semibold text-gray-900 ">1-10</span> of{" "}
            <span class="font-semibold text-gray-900 ">1000</span>
          </span>
          <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "
              >
                Previous
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
              >
                4
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
              >
                5
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </Section>
    </AdminLayout>
  );
};

export default PaymentsAdminPage;