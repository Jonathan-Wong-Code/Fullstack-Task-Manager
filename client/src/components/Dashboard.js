import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";
import Pagination from "./Pagination";
import { useTaskState, useTaskDispatch } from "./../context/task-context";
import FilterBar from "./FilterBar";
import { fetchAllTasks } from "./../async-helpers/tasks";
import useGetNumTasks from "./../hooks/useGetNumTasks";

export default function Dashboard({
  history,
  history: {
    location: { search }
  }
}) {
  const { tasks } = useTaskState();
  const taskDispatch = useTaskDispatch();

  const params = new URLSearchParams(search);
  const page = params.get("page") || 1;
  const perPage = params.get("perPage") || 5;
  const completed = params.get("completed") || undefined;
  const numTasks = useGetNumTasks();

  const [completedQueryStr, setCompletedQueryStr] = useState("");

  useEffect(() => {
    fetchAllTasks(taskDispatch, perPage, page, completed);
  }, [page, perPage, taskDispatch, completed]);

  useEffect(() => {
    if (completed) {
      setCompletedQueryStr(`&completed=${completed}`);
    }
  }, [completed]);

  console.log(completedQueryStr);
  return (
    <section>
      <h2>Task List!</h2>
      <FilterBar
        search={search}
        perPage={perPage}
        page={page}
        history={history}
        completed={completed}
        completedQueryStr={completedQueryStr}
      />
      <TaskList tasks={tasks} />
      <Pagination
        page={page}
        perPage={perPage}
        numTasks={numTasks}
        completedQueryStr={completedQueryStr}
      />
    </section>
  );
}
