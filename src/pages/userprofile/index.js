import Button from "@/components/atoms/Button";
import Image from "next/image";
import React from "react";

function UserProfilePage() {
  return (
    <div className="p-6">
      {/* Profile Section */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-gray-600">Manage your account information</p>
      </div>

      <div className="flex items-center gap-6 rounded-lg bg-gray-100 p-6 shadow-md">
        <Image
          src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
          alt="avatar"
          width={100}
          height={100}
          className="aspect-square rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold">John Doe</h2>
          <p className="text-gray-500">Admin</p>
          <p className="text-gray-500">email@example.com</p>
          <div className="mt-2 flex gap-4">
            <Button className="rounded-md border border-gray-300 bg-white px-4 py-2 hover:bg-gray-200">
              Edit Profile
            </Button>
            <Button className="rounded-md border border-gray-300 bg-white px-4 py-2 hover:bg-gray-200">
              Edit NIS
            </Button>
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "Outstanding Balance", amount: "Rp. 1.000.000", date: null },
          {
            title: "Last Payment",
            amount: "Rp. 1.000.000",
            date: "Jan 1, 2023",
          },
          { title: "Next Due Date", amount: null, date: "Feb 1, 2023" },
        ].map((item, index) => (
          <div key={index} className="rounded-lg border bg-white p-4 shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">
              {item.title}
            </h3>
            {item.amount && (
              <p className="text-xl font-bold text-blue-600">{item.amount}</p>
            )}
            {item.date && <p className="text-gray-500">{item.date}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProfilePage;
