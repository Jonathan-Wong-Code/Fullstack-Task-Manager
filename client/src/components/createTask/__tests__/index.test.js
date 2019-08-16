import React from "react";
import CreateTask from "..";
import { renderWithContextRouter } from "./../../../testUtils/testUtils";

describe("<CreateTask />", () => {
  test("it renders", () => {
    renderWithContextRouter(<CreateTask />, { route: "/create" });
  });
});
