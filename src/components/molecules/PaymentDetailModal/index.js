import React from 'react';

const PaymentDetailModal = ({ data, onClose }) => {
  if (!data) return null; // Tambahkan penanganan jika data null

  return (
    <div className="fixed inset-0 bg-gray-100/80 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">
          Detail Pembayaran
        </h2>

        <div className="grid grid-cols-1 gap-4">
          <DetailItem label="Nama" value={data.name || '-'} />
          <DetailItem label="NIS Siswa" value={data.student?.nis || '-'} />
          <DetailItem label="Nama Siswa" value={data.student?.name || '-'} />
          <DetailItem label="Jenis Pembayaran" value={data.type || '-'} />
          <DetailItem label="Tahun Ajaran" value={data.schoolYear || '-'} />
          <DetailItem
            label="Jumlah"
            value={data.amount ? `Rp ${data.amount.toLocaleString()}` : '-'}
          />
          <DetailItem label="Status" value={data.status || '-'} />
          <DetailItem label="Deskripsi" value={data.description || '-'} />
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-lg text-sm font-medium"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <span className="text-sm text-gray-900">{value}</span>
  </div>
);

export default PaymentDetailModal;