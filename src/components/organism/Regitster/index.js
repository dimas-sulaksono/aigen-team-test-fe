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
      nis: e.target.nis.value,
      username: e.target.username.value,
      email: e.target.email.value,
      name: e.target.name.value,
      password: e.target.password.value,
    };

    try {
      const response = await register(payload);
      // console.log(response);

      if (response.status) {
        dispatch(
          showNotificationWithTimeout({
            message: "register success",
            type: "success",
            duration: 3000,
          }),
        );
        router.push("/auth/login");
      } else {
        dispatch(
          showNotificationWithTimeout({
            message: response.data.data,
            type: "error",
            duration: 3000,
          }),
        );
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      dispatch(
        showNotificationWithTimeout({
          message: data.response.data.message,
          type: "error",
          duration: 3000,
        }),
      );
    }
  }
  return (
    <div className="space-y-4 p-6 sm:p-8 md:space-y-1">
      <h1 className="text-center text-xl leading-tight font-bold tracking-tight text-gray-900 md:text-2xl">
        Register
      </h1>
      <Form
        className="space-y-4 md:space-y-4"
        action="#"
        onSubmit={handleRegister}
      >
        <div>
          <label
            for="nis"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            NIS
          </label>
          <Input
            type="nis"
            name="nis"
            id="nis"
            className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600"
            placeholder="10000001234"
            required="true"
          />
        </div>
        <div>
          <label
            for="email"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <Input
            type="email"
            name="email"
            id="email"
            className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600"
            placeholder="name@company.com"
            required=""
          />
        </div>
        <div>
          <label
            for="username"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Username
          </label>
          <Input
            type="username"
            name="username"
            id="username"
            className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600"
            placeholder="Your Username"
            required=""
          />
        </div>
        <div>
          <label
            for="name"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Name
          </label>
          <Input
            type="name"
            name="name"
            id="name"
            className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600"
            placeholder="Your Name"
            required=""
          />
        </div>
        <div>
          <label
            for="password"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Password
          </label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600"
            required=""
          />
        </div>
        <Button
          type="submit"
          className="mt-1 w-full cursor-pointer rounded-md bg-gray-800 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-900 focus:ring-4 focus:ring-gray-500 focus:outline-none"
        >
          Sign Up
        </Button>
        <p className="text-center text-sm font-light text-gray-500">
          Already have an account?
          <Link
            href="/auth/login"
            className="font-medium text-gray-800 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default Register;
