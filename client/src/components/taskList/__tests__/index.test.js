import React from "react";
import { renderWithContextRouter } from "./../../../testUtils/testUtils";
import TaskList from "..";
import { cleanup } from "@testing-library/react";

afterEach(cleanup);
jest.mock("./../../../async-helpers/tasks.js");
describe("<TaskList />", () => {
  test("it renders", () => {
    const tasks = [
      {
        title: "task",
        description: "task",
        completed: true,
        _id: "test"
      }
    ];
    renderWithContextRouter(<TaskList tasks={tasks} />, {
      route: "/dashboard"
    });
  });
});
