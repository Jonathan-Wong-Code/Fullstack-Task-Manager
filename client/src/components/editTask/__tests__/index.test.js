import React from "react";
import EditTask from "..";
import { renderWithContextRouter } from "./../../../testUtils/testUtils";

describe("<CreateTask />", () => {
  const match = { params: { id: "test123" } };
  test("it renders", () => {
    renderWithContextRouter(<EditTask match={match} />, { route: "/create" });
  });
});
