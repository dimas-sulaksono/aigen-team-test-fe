import Button from "@/components/atoms/Button";
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import { getByemail } from "@/services/auth";
import { jwtDecode } from "jwt-decode";
import { getStudentByUsername } from "@/services/student";
import { useRouter } from "next/router";
import EditProfileModal from "@/components/molecules/EditProfile";
import EditStudentModal from "@/components/molecules/EditStudent";

function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const router = useRouter();

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const email = decoded?.sub;

      if (!email) throw new Error("Invalid token structure");

      const response = await getByemail(email);
      setUser(response?.data || null);
    } catch (error) {
      console.error("Error fetching user data:", error);
      localStorage.removeItem("token");
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const fetchStudent = useCallback(async () => {
    try {
      const response = await getStudentByUsername(user.name);
      setStudent(response?.data || null);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  }, [user]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (user) {
      fetchStudent();
    }
  }, [user, fetchStudent]);

  if (loading) return <p className="p-6 text-gray-500">Loading...</p>;
  if (!user) return <p className="p-6 text-gray-500">User not found</p>;

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-gray-600">Manage your account information</p>
      </div>
      <div className="flex items-center gap-6 rounded-lg bg-gray-100 p-6 shadow-md">
        <Image
          src={
            user.image
              ? `${process.env.NEXT_PUBLIC_API_URL}/user/imagesPath/${user.image}`
              : "https://i.pinimg.com/736x/b4/17/43/b4174378a144eb2ce8c89b0b55a461c2.jpg"
          }
          alt="avatar"
          width={100}
          height={100}
          className="aspect-square h-24 w-24 rounded-full object-cover"
        />
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">
            {user.name || "No name available"}
          </h2>
          <p className="text-slate-700">
            NIS: {user.nis || "No NIS available"}
          </p>
          <p className="text-slate-700">
            Email: {user.email || "No email available"}
          </p>
          <div className="mt-2 flex gap-4">
            <Button
              className="rounded-md border border-gray-300 bg-white px-4 py-2 hover:bg-gray-200"
              onClick={() => setIsProfileModalOpen(true)}
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-gray-100 p-6 shadow-md">
        <h2 className="text-xl font-semibold">Data Student</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h3 className="font-medium">Alamat</h3>
            <p>Alamat : {student?.address || "No data available"}</p>
          </div>

          <div>
            <h3 className="font-medium">Nomor Induk Siswa</h3>
            <p>Nis : {student?.nis || "No data available"}</p>
          </div>

          <div>
            <h3 className="font-medium">Kelas</h3>
            <p>{student?.className || "No data available"}</p>
          </div>

          <div>
            <h3 className="font-medium">Tanggal Lahir</h3>
            <p>{student?.birthdate || "No data available"}</p>
          </div>

          <div>
            <h3 className="font-medium">Tahun Ajaran</h3>
            <p>{student?.schoolYear || "No data available"}</p>
          </div>

          <div>
            <h3 className="font-medium">Nomor Telepon</h3>
            <p>{student?.phoneNumber || "No data available"}</p>
          </div>

          <div className="mt-2 flex gap-4">
            <Button
              className="rounded-md border border-gray-300 bg-white px-4 py-2 hover:bg-gray-200"
              onClick={() => setIsStudentModalOpen(true)}
            >
              Edit Data Student
            </Button>
          </div>
        </div>
      </div>

      <EditProfileModal
        isOpen={isProfileModalOpen}
        onRequestClose={() => setIsProfileModalOpen(false)}
        user={user}
      />

      <EditStudentModal
        isOpen={isStudentModalOpen}
        onRequestClose={() => setIsStudentModalOpen(false)}
        student={student}
        setStudent={setStudent}
      />
    </div>
  );
}

export default UserProfilePage;
