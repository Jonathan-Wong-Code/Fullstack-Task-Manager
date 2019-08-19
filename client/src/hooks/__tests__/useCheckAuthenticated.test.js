import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import axios from "axios";
import useCheckAuthenticated from "./../useCheckAuthenticated";
import { AuthProvider } from "./../../context/auth-context";
import { cleanup } from "@testing-library/react";

afterEach(cleanup);

jest.mock("axios");
test("it should successfully return a user from the API", async () => {
  const response = {
    data: {
      user: {
        name: "jon",
        email: "jon@jon.com"
      }
    }
  };

  const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
  axios.mockImplementation(() => Promise.resolve(response));
  const { result, waitForNextUpdate } = renderHook(
    () => useCheckAuthenticated(),
    { wrapper }
  );

  await waitForNextUpdate();
  expect(result.current).toEqual({
    user: { name: "jon", email: "jon@jon.com" },
    loading: false
  });
});

test("it should return an error if token is invalid", async () => {
  const error = new Error();
  axios.mockImplementation(() => Promise.reject(error));

  const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
  const { result, waitForNextUpdate } = renderHook(
    () => useCheckAuthenticated(),
    { wrapper }
  );

  await waitForNextUpdate();
  expect(result.current).toEqual({
    user: null,
    loading: false
  });
});
