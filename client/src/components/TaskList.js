import React from "react";
import { useTaskState } from "./../context/task-context";
import TaskListItem from "./TaskListItem";

export default function TaskList() {
  const { tasks } = useTaskState();
  console.log(tasks);
  if (tasks.length === 0) return <div />;

  return (
    <div>
      {tasks.map(task => (
        <TaskListItem task={task} key={task.id} />
      ))}
    </div>
  );
}
