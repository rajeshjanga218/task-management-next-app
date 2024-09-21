import { TaskDetails } from "@/components/TaskDetails";
import { Task } from "@/constants/types";
import { fetchTask } from "@/utils/api";

export default async function TaskDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const id: number = parseInt(params.slug);
  const task: Task = await fetchTask(id);
  return <TaskDetails task={task} />;
}
