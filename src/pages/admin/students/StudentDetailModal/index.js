import Button from "@/components/atoms/Button";
import React from "react";
import { IoMdClose } from "react-icons/io";

const StudentDetailModal = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm z-50 animate-fadeIn">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg transform transition-all scale-95 animate-scaleIn">
    
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-2xl font-semibold text-gray-800">Student Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 transition"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-gray-500 font-medium">Name</div>
            <div className="font-semibold text-gray-800">{user.name}</div>

            <div className="text-gray-500 font-medium">NIS</div>
            <div className="font-semibold text-gray-800">{user.nis}</div>

            <div className="text-gray-500 font-medium">Class</div>
            <div className="font-semibold text-gray-800">{user.class}</div>

            <div className="text-gray-500 font-medium">Birthdate</div>
            <div className="font-semibold text-gray-800">{user.birthdate}</div>

            <div className="text-gray-500 font-medium">Phone</div>
            <div className="font-semibold text-gray-800">{user.phone}</div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default StudentDetailModal;
