import { Task } from "../constants/types";
import Link from "next/link";

export async function TaskDetails({ task }: { task: Task }) {
  const formatDate = (isoDate: any) => {
    return new Date(isoDate).toISOString().split("T")[0];
  };

  return (
    <div className="h-screen flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-5">Task Details</h1>
      <div className="p-4 border rounded-md shadow-sm w-80">
        <h3 className="text-lg font-bold mb-1">Title: {task.title}</h3>
        <p className="mb-2">Description: {task.description}</p>
        <p className="text-sm text-gray-500">
          Due Date: {formatDate(task.duedate) || "No due date"}
        </p>
        <p
          className={`text-sm font-semibold mt-2 ${
            task.completed ? "text-green-500" : "text-red-500"
          }`}
        >
          {task.completed ? "Completed" : "Not Completed"}
        </p>
        <Link
          href="/tasks"
          className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Back to Task List
        </Link>
      </div>
    </div>
  );
}
