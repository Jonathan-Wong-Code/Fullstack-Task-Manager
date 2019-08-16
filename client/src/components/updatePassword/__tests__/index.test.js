import React from "react";
import UpdatePassword from "..";
// import { updatePassword } from "./../../../async-helpers/auth";
import { render, fireEvent, wait } from "@testing-library/react";
import axios from "axios";
jest.mock("./../../../async-helpers/auth");

const updatePassword = jest.fn();

describe("<updatePassword />", () => {
  test("it should render", () => {
    render(<UpdatePassword updatePassword={updatePassword} />);
  });
});
