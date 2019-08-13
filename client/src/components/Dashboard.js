import React, { useReducer, useEffect } from "react";
import TaskList from "./TaskList";
import Pagination from "./Pagination";
import { useTaskState } from "./../context/task-context";

const reducer = (state, newState) => {
  return { ...state, ...newState };
};

export default function Dashboard({
  history: {
    location: { search }
  }
}) {
  const query = search.replace("?", "").split("&");
  const page = query[0].split("=")[1];
  const perPage = query[1].split("=")[1];
  const { tasks } = useTaskState();

  return (
    <section>
      <h2>Task List!</h2>
      <TaskList page={page} perPage={perPage} tasks={tasks} />
      <Pagination page={page} tasks={tasks} perPage={perPage} />
    </section>
  );
}
