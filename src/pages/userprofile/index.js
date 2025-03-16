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
          <p>{user.nis || "No NIS available"}</p>
          <p className="text-gray-500">{user.email || "No email available"}</p>
          <div className="mt-2 flex gap-4">
            <Button className="rounded-md border border-gray-300 bg-white px-4 py-2 hover:bg-gray-200">
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
