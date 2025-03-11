import Button from "@/components/atoms/Button";
import Form from "@/components/atoms/Form";
import Input from "@/components/atoms/Input";
import { FaGraduationCap } from "react-icons/fa6";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { register } from "@/services/auth";
import { showNotificationWithTimeout } from "@/redux/notificationSlice";

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  async function handleRegister(e) {
    e.preventDefault();

    const payload = {
      username: e.target.username.value,
      email: e.target.email.value,
      name: e.target.name.value,
      password: e.target.password.value,
    };

    try {
      const response = await register(payload);
      if (response.status) {
        dispatch(
          showNotificationWithTimeout({
            message: "register success",
            type: "success",
            duration: 3000,
          })
        );
        router.push("/auth/login");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      dispatch(
        showNotificationWithTimeout({
          message: data.response.data.message,
          type: "error",
          duration: 3000,
        })
      );
    }
  }
  return (
    <div className="p-6 space-y-4 md:space-y-1 sm:p-8">
      <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
        Register
      </h1>
      <Form
        className="space-y-4 md:space-y-4"
        action="#"
        onSubmit={handleRegister}
      >
        <div>
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Email
          </label>
          <Input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5   "
            placeholder="name@company.com"
            required=""
          />
        </div>
        <div>
          <label
            for="username"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Username
          </label>
          <Input
            type="username"
            name="username"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5   "
            placeholder="Your Username"
            required=""
          />
        </div>
        <div>
          <label
            for="name"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Name
          </label>
          <Input
            type="name"
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5   "
            placeholder="Your Name"
            required=""
          />
        </div>
        <div>
          <label
            for="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Password
          </label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
            required=""
          />
        </div>
        <Button
          type="submit"
          className="cursor-pointer w-full text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium rounded-md text-sm px-5 py-2.5 mt-1 text-center "
        >
          Sign in
        </Button>
        <p className="text-sm font-light text-gray-500 text-center">
          Already have an account?
          <Link
            href="/auth/login"
            className="font-medium text-gray-800 hover:underline "
          >
            Sign in
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default Register;
