import Button from "@/components/atoms/Button";
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import { getByemail } from "@/services/auth";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";

function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading...</p>;
  }

  if (!user) {
    return <p className="p-6 text-gray-500">User not found</p>;
  }

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
              : "data:image/jpeg;base64,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"
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
            email: {user.email || "No email available"}
          </p>
          <div className="mt-2 flex gap-4">
            <Button className="rounded-md border border-gray-300 bg-white px-4 py-2 hover:bg-gray-200">
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
            <p>Pendidikan: {user.educationAddress || "No data available"}</p>
            <p>Alamat KTP: {user.ktpAddress || "No data available"}</p>
          </div>
          <div>
            <h3 className="font-medium">Pengalaman</h3>
            <p>
              Pengalaman Kerja: {user.workExperience || "No data available"}
            </p>
            <p>
              Pengalaman Organisasi:{" "}
              {user.organizationExperience || "No data available"}
            </p>
          </div>
          <div>
            <h3 className="font-medium">Keluarga</h3>
            <p>{user.familyInfo || "No data available"}</p>
          </div>
          <div>
            <h3 className="font-medium">Media Sosial</h3>
            <p>{user.socialMedia || "No data available"}</p>
          </div>
          <div>
            <h3 className="font-medium">Provinsi KTP</h3>
            <p>{user.ktpProvince || "No data available"}</p>
          </div>
          <div>
            <h3 className="font-medium">Kecamatan KTP</h3>
            <p>{user.ktpDistrict || "No data available"}</p>
          </div>
          <div>
            <h3 className="font-medium">Kota / Kab. KTP</h3>
            <p>{user.ktpCity || "No data available"}</p>
          </div>
          <div>
            <h3 className="font-medium">Kode Pos KTP</h3>
            <p>{user.ktpPostalCode || "No data available"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
