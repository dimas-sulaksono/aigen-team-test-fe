import React, { useState } from "react";
import Modal from "react-modal";
import { updateStudent } from "@/services/student";
import { useDispatch } from "react-redux";
import { showNotificationWithTimeout } from "@/redux/notificationSlice";
import Input from "@/components/atoms/Input";

Modal.setAppElement("#__next");

const EditStudentModal = ({ isOpen, onRequestClose, student, setStudent }) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      birthdate: e.target.birthdate.value,
      phoneNumber: e.target.phoneNumber.value,
      address: e.target.address.value,
    };
    console.log("ini payload", payload);

    try {
      const res = await updateStudent(student.id, payload);
      console.log("ini res", res);

      if (res.status) {
        dispatch(
          showNotificationWithTimeout({
            message: "Student updated successfully!",
            type: "success",
            duration: 3000,
          }),
        );
        onRequestClose();
        setStudent(res.data);
      } else {
        dispatch(
          showNotificationWithTimeout({
            message: res.message?.data?.data,
            type: "error",
            duration: 5000,
          }),
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(
        showNotificationWithTimeout({
          message: error.message,
          type: "error",
          duration: 5000,
        }),
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="mx-auto w-[400px] rounded-lg bg-white p-6 shadow-lg"
      overlayClassName="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
    >
      <h2 className="mb-4 text-xl font-semibold">Edit Student</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="block">
          Phone Number:
          <input
            type="number"
            defaultValue={student?.phoneNumber}
            name="phoneNumber"
            className="mt-1 w-full rounded-md border p-2"
          />
        </label>

        <label className="block">
          Address:
          <textarea
            defaultValue={student?.address}
            name="address"
            className="mt-1 w-full rounded-md border p-2"
          />
        </label>

        <label
          htmlFor="birthdate"
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          Birthdate
        </label>
        <Input
          type="date"
          name="birthdate"
          id="birthdate"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600"
          required
          defaultValue={student?.birthdate}
        />

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onRequestClose}
            className="rounded-md bg-gray-300 px-4 py-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-blue-500 px-4 py-2 text-white"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditStudentModal;
