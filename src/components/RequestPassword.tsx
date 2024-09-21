import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

interface FormErrors {
  email?: string;
}

const RequestPasswordReset = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [inputError, setInputError] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};
    if (!email.trim()) {
      errors.email = "Please enter your email.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email.";
    }
    return errors;
  };

  const requestPassword = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:4000/request-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP Error! Status: ${response.status}`
        );
      }

      const data = await response.json();
      setMessage(data.message);
      navigate("/reset-password");
    } catch (error: any) {
      setIsLoading(false);
      setMessage(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestPassword = () => {
    const validateErrors = validateForm();
    if (Object.keys(validateErrors).length > 0) {
      setInputError(validateErrors);
    } else {
      requestPassword();
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4 border border-gray-400 px-16 py-24 rounded-md shadow-lg">
        <h1 className="text-xl font-semibold mb-4">
          Please enter your email address
        </h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          className={`border ${
            inputError.email ? "border-red-500" : "border-gray-300"
          } rounded-md p-2 w-full`}
          aria-describedby="email-error"
        />
        {inputError.email && (
          <p id="email-error" className="text-red-500 text-sm">
            {inputError.email}
          </p>
        )}
        <button
          onClick={handleRequestPassword}
          className="border border-gray-500 rounded-md p-2 bg-blue-500 text-white hover:bg-blue-600"
        >
          Request Code
        </button>
        {message && <p className="text-green-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default RequestPasswordReset;
