import React, { useState } from "react";
import { Form, Select, Input } from "./css";
function FilterBar({
  perPage,
  page,
  history,
  completed,
  completedStr,
  sort,
  sortStr,
  searchStr
}) {
  const [search, setSearch] = useState("");
  const setCompletedStr = completed => {
    if (completed) {
      return `&completed=${completed}`;
    }
    return "";
  };

  const setSortStr = sort => {
    if (sort) {
      return `&sort=${sort}`;
    }
    return "";
  };

  const setSearchStr = search => {
    if (search) {
      return `&query=${search}`;
    }
    return "";
  };

  const handleFilterChange = e => {
    history.push(
      `/dashboard?page=1&perPage=${perPage}${setCompletedStr(
        e.target.value
      )}${sortStr}${searchStr}`
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    history.push(
      `/dashboard?page=1&perPage=${perPage}${completedStr}${sortStr}${setSearchStr(
        search
      )}`
    );
  };

  return (
    <Form action="" onSubmit={handleSubmit} data-testid="filter-bar-form">
      <label htmlFor="search"> Search by title</label>
      <Input
        type="text"
        id="search"
        name="search"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <label htmlFor="perPage">Number of results</label>
      <Select
        name="perPage"
        id="perPage"
        value={perPage}
        onChange={e => {
          history.push(
            `/dashboard?page=${page}&perPage=${
              e.target.value
            }${completedStr}${sortStr}${searchStr}`
          );
        }}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </Select>
      <label htmlFor="showCompleted">Show tasks</label>
      <Select
        name="showCompleted"
        id="showCompleted"
        value={completed}
        onChange={handleFilterChange}
      >
        <option value="">All</option>
        <option value="false">incomplete</option>
        <option value="true">completed</option>
      </Select>

      <label htmlFor="sortBy">Sort By</label>
      <Select
        name="sortBy"
        id="sortBy"
        value={sort}
        onChange={e => {
          history.push(
            `/dashboard?page=${page}&perPage=${perPage}${completedStr}${setSortStr(
              e.target.value
            )}${searchStr}`
          );
        }}
      >
        <option value="-createdAt">newest</option>
        <option value="-completed">completed</option>
        <option value="completed">incomplete</option>
      </Select>
    </Form>
  );
}

export default FilterBar;
