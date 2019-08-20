import React, { useEffect, useMemo } from "react";
import TaskList from "../taskList";
import Pagination from "../pagination";
import FilterBar from "../filterBar";

import useGetNumTasks from "../../hooks/useGetNumTasks";
import { useTaskState, useTaskDispatch } from "../../context/task-context";
import { fetchAllTasks } from "../../async-helpers/tasks";
import useSafeDispatch from "./../../hooks/useSafeDispatch";

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
  const sort = params.get("sort") || "-createdAt";
  const query = params.get("query") || "";

  const [
    { completedQueryStr, completedSortStr, completedSearchStr, loading, error },
    setSafeState
  ] = useSafeDispatch({
    completedQueryStr: "",
    completedSortStr: "",
    completedSearchStr: "",
    loading: false,
    error: ""
  });

  const numTasks = useGetNumTasks(completed);

  useEffect(() => {
    fetchAllTasks(
      taskDispatch,
      perPage,
      page,
      completed,
      sort,
      query,
      setSafeState
    );
  }, [page, perPage, completed, sort, query, taskDispatch, setSafeState]);

  useEffect(() => {
    if (completed) {
      setSafeState({ completedQueryStr: `&completed=${completed}` });
    }
  }, [completed, setSafeState]);

  useEffect(() => {
    if (sort) {
      setSafeState({
        completedSortStr: `&sort=${sort}`
      });
    }
  }, [sort, setSafeState]);

  useEffect(() => {
    if (query) {
      setSafeState({ completedSearchStr: `&query=${query}` });
    }
  }, [query, setSafeState]);
  const MemoTaskList = useMemo(() => {
    return <TaskList tasks={tasks} />;
  }, [tasks]);

  if (loading) return <div>Loading...</div>;

  return (
    <section>
      <h2>Task List!</h2>
      <FilterBar
        search={search}
        perPage={perPage}
        page={page}
        history={history}
        completed={completed}
        sort={sort}
        completedQueryStr={completedQueryStr}
        completedSortStr={completedSortStr}
        completedSearchStr={completedSearchStr}
        query={query}
      />
      {MemoTaskList}
      {error && <p data-testid="dashboard-error">{error}</p>}

      <Pagination
        page={page}
        perPage={perPage}
        completed={completed}
        completedQueryStr={completedQueryStr}
        completedSortStr={completedSortStr}
        completedSearchStr={completedSearchStr}
        numTasks={numTasks}
      />
    </section>
  );
}
