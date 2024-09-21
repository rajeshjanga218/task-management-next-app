"use client";

import { logoutUser, updateUser } from "@/authActions";
import { deleteCookie, getCookie } from "@/utils/cookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function Logout() {
  const { user } = useSelector((state: any) => state.userState);

  const dispatch = useDispatch();

  const handleOnClick = () => {
    localStorage.removeItem("user");
    deleteCookie("token");
    dispatch(logoutUser());
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        dispatch(updateUser(userData));
      } catch (error) {
        console.error("Failed to parse stored user", error);
        dispatch(logoutUser());
      }
    }
  }, [dispatch]);

  return (
    <>
      {user ? (
        <div className="flex gap-4">
          <div className="flex flex-col justify-center items-center">
            <img
              src="/svg/userProfile.svg"
              alt="user-profile"
              className="w-4 h-54"
            />
            <p className="text-amber-400">{user.firstName}</p>
          </div>
          <button
            type="button"
            onClick={handleOnClick}
            className="px-2 py-1 border border-gray-500 rounded-md"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          <button
            type="button"
            className="px-2 py-1 border border-gray-500 rounded-md"
          >
            <Link href="/signin"> Sign In</Link>
          </button>
        </div>
      )}
    </>
  );
}

export default Logout;
