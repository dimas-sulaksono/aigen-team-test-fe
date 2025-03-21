import AdminLayout from "@/components/templates/AdminLayout";
import React, { useState, useEffect } from "react";
import { getAllUsers, filterUser } from "@/services/auth";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { Pagination } from "@/components/molecules/Pagination";
import { useRouter } from "next/router";
import DeleteUserModal from "./DeleteUserModal";
import EditUserModal from "./EditUserModal";
import { useDispatch } from "react-redux";
import { LoadingStatus } from "@/components/molecules/LoadingStatus";

function User() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers(router.query);
      if (Array.isArray(response.data.content)) {
        setPage(response.data);
        setUsers(response.data.content);
      } else {
        setUsers([]);
      }
    } catch (error) {
      setError(error.message || "Gagal mengambil data user");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (e) => {
    const selectedRole = e.target.value;
    setLoading(true);
    setSelectedRole(selectedRole);
    if (selectedRole === "") {
      router.push(router.pathname);
      fetchUsers();
      return;
    }
    const query = { role: selectedRole };
    const response = await filterUser(query);
    console.log(response);

    if (response.status) {
      setUsers(response.data.data.content);
      router.push({
        pathname: router.pathname,
        query: { ...router.query, role: selectedRole },
      });
    } else {
      setError(response.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [router.query.page]);

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedUser(null);
    setIsDeleteModalOpen(false);
  };

  const openEditModal = (user) => {
    setSelectedUserForEdit(user);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedUserForEdit(null);
    setIsEditModalOpen(false);
  };

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <AdminLayout>
        <section className="relative">
          {loading && <LoadingStatus />}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="mb-4 flex w-full flex-col">
              <div className="flex flex-row justify-between">
                <h2 className="pb-4 text-xl font-semibold text-gray-700">
                  User List
                </h2>
                <select
                  value={selectedRole}
                  onChange={handleRoleChange}
                  className="w-1/3 p-2"
                >
                  <option value="">All</option>
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
              <hr className="my-4 text-slate-200" />
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="border-b border-gray-300 bg-gray-50 text-xs uppercase">
                    <tr>
                      <th className="py-3 pl-4">No</th>
                      <th className="py-3 pl-2">Nis</th>
                      <th className="px-6 py-3">Email</th>
                      <th className="px-6 py-3">Name</th>
                      <th className="px-6 py-3">Role</th>
                      <th className="px-6 py-3">Image</th>
                      <th className="px-6 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.length > 0 ? (
                      users.map((user, index) => (
                        <tr key={user.id} className="border-b border-gray-200">
                          <td className="py-3 pl-4">{index + 1}</td>
                          <td className="py-3 pl-2">{user.nis}</td>
                          <td className="px-6 py-3">{user.email}</td>
                          <td className="px-6 py-3">{user.name}</td>
                          <td className="px-6 py-3">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                user.role === "ADMIN"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-3">
                            {user.image ? (
                              <Image
                                src={`${process.env.NEXT_PUBLIC_API_URL}/user/imagesPath/${user.image}`}
                                alt={user.name}
                                width={50}
                                height={50}
                                className="rounded-full"
                              />
                            ) : (
                              <Image
                                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                alt={user.name}
                                width={50}
                                height={50}
                                className="rounded-full"
                              />
                            )}
                          </td>
                          <td className="mr-4 px-6 py-3">
                            <>
                              <Button
                                className="mr-4 cursor-pointer text-blue-600 hover:text-blue-700"
                                onClick={() => openEditModal(user)}
                              >
                                <FaRegEdit size={18} />
                              </Button>
                              <Button
                                className="cursor-pointer text-red-600 hover:text-red-700"
                                onClick={() => openDeleteModal(user)}
                              >
                                <FaRegTrashCan
                                  size={18}
                                  color="red"
                                  className="text-white"
                                />
                              </Button>
                            </>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="7"
                          className="py-4 text-center text-gray-500"
                        >
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {page && <Pagination pageable={page} />}
          </div>
        </section>
      </AdminLayout>

      {isDeleteModalOpen && (
        <DeleteUserModal
          data={selectedUser}
          onClose={closeDeleteModal}
          dispatch={dispatch}
          onRefresh={fetchUsers}
        />
      )}

      {isEditModalOpen && (
        <EditUserModal
          onClose={closeEditModal}
          onRefresh={fetchUsers}
          user={selectedUserForEdit}
          dispatch={dispatch}
        />
      )}
    </>
  );
}

export default User;
