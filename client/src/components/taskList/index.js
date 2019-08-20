import React from "react";

import TaskListItem from "../taskListItem";
import { TaskGrid } from "./css";

function TaskList({ tasks }) {
  if (!tasks) return <div />;
  return (
    <TaskGrid>
      {tasks.map((task, index) => (
        <TaskListItem task={task} index={index} key={task._id} />
      ))}
    </TaskGrid>
  );
}

export default TaskList;
