import { Task } from "@/constants/types";
import { cookies } from "next/headers";

export async function fetchTasks(title?: string, completed?: string) {
  try {
    let url = `http://localhost:4000/tasks?`;

    if (title) {
      url += `title=${encodeURIComponent(title)}&`;
    }

    if (completed) {
      url += `completed=${completed}`;
    }

    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Task[] = await response.json();
    return data;
  } catch (error: any) {
    throw error.message;
  }
}

export async function fetchTask(id: number) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`http://localhost:4000/task/${id}`, options);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }
    const data: Task = await response.json();
    return data;
  } catch (error: any) {
    throw error.message;
  }
}
