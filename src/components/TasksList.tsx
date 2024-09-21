import { Task } from "@/constants/types";
import TaskItem from "./TaskItem";

function TasksList({ tasks }: { tasks: Task[] }) {
  return (
    <ul className="h-full">
      {tasks && tasks.length > 0 ? (
        tasks.map((task: Task, index: number) => (
          <li key={index}>
            <TaskItem task={task} />
          </li>
        ))
      ) : (
        <div className="h-screen flex justify-center">
          <p>No items</p>
        </div>
      )}
    </ul>
  );
}

export default TasksList;
