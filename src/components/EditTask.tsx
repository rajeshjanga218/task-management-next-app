import React, { useState } from "react";
import { Task } from "../constants/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import {
  updateTaskFailure,
  updateTaskRequest,
  updateTaskSuccess,
} from "../taskActions";
import { getCookie } from "../utils";

interface EditTaskProps {
  task: Task;
  closeModal: any;
}

const EditTask = ({ task, closeModal }: EditTaskProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [taskInput, setTaskInput] = useState<Task>(task);
  const [formError, setFormError] = useState<string | null>(null);

  const formatDate = (isoDate: string | null | undefined) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTaskInput((prev) => ({ ...prev, [name]: value }));
  };

  const editTask = async (id: number, taskInput: Task) => {
    try {
      dispatch(updateTaskRequest());
      const token = getCookie("token");
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskInput),
      };
      const response = await fetch(`http://localhost:4000/task/${id}`, options);
      if (!response.ok) {
        throw new Error(`HTTP Error! status:${response.status}`);
      }
      const data = await response.json();
      dispatch(updateTaskSuccess(data[0]));
      return true;
    } catch (error: any) {
      dispatch(updateTaskFailure(error.message || "Error"));
      setFormError(error.message || "Error occurred while updating the task");
      return false;
    }
  };

  const handleEditTask = async () => {
    if (
      taskInput.title.trim() === "" ||
      taskInput.description.trim() === "" ||
      !taskInput.duedate
    ) {
      setFormError("Title, description, and due date are required.");
      return;
    }

    const success = await editTask(taskInput.id, taskInput);
    if (success) {
      closeModal();
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-5">Edit Task</h1>
      <div className="flex flex-col space-y-4 mb-5 w-80">
        <input
          type="text"
          name="title"
          value={taskInput.title}
          onChange={handleChange}
          placeholder="Enter task title"
          className="px-3 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="description"
          value={taskInput.description}
          onChange={handleChange}
          placeholder="Enter task description"
          className="px-3 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          name="duedate"
          value={formatDate(taskInput.duedate)} // Format the due date
          onChange={handleChange}
          className="px-3 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {formError && <p className="text-red-500">{formError}</p>}
        <button
          onClick={handleEditTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditTask;
