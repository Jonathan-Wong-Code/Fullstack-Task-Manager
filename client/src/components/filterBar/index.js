import React, { useEffect, useReducer } from "react";
import reducer from "../../reducers/stateReducer";

function FilterBar({
  perPage,
  page,
  history,
  completed,
  completedQueryStr,
  sort,
  completedSortStr,
  numTasks
}) {
  const [{ completedValue, sortBy }, setState] = useReducer(reducer, {
    completedValue: "",
    sortBy: "-createdAt"
  });

  useEffect(() => {
    if (completed) {
      setState({ completedValue: completed });
    }
    if (sort) {
      setState({ sortBy: sort });
    }
  }, [completed, sort]);

  const setCompletedQuery = completed => {
    if (completed) {
      return `&completed=${completed}`;
    }
    return "";
  };

  const setSortQuery = sort => {
    if (sort) {
      return `&sort=${sort}`;
    }
  };

  const handleFilterChange = e => {
    console.log(page >= Math.ceil(numTasks / perPage));
    if (page >= Math.ceil(numTasks / perPage)) {
      return history.push(
        `/dashboard?page=${1}&perPage=${perPage}${setCompletedQuery(
          e.target.value
        )}${completedSortStr}`
      );
    }
    return history.push(
      `/dashboard?page=${page}&perPage=${perPage}${setCompletedQuery(
        e.target.value
      )}${completedSortStr}`
    );
  };

  return (
    <form action="">
      <label htmlFor="perPage">Number of results</label>
      <select
        name="perPage"
        id="perPage"
        value={perPage}
        onChange={e => {
          history.push(
            `/dashboard?page=${page}&perPage=${
              e.target.value
            }${completedQueryStr}${completedSortStr}`
          );
        }}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </select>
      <label htmlFor="showCompleted">Show tasks:</label>
      <select
        name="showCompleted"
        id="showCompleted"
        value={completedValue}
        onChange={handleFilterChange}
      >
        <option value="">All</option>
        <option value="false">incomplete</option>
        <option value="true">completed</option>
      </select>

      <label htmlFor="sortBy">Sort By:</label>
      <select
        name="sortBy"
        id="sortBy"
        value={sortBy}
        onChange={e => {
          history.push(
            `/dashboard?page=${page}&perPage=${perPage}${completedQueryStr}${setSortQuery(
              e.target.value
            )}`
          );
        }}
      >
        <option value="-createdAt">newest</option>
        <option value="-completed">completed</option>
        <option value="completed">incomplete</option>
      </select>
    </form>
  );
}

export default FilterBar;
