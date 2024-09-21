"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTaskFailure, addTaskRequest, addTaskSuccess } from "../taskActions";
import { AppDispatch } from "../store/store";
import { NewTask, Task } from "../constants/types";
import { getCookie } from "../utils/cookie";
import { useRouter } from "next/navigation";

interface FormError {
  title?: string;
  description?: string;
  duedate?: string;
}

const AddTask = () => {
  const { loading, error } = useSelector((state: any) => state.taskState);
  const [taskInput, setTaskInput] = useState<NewTask>({
    title: "",
    description: "",
    completed: false,
    duedate: "",
  });

  const [formError, setFormError] = useState<FormError | null>(null);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTaskInput((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): FormError => {
    const errors: FormError = {};
    if (!taskInput.title.trim()) {
      errors.title = "Please enter a title";
    }
    if (!taskInput.description.trim()) {
      errors.description = "Please enter a description";
    }
    if (!taskInput.duedate.trim()) {
      errors.duedate = "Please enter a due date";
    }
    return errors;
  };

  const addTask = async (newTask: NewTask) => {
    try {
      dispatch(addTaskRequest());
      const token = getCookie("token");

      const response = await fetch("http://localhost:4000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Task = await response.json();
      dispatch(addTaskSuccess(data));
    } catch (error: any) {
      dispatch(addTaskFailure(error.message));
    }
  };

  const handleAddTask = async (e: FormEvent) => {
    e.preventDefault();
    const validateErrors = validateForm();

    if (Object.keys(validateErrors).length > 0) {
      setFormError(validateErrors);
    } else {
      await addTask(taskInput);
      setFormError(null);
      setTaskInput({
        title: "",
        description: "",
        completed: false,
        duedate: "",
      });
      router.push("/tasks");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-5">Add New Task</h1>
      <form
        onSubmit={handleAddTask}
        className="flex flex-col space-y-4 mb-5 w-80"
      >
        <input
          type="text"
          name="title"
          value={taskInput.title}
          onChange={handleChange}
          placeholder="Enter task title"
          className="px-3 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {formError?.title && <p className="text-red-500">{formError.title}</p>}

        <textarea
          name="description"
          value={taskInput.description}
          onChange={handleChange}
          placeholder="Enter task description"
          className="px-3 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {formError?.description && (
          <p className="text-red-500">{formError.description}</p>
        )}

        <input
          type="date"
          name="duedate"
          value={taskInput.duedate}
          onChange={handleChange}
          className="px-3 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {formError?.duedate && (
          <p className="text-red-500">{formError.duedate}</p>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default AddTask;
