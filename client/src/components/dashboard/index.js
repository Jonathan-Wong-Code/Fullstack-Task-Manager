import React, { useEffect, useMemo } from "react";
import TaskList from "../taskList";
import Pagination from "../pagination";
import FilterBar from "../filterBar";

import useGetNumTasks from "../../hooks/useGetNumTasks";
import { useTaskState, useTaskDispatch } from "../../context/task-context";
import { fetchAllTasks } from "../../async-helpers/tasks";
import useSafeDispatch from "./../../hooks/useSafeDispatch";

import { DashboardSection, Wrapper } from "./css";

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
    { completedStr, sortStr, searchStr, loading, error },
    setSafeState
  ] = useSafeDispatch({
    completedStr: "",
    sortStr: "",
    searchStr: "",
    loading: true,
    error: ""
  });

  const numTasks = useGetNumTasks(completed, query);

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
      setSafeState({ completedStr: `&completed=${completed}` });
    }
  }, [completed, setSafeState]);

  useEffect(() => {
    if (sort) {
      setSafeState({
        sortStr: `&sort=${sort}`
      });
    }
  }, [sort, setSafeState]);

  useEffect(() => {
    if (query) {
      setSafeState({ searchStr: `&query=${query}` });
    }
  }, [query, setSafeState]);
  const MemoTaskList = useMemo(() => {
    return <TaskList tasks={tasks} />;
  }, [tasks]);
  if (loading) return <div>Loading...</div>;

  return (
    <DashboardSection>
      <Wrapper>
        <FilterBar
          search={search}
          perPage={perPage}
          page={page}
          history={history}
          completed={completed}
          sort={sort}
          completedStr={completedStr}
          sortStr={sortStr}
          searchStr={searchStr}
          query={query}
        />
        {MemoTaskList}
        {error && <p data-testid="dashboard-error">{error}</p>}

        <Pagination
          page={page}
          perPage={perPage}
          completed={completed}
          completedStr={completedStr}
          sortStr={sortStr}
          searchStr={searchStr}
          numTasks={numTasks}
        />
      </Wrapper>
    </DashboardSection>
  );
}
