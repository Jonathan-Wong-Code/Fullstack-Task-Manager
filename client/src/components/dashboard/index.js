import React, { useEffect, useReducer, useRef } from "react";
import TaskList from "../taskList";
import Pagination from "../pagination";
import FilterBar from "../filterBar";

import useGetNumTasks from "../../hooks/useGetNumTasks";
import { useTaskState, useTaskDispatch } from "../../context/task-context";
import { fetchAllTasks } from "../../async-helpers/tasks";
import reducer from "./../../reducers/stateReducer";
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

  // const [
  //   { completedQueryStr, completedSortStr, completedSearchStr, loading, error },
  //   setState
  // ] = useReducer(reducer, {
  //   completedQueryStr: "",
  //   completedSortStr: "",
  //   completedSearchStr: "",
  //   loading: false,
  //   error: ""
  // });

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
  }, [page, perPage, completed, sort, query]);

  useEffect(() => {
    if (completed) {
      setSafeState({ completedQueryStr: `&completed=${completed}` });
    }
    if (sort) {
      setSafeState({
        completedSortStr: `&sort=${sort}`
      });
    }
    if (query) {
      setSafeState({ completedSearchStr: `&title=${query}` });
    }
  }, [completed, sort, query]);

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
        query={query}
      />
      {error && <p>{error}</p>}
      <TaskList tasks={tasks} />
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
