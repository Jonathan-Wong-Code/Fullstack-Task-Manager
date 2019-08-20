import React from "react";

import TaskListItem from "../taskListItem";

function TaskList({ tasks }) {
  if (!tasks) return <div />;
  return (
    <div>
      <ul>
        {tasks.map((task, index) => (
          <li key={task._id} data-testid={`task-item-${index}`}>
            <TaskListItem task={task} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
