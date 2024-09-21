import DarkModeSwitch from "./DarkModeSwitch";
import Logout from "./Logout";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Task Management</div>
        <DarkModeSwitch />
        <ul className="flex space-x-4">
          <li className="text-gray-300 hover:text-white dark:text-red-300">
            <Link href="/">Home</Link>
          </li>
          <li className="text-gray-300 hover:text-white dark:text-red-300">
            About
          </li>
          <li className="text-gray-300 hover:text-white dark:text-red-300">
            <Logout />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
