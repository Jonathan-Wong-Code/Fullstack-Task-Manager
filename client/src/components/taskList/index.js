import React from "react";

import TaskListItem from "../taskListItem";

export default function TaskList({ tasks }) {
  console.log(tasks);

  if (!tasks) return <div />;
  return (
    <div>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <TaskListItem task={task} />
          </li>
        ))}
      </ul>
    </div>
  );
}
