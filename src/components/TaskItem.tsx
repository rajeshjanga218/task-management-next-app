"use client";

import { useState } from "react";
import { DeletedTask, Task } from "../constants/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import {
  deleteTaskFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  updateTaskFailure,
  updateTaskRequest,
  updateTaskSuccess,
} from "../taskActions";
import Modal from "./Modal";
import EditTask from "./EditTask";
// import { getCookie } from "../utils";
import Link from "next/link";

interface TaskItemProps {
  task: Task;
}

function TaskItem({ task }: TaskItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleDeleteTask = async (id: number) => {
    // try {
    //   dispatch(deleteTaskRequest());
    //   const token = getCookie("token");
    //   const options: RequestInit = {
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   };
    //   const response = await fetch(
    //     `http://localhost:4000/tasks/${id}`,
    //     options
    //   );
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }
    //   const data: DeletedTask = await response.json();
    //   dispatch(deleteTaskSuccess(data));
    // } catch (error: any) {
    //   dispatch(deleteTaskFailure(error.message || "Error occurred"));
    // }
  };

  const reduceDescription = (description?: string) => {
    if (!description) return "";
    const maxLength = 50;
    return description.length > maxLength
      ? description.substring(0, maxLength) + "..."
      : description;
  };

  const toggleCompleted = async (id: number) => {
    // try {
    //   dispatch(updateTaskRequest());
    //   const updatedTask = { ...task, completed: !task.completed };
    //   const token = getCookie("token");
    //   const options: RequestInit = {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //     body: JSON.stringify(updatedTask),
    //   };
    //   const response = await fetch(`http://localhost:4000/task/${id}`, options);
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }
    //   const data = await response.json();
    //   dispatch(updateTaskSuccess(data[0]));
    // } catch (error: any) {
    //   dispatch(updateTaskFailure(error.message || "Error occurred"));
    // }
  };

  return (
    <div className="flex flex-col mb-4 p-4 border rounded-md shadow-sm">
      <h3 className="text-lg font-bold mb-1">{task.title}</h3>
      <p className="mb-2">{reduceDescription(task.description)}</p>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Due Date:{" "}
          {task.duedate
            ? new Date(task.duedate).toLocaleDateString()
            : "No due date"}
        </p>
        <p
          className={`text-sm font-semibold ${
            task.completed ? "text-green-500" : "text-red-500"
          }`}
        >
          {task.completed ? "Completed" : "Not Completed"}
        </p>
      </div>
      <div className="flex justify-between items-center mt-2">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleCompleted(task.id)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2">Mark as Completed</span>
        </label>
        <div className="space-x-2">
          <Link
            href={`/task/${task.id}`}
            className="text-blue-500 hover:text-blue-600 transition"
          >
            Details
          </Link>
          <button
            onClick={openModal}
            className="text-yellow-500 hover:text-yellow-600 transition"
          >
            Edit
          </button>
          {/* <Modal isOpen={isOpen} closeModal={closeModal}>
            <EditTask task={task} closeModal={closeModal} />
          </Modal> */}
          <button
            onClick={() => handleDeleteTask(task.id)}
            className="text-red-500 hover:text-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
