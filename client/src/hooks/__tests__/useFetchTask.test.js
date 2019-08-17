import React from "react";
import useFetchTask from "../useFetchTask";
import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";
import { wait } from "@testing-library/react";
import { TaskProvider } from "../../context/task-context";
jest.mock("axios");
const mockData = {
  data: {
    data: {
      task: {
        completed: true,
        title: "task 1",
        description: "task 1"
      }
    }
  }
};

const existingTask = {
  completed: false,
  title: "Already there!",
  description: "From react state",
  _id: "test123"
};

test("Should return a task", async () => {
  const wrapper = ({ children }) => <TaskProvider>{children}</TaskProvider>;

  axios.get.mockImplementation(() => Promise.resolve(mockData));

  const { result, waitForNextUpdate } = renderHook(() => useFetchTask(), {
    wrapper
  });

  await waitForNextUpdate();

  expect(result.current).toEqual({
    fetchedTask: mockData.data.data.task,
    error: "",
    loading: false
  });
});

test("Should return a task already in state", async () => {
  const wrapper = ({ children }) => (
    <TaskProvider value={[existingTask]}>{children}</TaskProvider>
  );
  const { result } = renderHook(() => useFetchTask("test123"), {
    wrapper
  });

  expect(result.current).toEqual({
    fetchedTask: existingTask,
    error: "",
    loading: false
  });
});

test("Should return an error if API response is erroneous", async () => {
  const wrapper = ({ children }) => <TaskProvider>{children}</TaskProvider>;
  const error = new Error();
  error.response = {
    data: {
      message: "fetching error"
    }
  };
  axios.get.mockImplementation(() => Promise.reject(error));

  const { result, waitForNextUpdate } = renderHook(() => useFetchTask(), {
    wrapper
  });

  await waitForNextUpdate();

  expect(result.current).toEqual({
    fetchedTask: null,
    error: "fetching error",
    loading: false
  });
});
