import React from "react";
import TaskForm from "../taskForm";
export default function CreateTask() {
  return (
    <section>
      <h2>CreateTask</h2>
      <TaskForm type="create" />
    </section>
  );
}
