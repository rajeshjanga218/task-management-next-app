"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUserFailure,
  loginUserRequest,
  loginUserSuccess,
} from "../authActions";
import { setCookie } from "../utils/cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FormData {
  email: string;
  password: string;
}

interface FormError {
  email?: string;
  password?: string;
}

function Signin() {
  const { error, loading } = useSelector((state: any) => state.userState);
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState<FormError>({});

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = (): FormError => {
    const errors: FormError = {};
    if (!formData.email.trim()) {
      errors.email = "Please enter an email.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email.";
    }

    if (!formData.password.trim()) {
      errors.password = "Please enter a password.";
    }

    return errors;
  };

  const loginUser = async (data: FormData) => {
    try {
      dispatch(loginUserRequest());
      const response = await fetch("http://localhost:4000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }

      const resData = await response.json();
      setCookie("token", resData.token, 1);
      localStorage.setItem("user", JSON.stringify(resData.user));
      dispatch(loginUserSuccess(resData));
      router.push("/");
    } catch (error: any) {
      const errorMessage =
        error.message === "user not found"
          ? "Email not registered. Please sign up."
          : error.message;
      dispatch(loginUserFailure(errorMessage));
    }
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validateErrors = validateForm();
    if (Object.keys(validateErrors).length > 0) {
      setFormError(validateErrors);
    } else {
      await loginUser(formData);
      setFormError({});
      setFormData({ email: "", password: "" });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-2 border border-gray-300 rounded-md p-8 max-w-md w-full"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleOnChange}
            className={`border ${
              formError.email ? "border-red-500" : "border-gray-300"
            } rounded-md p-2 w-full`}
            placeholder="Enter your email"
            aria-describedby="email-error"
          />
          {formError.email && (
            <p id="email-error" className="text-red-500 text-sm">
              {formError.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleOnChange}
            className={`border ${
              formError.password ? "border-red-500" : "border-gray-300"
            } rounded-md p-2 w-full`}
            placeholder="Enter your password"
            aria-describedby="password-error"
          />
          {formError.password && (
            <p id="password-error" className="text-red-500 text-sm">
              {formError.password}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center mt-2">
          <Link
            href="/request-password"
            className="text-blue-500 text-sm hover:underline"
          >
            Forgot password?
          </Link>
          <Link
            href="/signup"
            className="text-blue-500 text-sm hover:underline"
          >
            Sign up
          </Link>
        </div>

        <button
          type="submit"
          className="border border-gray-600 rounded-md px-4 py-2 mt-4 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign In
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
}

export default Signin;
