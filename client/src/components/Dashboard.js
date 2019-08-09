import React from "react";
import TaskList from "./TaskList";

//dispatch getTodos
export default function Dashboard() {
  return (
    <div>
      <h2>Task List!</h2>
      <TaskList />
    </div>
  );
}
