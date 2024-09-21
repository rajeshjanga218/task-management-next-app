"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signupUserRequest,
  signupUserSuccess,
  signupUserFailure,
} from "../authActions";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface FormErrors {
  firstName?: string;
  email?: string;
  password?: string;
}

function Signup() {
  const { error, loading } = useSelector((state: any) => state.userState);
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "Please enter your first name.";
    }

    if (!formData.email.trim()) {
      errors.email = "Please enter your email.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email.";
    }

    if (!formData.password.trim()) {
      errors.password = "Please enter your password.";
    }

    return errors;
  };

  const signupUser = async (userData: FormData) => {
    try {
      dispatch(signupUserRequest());

      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(
          errorMessage.message || `HTTP error! Status: ${response.status}`
        );
      }

      const data = await response.json();
      dispatch(signupUserSuccess(data));
      router.push("/signin");
    } catch (error: any) {
      dispatch(signupUserFailure(error.message));
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      signupUser(formData);
      setFormErrors({});
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-2 rounded-md border border-gray-400 p-12 max-w-md w-full"
      >
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleOnChange}
            className={`border ${
              formErrors.firstName ? "border-red-500" : "border-gray-300"
            } rounded-md p-2 w-full`}
            placeholder="Enter your first name"
            aria-describedby="firstName-error"
          />
          {formErrors.firstName && (
            <p id="firstName-error" className="text-red-600 text-sm">
              {formErrors.firstName}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleOnChange}
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="Enter your last name"
          />
        </div>

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
              formErrors.email ? "border-red-500" : "border-gray-300"
            } rounded-md p-2 w-full`}
            placeholder="Enter your email"
            aria-describedby="email-error"
          />
          {formErrors.email && (
            <p id="email-error" className="text-red-600 text-sm">
              {formErrors.email}
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
              formErrors.password ? "border-red-500" : "border-gray-300"
            } rounded-md p-2 w-full`}
            placeholder="Enter your password"
            aria-describedby="password-error"
          />
          {formErrors.password && (
            <p id="password-error" className="text-red-600 text-sm">
              {formErrors.password}
            </p>
          )}
        </div>

        <Link
          href="/signin"
          className="text-blue-500 text-sm mt-2 hover:underline"
        >
          Already have an account? Log in
        </Link>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="border border-gray-600 rounded-md px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </div>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
}

export default Signup;
