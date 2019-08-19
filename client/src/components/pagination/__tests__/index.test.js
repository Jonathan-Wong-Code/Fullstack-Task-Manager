import { renderRouter } from "./../../../testUtils/testUtils";
import React from "react";
import Pagination from "..";

describe("<Pagination />", () => {
  test("it renders", () => {
    renderRouter(<Pagination />, { route: "/dashboard" });
  });
});
