import React from "react";

import TaskListItem from "./TaskListItem";

export default function TaskList({ tasks }) {
  console.log(tasks);

  if (!tasks) return <div />;
  return (
    <div>
      {tasks.map(task => (
        <TaskListItem task={task} key={task._id} />
      ))}
    </div>
  );
}
