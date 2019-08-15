import React, { useEffect, useReducer } from "react";
import { Redirect } from "react-router-dom";

import TaskList from "../taskList";
import Pagination from "../pagination";
import useGetNumTasks from "../../hooks/useGetNumTasks";

import { useTaskState, useTaskDispatch } from "../../context/task-context";
import FilterBar from "../filterBar";
import { fetchAllTasks } from "../../async-helpers/tasks";
import reducer from "./../../reducers/stateReducer";
// if page > Math.ceil redirect to page - 1

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
  const sort = params.get("sort") || undefined;

  const [{ completedQueryStr, completedSortStr }, setState] = useReducer(
    reducer,
    {
      completedQueryStr: "",
      completedSortStr: ""
    }
  );

  const numTasks = useGetNumTasks(completed);

  useEffect(() => {
    fetchAllTasks(taskDispatch, perPage, page, completed, sort);
  }, [page, perPage, taskDispatch, completed, sort]);

  useEffect(() => {
    if (completed) {
      setState({ completedQueryStr: `&completed=${completed}` });
    }
    if (sort) {
      setState({
        completedSortStr: `&sort=${sort}`
      });
    }
  }, [completed, sort]);
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
        numTasks={numTasks}
      />
      <TaskList tasks={tasks} />
      <Pagination
        page={page}
        perPage={perPage}
        completed={completed}
        completedQueryStr={completedQueryStr}
        completedSortStr={completedSortStr}
        numTasks={numTasks}
      />
    </section>
  );
}
