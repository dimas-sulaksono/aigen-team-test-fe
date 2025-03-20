import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { FaGraduationCap } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import Form from "@/components/atoms/Form";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { login } from "@/services/auth";
import { showNotificationWithTimeout } from "@/redux/notificationSlice";
import Link from "next/link";
import { showNavbar } from "@/redux/navbarReduce";
import { jwtDecode } from "jwt-decode";
const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  async function handleLogin(e) {
    e.preventDefault();

    const payload = {
      username: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const response = await login(payload);
      console.log(response);

      if (response.status) {
        localStorage.setItem("token", response.data.data, {
          expires: 7,
          path: "/",
        });
        dispatch(
          showNotificationWithTimeout({
            message: "login success",
            type: "success",
            duration: 3000,
          }),
        );
        dispatch(showNavbar());

        try {
          const decoded = jwtDecode(response.data.data);
          const roles = decoded.role || [];
          console.log("roles", roles);
          if (roles.includes("ADMIN")) {
            router.replace("/admin");
          } else {
            router.replace("/home");
          }
        } catch (error) {
          console.error("Invalid token:", error);
          router.replace("/auth/login");
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      dispatch(
        showNotificationWithTimeout({
          message: error.response.data.message,
          type: "error",
          duration: 3000,
        }),
      );
    }
  }

  return (
    <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
      <div className="flex justify-center text-5xl text-gray-700">
        <FaGraduationCap />
      </div>
      <h1 className="text-center text-xl leading-tight font-bold tracking-tight text-gray-900 md:text-2xl">
        School Payment
      </h1>
      <Form
        className="space-y-4 md:space-y-6"
        action="#"
        onSubmit={handleLogin}
      >
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
          Sign in
        </Button>
        <p className="text-center text-sm font-light text-gray-500">
          Don{"'"}t have an account yet?{" "}
          <Link
            href="/auth/register"
            className="font-medium text-gray-800 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default Login;
