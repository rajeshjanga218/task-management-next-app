import { Link } from "react-router-dom";
import DarkModeSwitch from "./DarkModeSwitch";
import { logoutUser, updateUser } from "../authActions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { deleteCookie } from "../utils";

const Navbar = () => {
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
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Task Management</div>
        <DarkModeSwitch />
        <ul className="flex space-x-4">
          <li className="text-gray-300 hover:text-white dark:text-red-300">
            <Link to="/">Home</Link>
          </li>
          <li className="text-gray-300 hover:text-white dark:text-red-300">
            About
          </li>
          <li className="text-gray-300 hover:text-white dark:text-red-300">
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
                  <Link to="/signin"> Sign In</Link>
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
