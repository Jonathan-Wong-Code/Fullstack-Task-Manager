import React from "react";
import { cleanup, wait, fireEvent } from "@testing-library/react";

import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";

import { renderContext } from "../../../testUtils/testUtils";
import FilterBar from "..";
const history = createBrowserHistory();

describe("<FilterBar>", () => {
  beforeEach(() => {
    history.push = jest.fn();
  });

  test("", () => {});
});
