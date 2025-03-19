import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#__next");

const EditStudentModal = ({ isOpen, onRequestClose, user }) => {
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [birthdate, setBirthdate] = useState(user?.birthdate || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ phone, address, birthdate });
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
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full rounded-md border p-2"
          />
        </label>

        <label className="block">
          Address:
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 w-full rounded-md border p-2"
          />
        </label>

        <label className="block">
          Birthdate:
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="mt-1 w-full rounded-md border p-2"
          />
        </label>

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
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditStudentModal;
