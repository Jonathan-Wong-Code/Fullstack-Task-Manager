import React, { useEffect, useMemo } from "react";
import TaskList from "./TaskList";
import Pagination from "./Pagination";
import { useTaskState, useTaskDispatch } from "./../context/task-context";
import FilterBar from "./FilterBar";
import { fetchAllTasks } from "./../async-helpers/tasks";
import useGetNumTasks from "./../hooks/useGetNumTasks";

export default function Dashboard({ history, history: { location: search } }) {
  const { tasks } = useTaskState();
  const taskDispatch = useTaskDispatch();

  const params = new URLSearchParams(search);
  const page = params.get("page") || 1;
  const perPage = params.get("perPage") || 5;

  const numTasks = useGetNumTasks();

  useEffect(() => {
    fetchAllTasks(taskDispatch, perPage, page);
  }, [page, perPage, taskDispatch]);

  return (
    <section>
      <h2>Task List!</h2>
      <FilterBar
        search={search}
        perPage={perPage}
        page={page}
        history={history}
      />
      <TaskList tasks={tasks} />
      <Pagination page={page} perPage={perPage} numTasks={numTasks} />
    </section>
  );
}
