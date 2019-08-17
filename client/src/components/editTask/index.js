import React from "react";
import TaskForm from "../taskForm";
import useFetchTask from "./../../hooks/useFetchTask";

export default function EditTask({ match }) {
  const { fetchedTask, loading, error } = useFetchTask(match.params.id);
  if (loading || !fetchedTask) return <div> Loading Edit </div>;
  return (
    <div>
      <h2>Edit Task</h2>
      <TaskForm type="edit" editedTask={fetchedTask} fetchError={error} />
    </div>
  );
}
