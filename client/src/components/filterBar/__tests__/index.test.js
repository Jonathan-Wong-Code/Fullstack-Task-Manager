import React from "react";
import { cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import { renderContext } from "../../../testUtils/testUtils";
import FilterBar from "..";
// const history = createMemoryHistory();
afterEach(cleanup);

describe("<FilterBar>", () => {
  const page = 1;
  const perPage = 5;
  const sort = "-createdAt";
  const completed = "true";
  const completedStr = "&completed=true";
  const sortStr = "&sort=completed";
  const searchStr = "&query=task";

  let props;
  let history;
  beforeEach(() => {
    history = { push: jest.fn() };
    props = {
      page,
      perPage,
      sort,
      completed,
      completedStr,
      sortStr,
      searchStr,
      history
    };
  });

  test("It has a sets a search query when the form is submitted", () => {
    const { getByLabelText, getByTestId } = renderContext(
      <FilterBar {...props} history={history} />,
      { route: "/dashboard" }
    );
    const search = getByLabelText(/search by title/i);
    fireEvent.change(search, { target: { value: "task-test" } });
    expect(search).toHaveValue("task-test");
    fireEvent.submit(getByTestId("filter-bar-form"));
    expect(history.push).toHaveBeenCalledTimes(1);
    expect(history.push).toHaveBeenCalledWith(
      `/dashboard?page=1&perPage=5&completed=true&sort=completed&query=task-test`
    );
  });

  test("It has a sets the perPage attribute when a value is selected", () => {
    const { getByLabelText, getByTestId } = renderContext(
      <FilterBar {...props} history={history} />,
      { route: "/dashboard" }
    );
    const perPage = getByLabelText(/number of results/i);
    fireEvent.change(perPage, { target: { value: 10 } });

    expect(history.push).toHaveBeenCalledTimes(1);
    expect(history.push).toHaveBeenCalledWith(
      `/dashboard?page=1&perPage=10&completed=true&sort=completed&query=task`
    );
  });

  test("It has a sets the completed query string when a value is selected", () => {
    const { getByLabelText } = renderContext(
      <FilterBar {...props} history={history} />,
      { route: "/dashboard" }
    );
    const completed = getByLabelText(/show tasks/i);
    fireEvent.change(completed, { target: { value: "false" } });

    expect(history.push).toHaveBeenCalledTimes(1);
    expect(history.push).toHaveBeenCalledWith(
      `/dashboard?page=1&perPage=5&completed=false&sort=completed&query=task`
    );
  });

  test("It has a sets the completed query string when a value is selected", () => {
    const { getByLabelText } = renderContext(
      <FilterBar {...props} history={history} />,
      { route: "/dashboard" }
    );
    const sort = getByLabelText(/sort by/i);
    fireEvent.change(sort, { target: { value: "-completed" } });

    expect(history.push).toHaveBeenCalledTimes(1);
    expect(history.push).toHaveBeenCalledWith(
      `/dashboard?page=1&perPage=5&completed=true&sort=-completed&query=task`
    );
  });
});
