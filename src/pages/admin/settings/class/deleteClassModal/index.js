import Button from "@/components/atoms/Button";
import { showNotificationWithTimeout } from "@/redux/notificationSlice";
import { deleteClass } from "@/services/class";
import React from "react";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";

const DeleteClassModal = ({ data, onClose, onRefresh }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      const response = await deleteClass(data.id);
      if (response.status) {
        dispatch(
          showNotificationWithTimeout({
            message: "Class permanent deleted successfully!",
            type: "success",
            duration: 3000,
          }),
        );
        onRefresh();
        onClose();
      }
    } catch (error) {
      console.error("Error deleting class:", error);
      dispatch(
        showNotificationWithTimeout({
          message: "Failed to delete class.",
          type: "error",
          duration: 3000,
        }),
      );
    }
  };

  return (
    <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-lg bg-white p-4 shadow-md">
        <Button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-900"
        >
          <MdClose size={20} />
        </Button>

        <div className="p-4 text-center">
          <svg
            className="mx-auto mb-4 h-12 w-12 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 className="mb-5 text-lg font-normal text-gray-500">
            Are you sure you want to permanent delete <b>{data.name}</b>?
          </h3>

          <Button
            onClick={handleDelete}
            className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 focus:outline-none"
          >
            Yes, I{"'"}m sure
          </Button>

          <Button
            onClick={onClose}
            className="ml-3 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700"
          >
            No, cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteClassModal;
