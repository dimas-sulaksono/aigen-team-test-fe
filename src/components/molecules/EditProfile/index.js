import React, { useState } from "react";
import Modal from "react-modal";
import { updateUser } from "@/services/auth";
import { useRouter } from "next/router";
import { showNotificationWithTimeout } from "@/redux/notificationSlice";
import { useDispatch } from "react-redux";

Modal.setAppElement("#__next");

const EditProfileModal = ({ isOpen, onRequestClose, user }) => {
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(user?.image || "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    let shouldLogout = false;

    if (email.trim() && email !== user?.email) {
      formData.append("email", email);
      shouldLogout = true;
    }

    if (password.trim()) {
      formData.append("password", password);
      shouldLogout = true;
    }

    if (image) {
      formData.append("image", image);
    }

    try {
      const result = await updateUser(user.id, formData);

      if (result.status) {
        dispatch(
          showNotificationWithTimeout({
            message: "Profile updated successfully!",
            type: "success",
            duration: 3000,
          }),
        );

        onRequestClose();

        if (shouldLogout) {
          localStorage.removeItem("token");
          router.push("/auth/login");
        } else {
          router.reload();
        }
      } else {
        dispatch(
          showNotificationWithTimeout({
            message: result.message?.data?.data || "Failed to update profile",
            type: "error",
            duration: 5000,
          }),
        );
      }
    } catch (error) {
      console.error(error);
      dispatch(
        showNotificationWithTimeout({
          message: error.message || "An error occurred",
          type: "error",
          duration: 5000,
        }),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="mx-auto mt-20 w-[400px] rounded-lg bg-white p-6 shadow-lg"
      overlayClassName="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
    >
      <h2 className="mb-4 text-xl font-semibold">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="block">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border p-2"
          />
        </label>

        <label className="block">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-md border p-2"
          />
        </label>

        <label className="block">
          Profile Image:
          <input type="file" onChange={handleImageChange} className="mt-1" />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 h-24 w-24 rounded-full"
            />
          )}
        </label>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onRequestClose}
            className="rounded-md bg-gray-300 px-4 py-2"
            disabled={loading}
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

export default EditProfileModal;
