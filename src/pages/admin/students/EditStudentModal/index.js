import Button from "@/components/atoms/Button";
import Form from "@/components/atoms/Form";
import Input from "@/components/atoms/Input";
import { showNotificationWithTimeout } from "@/redux/notificationSlice";
import { updateStudent } from "@/services/student";
import React from "react";
import { IoMdClose } from "react-icons/io";

const EditStudentModal = ({ onClose, onRefresh, user, classes, dispatch }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: e.target.name.value,
      classId: Number(e.target.classId.value),
      nis: e.target.nis.value,
      birthdate: e.target.birthdate.value,
      phoneNumber: Number(e.target.phoneNumber.value),
      address: e.target.address.value,
    };

    // console.log(payload);

    try {
      const res = await updateStudent(user.id, payload);
      console.log("ini res", res);

      if (res.status) {
        dispatch(
          showNotificationWithTimeout({
            message: "Student updated successfully!",
            type: "success",
            duration: 3000,
          }),
        );
        onClose();
        onRefresh();
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

  console.log(user.id);

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-2xl font-semibold text-gray-800">Edit Student</h2>
          <button
            onClick={onClose}
            className="text-gray-500 transition hover:text-gray-900"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        <Form className="mt-3 p-3" onSubmit={handleSubmit}>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Name
              </label>
              <Input
                type="text"
                name="name"
                id="name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600"
                defaultValue={user.name}
                required
              />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="nis"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                NIS
              </label>
              <Input
                type="number"
                name="nis"
                id="nis"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600"
                defaultValue={user.nis}
                readOnly={true}
              />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="classId"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Class
              </label>
              <select
                id="classID"
                name="classId"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                defaultValue={user.classId}
              >
                <option value={user.classId}>{user.className}</option>
                {classes.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="phoneNumber"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Phone
              </label>
              <Input
                type="number"
                name="phoneNumber"
                id="phoneNumber"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600"
                defaultValue={user?.phoneNumber}
                required
              />
            </div>

            <div className="col-span-2 sm:col-span-1">
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
                defaultValue={
                  new Date(user?.birthdate).toISOString().split("T")[0]
                }
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="address"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Address
              </label>
              <textarea
                id="address"
                rows="4"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Write address here"
                defaultValue={user?.address}
                required
              ></textarea>
            </div>
          </div>

          <Button
            type="submit"
            className="flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none"
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            Update student
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditStudentModal;
