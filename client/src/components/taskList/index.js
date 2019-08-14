import React from "react";

import TaskListItem from "../taskListItem";

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
