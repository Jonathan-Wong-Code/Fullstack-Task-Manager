import React from "react";

import TaskListItem from "../taskListItem";

function TaskList({ tasks }) {
  console.log("task");
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

export default TaskList;
