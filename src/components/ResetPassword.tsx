import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  email: string;
  resetToken: string;
  newPassword: string;
}

interface FormErrors {
  email?: string;
  resetToken?: string;
  newPassword?: string;
}

const ResetPassword = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    resetToken: "",
    newPassword: "",
  });
  const [message, setMessage] = useState<string>("");
  const [formError, setFormError] = useState<FormErrors | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};

    if (!formData.email.trim()) {
      errors.email = "Please enter an email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!formData.resetToken.trim()) {
      errors.resetToken = "Please enter the reset token";
    }
    if (!formData.newPassword.trim()) {
      errors.newPassword = "Please enter a new password";
    }

    return errors;
  };

  const resetPassword = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:4000/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP Error! Status: ${response.status}`
        );
      }
      const data = await response.json();
      setMessage(data.message);
    } catch (error: any) {
      setMessage(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validateErrors = validateForm();
    if (Object.keys(validateErrors).length > 0) {
      setFormError(validateErrors);
    } else {
      resetPassword(formData);
      setFormError(null);
      setFormData({
        email: "",
        resetToken: "",
        newPassword: "",
      });
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-4 border border-gray-400 px-16 py-24 rounded-md shadow-lg"
      >
        <label htmlFor="email" className="block">
          Email:
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          value={formData.email}
          onChange={handleOnChange}
          className={`border ${
            formError?.email ? "border-red-500" : "border-gray-500"
          } rounded-md px-2 py-1`}
          aria-describedby="email-error"
        />
        {formError?.email && (
          <p id="email-error" className="text-red-500 text-sm">
            {formError.email}
          </p>
        )}

        <label htmlFor="resetToken" className="block">
          Token:
        </label>
        <input
          type="text"
          placeholder="Enter reset token"
          name="resetToken"
          value={formData.resetToken}
          onChange={handleOnChange}
          className={`border ${
            formError?.resetToken ? "border-red-500" : "border-gray-500"
          } rounded-md px-2 py-1`}
          aria-describedby="resetToken-error"
        />
        {formError?.resetToken && (
          <p id="resetToken-error" className="text-red-500 text-sm">
            {formError.resetToken}
          </p>
        )}

        <label htmlFor="newPassword" className="block">
          New Password:
        </label>
        <input
          type="password"
          placeholder="Enter new password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleOnChange}
          className={`border ${
            formError?.newPassword ? "border-red-500" : "border-gray-500"
          } rounded-md px-2 py-1`}
          aria-describedby="newPassword-error"
        />
        {formError?.newPassword && (
          <p id="newPassword-error" className="text-red-500 text-sm">
            {formError.newPassword}
          </p>
        )}

        <button
          type="submit"
          className={`border border-gray-400 rounded-md px-4 py-2 ${
            isLoading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Reset Password"}
        </button>
        {message && <p className="text-blue-400 mt-4">{message}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
