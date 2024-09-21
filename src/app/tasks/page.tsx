import Tasks from "@/components/Tasks";
import { Task } from "@/constants/types";
import { fetchTasks } from "@/utils/api";

export default async function page() {
  const data: Task[] = await fetchTasks();

  return <Tasks tasks={data} />;
}
