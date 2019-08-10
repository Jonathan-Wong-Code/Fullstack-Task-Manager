import React from "react";
import TaskForm from "./TaskForm";
import { useTaskState } from "./../context/task-context";

export default function EditTask({ match }) {
  const { tasks } = useTaskState();
  const editedTask = tasks.find(task => task._id === match.params.id);
  return (
    <div>
      <h2>Edit Task</h2>
      <TaskForm type="edit" editedTask={editedTask} />
    </div>
  );
}
