import { showNotificationWithTimeout } from '@/redux/notificationSlice';
import { updatePaymentStatus } from '@/services/payment';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const UpdateStatusModal = ({ data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(data?.status || '');


  const handleUpdate = async () => {

    if (data.id == status) {
      console.log("tidak ada yang berubah");
      onClose();
      return;
    };
    if (!status) return;


    const response = await updatePaymentStatus(data.id, status);
    if (response.status) {
      dispatch(
        showNotificationWithTimeout({
          message: "Update status berhasil",
          type: "success",
          duration: 3000,
        }),
      );
      onSuccess();
    } else {
      console.log(response.message);

    }

    onClose();
  };


  return (
    <div className="fixed inset-0 bg-gray-100/80 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">
          Perbarui Status Pembayaran
        </h2>

        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="">Pilih Status</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-lg text-sm font-medium"
          >
            Batal
          </button>
          <button
            onClick={handleUpdate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-medium"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateStatusModal;