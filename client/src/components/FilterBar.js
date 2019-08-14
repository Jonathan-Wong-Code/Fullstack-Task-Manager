import React, { useState, useEffect } from "react";

function FilterBar({
  perPage,
  page,
  history,
  completed,
  completedQueryStr,
  sort
}) {
  const [completedValue, setCompletedValue] = useState("All");
  const [sortBy, setSortBy] = useState("new");

  useEffect(() => {
    if (completed) {
      // setCompletedValue(setCompletedString(completed));
      setCompletedValue(completed);
    }
    if (sort) {
      setSortBy(sort);
    }
  }, [completed, sort]);

  const setCompletedBoolean = completed => {
    switch (completed) {
      case "completed":
        return "true";
      case "incomplete":
        return "false";
      default:
        return "";
    }
  };

  const setCompletedString = completed => {
    switch (completed) {
      case "true":
        return "completed";
      case "false":
        return "incomplete";
      default:
        return "All";
    }
  };

  // const setSortString = sortBy => {
  //   switch (completed) {
  //     case "true":
  //       return "completed";
  //     case "false":
  //       return "incomplete";
  //     default:
  //       return "All";
  //   }
  // };

  const setCompletedQuery = completed => {
    if (completed) {
      // return `&completed=${setCompletedBoolean(completed)}`;
      return `&completed=${completed}`;
    }
    return "";
  };

  const setSortQuery = sort => {
    if (sort) {
      return `&sort=${sort}`;
    }
  };
  console.log(sortBy);
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
            }${completedQueryStr}`
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
        onChange={e => {
          history.push(
            `/dashboard?page=${page}&perPage=${perPage}${setCompletedQuery(
              e.target.value
            )}`
          );
        }}
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
