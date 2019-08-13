import React, { useEffect, useReducer } from "react";
import TaskList from "./TaskList";
import Pagination from "./Pagination";
import { useTaskState, useTaskDispatch } from "./../context/task-context";
import FilterBar from "./FilterBar";
import { fetchAllTasks } from "./../async-helpers/tasks";
import useGetNumTasks from "./../hooks/useGetNumTasks";

export default function Dashboard({ history }) {
  const { search } = history.location;
  const { tasks } = useTaskState();
  const taskDispatch = useTaskDispatch();
  const query = search
    ? search.replace("?", "").split("&")
    : ["page=1", "perPage=5"];
  const page = query[0].split("=")[1];
  const perPage = query[1].split("=")[1];
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
