import React, { useEffect } from "react";
import { useTaskDispatch } from "./../context/task-context";

import { fetchAllTasks } from "./../async-helpers/tasks";
import TaskListItem from "./TaskListItem";

export default function TaskList({ page, perPage, tasks }) {
  const taskDispatch = useTaskDispatch();
  console.log(tasks);
  useEffect(() => {
    fetchAllTasks(taskDispatch, perPage, page);
  }, [taskDispatch, page, perPage]);

  if (!tasks) return <div />;
  return (
    <div>
      {tasks.map(task => (
        <TaskListItem task={task} key={task._id} />
      ))}
    </div>
  );
}
