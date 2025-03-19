import { formatDateTime } from '@/helpers/utils/formatDateTime';
import { hideNavbar } from '@/redux/navbarReduce';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaGraduationCap } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';

export const Invoice = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    "id": null,
    "name": "",
    "user": {
      "id": null,
      "name": ""
    },
    "student": {
      "nis": "",
      "name": ""
    },
    "type": "",
    "schoolYear": "",
    "amount": 0,
    "status": "",
    "description": "",
    "createdAt": null,
    "updatedAt": null,
    "deletedAt": null
  });

  useEffect(() => {
    dispatch(hideNavbar());
  }, [dispatch]);

  useEffect(() => {
    axios.get("/api/payment-data")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Not Found"));
  }, []);

  return (
    <div className='flex-col items-center w-3xl'>
      <div className='flex justify-center'>
        <div className='w-full max-w-screen-md py-5 flex'>
          <div className='flex w-1/4 justify-end items-center'>
            <FaGraduationCap size={50} />
            <div className="text-center">
              <h1 className="text-3xl font-bold font-sans text-gray-800">
                Edu
                <span className="text-blue-600">Pay</span>
              </h1>
            </div>
          </div>
          <div className='grow flex flex-col items-center text-3xl font-serif font-bold'>
            <p>BUKTI PEMBAYARAN</p>
            <p>AKADEMI NINJA</p>
            <p className='text-xl'>KONOHA TIMUR</p>
          </div>
        </div>
      </div>
      <div className='flex p-5 justify-center text-lg font-serif leading-10'>
        <div className='border-y px-4 py-8 w-full max-w-screen-md'>

          <table className=''>
            <tbody className=''>
              <tr>
                <td className='w-40'>Nama</td>
                <td className='w-8'>:</td>
                <td className='font-semibold'>{data.student.name}</td>
              </tr>
              <tr>
                <td>Nis</td>
                <td>:</td>
                <td>{data.student.nis}</td>
              </tr>
              <tr>
                <td>Kelas</td>
                <td>:</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Keterangan</td>
                <td>:</td>
                <td>{data.description}</td>
              </tr>
              <tr>
                <td>Tanggal Bayar</td>
                <td>:</td>
                <td>{data.createdAt && formatDateTime(data.createdAt)}</td>
              </tr>

              <tr>
                <td>Status</td>
                <td>:</td>
                <td className=''>
                  <span className='bg-green-500 px-3 py-1 text-white rounded shadow'>Lunas</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='w-full max-w-screen-md px-4'>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis accusamus repellendus maxime fugiat sint et deserunt, commodi aliquid consequuntur veniam.</p>
          <p className='text-center font-normal mt-2'>- Tanggal cetak {formatDateTime(new Date())} -</p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
