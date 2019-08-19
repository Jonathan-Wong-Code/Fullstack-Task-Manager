import React, { useState } from "react";

function FilterBar({
  perPage,
  page,
  history,
  completed,
  completedQueryStr,
  sort,
  completedSortStr,
  completedSearchStr
}) {
  const [search, setSearch] = useState("");

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
    return "";
  };

  const setSearchQuery = search => {
    if (search) {
      return `&query=${search}`;
    }
    return "";
  };

  const handleFilterChange = e => {
    history.push(
      `/dashboard?page=1&perPage=${perPage}${setCompletedQuery(
        e.target.value
      )}${completedSortStr}${completedSearchStr}`
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    history.push(
      `/dashboard?page=1&perPage=${perPage}${completedQueryStr}${completedSortStr}${setSearchQuery(
        search
      )}`
    );
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="search"> Search by title</label>
      <input
        type="text"
        id="search"
        name="search"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <label htmlFor="perPage">Number of results</label>
      <select
        name="perPage"
        id="perPage"
        value={perPage}
        onChange={e => {
          history.push(
            `/dashboard?page=${page}&perPage=${
              e.target.value
            }${completedQueryStr}${completedSortStr}${completedSearchStr}`
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
        value={completed}
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
        value={sort}
        onChange={e => {
          history.push(
            `/dashboard?page=${page}&perPage=${perPage}${completedQueryStr}${setSortQuery(
              e.target.value
            )}${completedSearchStr}`
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
