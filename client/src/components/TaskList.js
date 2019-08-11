import React, { useEffect } from "react";
import { useTaskState, useTaskDispatch } from "./../context/task-context";

import { fetchAllTasks } from "./../async-helpers/tasks";
import TaskListItem from "./TaskListItem";

export default function TaskList() {
  const { tasks } = useTaskState();
  const taskDispatch = useTaskDispatch();
  console.log(tasks);
  useEffect(() => {
    fetchAllTasks(taskDispatch);
  }, [taskDispatch]);
  if (!tasks) return <div />;
  return (
    <div>
      {tasks.map(task => (
        <TaskListItem task={task} key={task._id} />
      ))}
    </div>
  );
}
