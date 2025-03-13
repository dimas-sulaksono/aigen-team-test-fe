import Button from "@/components/atoms/Button";
import Form from "@/components/atoms/Form";
import Input from "@/components/atoms/Input";
import React from "react";
import { IoMdClose } from "react-icons/io";

const EditStudentModal = ({ onClose, user }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm z-50 ">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg">
        
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-2xl font-semibold text-gray-800">Edit Student</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 transition"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        <Form className="p-3 mt-3">
          <div className="grid gap-4 mb-4 grid-cols-2">
            
            <div className="col-span-2">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
              <Input 
                type="text" 
                name="name" 
                id="name" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" 
                defaultValue={user.name}
                required 
              />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="nis" className="block mb-2 text-sm font-medium text-gray-900">NIS</label>
              <Input 
                type="number" 
                name="nis" 
                id="nis" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" 
                defaultValue={user.nis} 
                required 
              />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="class" className="block mb-2 text-sm font-medium text-gray-900">Class</label>
              <select 
                id="class" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                
              >
                <option value={user.class}>{user.class}</option>
                <option value="10">Class 10</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone</label>
              <Input 
                type="number" 
                name="phone" 
                id="phone" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" 
                defaultValue={user?.phone}
                required 
              />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="birthdate" className="block mb-2 text-sm font-medium text-gray-900">Birthdate</label>
              <Input 
                type="date" 
                name="birthdate" 
                id="birthdate" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" 
                required 
                defaultValue={new Date(user?.birthdate).toISOString().split('T')[0]}
              />
            </div>

            <div className="col-span-2">
              <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Address</label>
              <textarea 
                id="address" 
                rows="4" 
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" 
                placeholder="Write address here"
                defaultValue={user?.address}
                required
              ></textarea>                    
            </div>
          </div>

          <Button 
            type="submit" 
            className="text-white flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 transition"
          >
            <svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
            </svg>
            Add new student
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditStudentModal;
