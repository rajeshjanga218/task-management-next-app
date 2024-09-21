import Link from "next/link";
import TasksList from "./TasksList";
import { Task } from "@/constants/types";

const Tasks = ({ tasks }: { tasks: Task[] }) => {
  return (
    <div className="h-screen flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-5">Task Manager</h1>
      <Link
        href="/add-task"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition mb-4"
      >
        Add New Task
      </Link>

      <TasksList tasks={tasks} />
    </div>
  );
};

export default Tasks;
