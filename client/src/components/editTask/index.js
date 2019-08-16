import React from "react";
import TaskForm from "../taskForm";
import useFetchTask from "./../../hooks/useFetchTask";

export default function EditTask({ match }) {
  const task = useFetchTask(match.params.id);
  if (!task) return <div />;
  return (
    <div>
      <h2>Edit Task</h2>
      <TaskForm type="edit" editedTask={task} />
    </div>
  );
}
