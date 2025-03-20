import { formatCurrency } from '@/helpers/utils/formatCurrency';
import React from 'react';
import Button from '../Button';
import { BiDetail } from 'react-icons/bi';
import { FaRegEdit } from 'react-icons/fa';

export const RowPayment = ({ index, item, handleSelect, handleUpdate }) => {

  const status = item.status;
  const dotColor = {
    paid: "bg-green-500",
    pending: "bg-yellow-500",
    overdue: "bg-red-500",
  };

  return (
    <tr className="bg-white border-b border-gray-200 hover:bg-gray-50 ">
      <td className="w-4 p-4">
        <p>{index + 1}</p>
      </td>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {item.name}
      </th>
      <td className="px-6 py-4">{item.user.name}</td>
      <td className="px-6 py-4">{item.student.nis}</td>
      <td className="px-6 py-4">{item.student.name}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <span
            className={`inline-block h-2 w-2 rounded-full ${dotColor[status]}`}
          ></span>
          {item.status.toUpperCase()}
        </div>
      </td>
      <td className="px-6 py-4">{formatCurrency(item.amount)}</td>
      <td className="px-6 py-4">
        <div className='flex gap-2'>
          <Button
            onClick={() => { handleSelect(item); }}
            className="cursor-pointer text-green-600 hover:text-green-700"
          >
            <BiDetail size={18} />
          </Button>
          <Button
            onClick={() => handleUpdate(item)}
            className="cursor-pointer text-blue-600 hover:text-blue-700"
          >
            <FaRegEdit size={18} />
          </Button>

        </div>
      </td>
    </tr>
  );
};
