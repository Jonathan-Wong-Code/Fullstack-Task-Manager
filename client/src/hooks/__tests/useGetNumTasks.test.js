import useGetNumTasks from "../useGetNumTasks";
import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";

jest.mock("axios");

const mockNumTasks = {
  data: {
    data: {
      complete: 1,
      incomplete: 2
    }
  }
};

test("Should return the number of complete and incomplete tasks", async () => {
  axios.get.mockImplementation(() => Promise.resolve(mockNumTasks));

  const { result, waitForNextUpdate } = renderHook(() => useGetNumTasks());
  await waitForNextUpdate();
  expect(result.current).toEqual(3);
});

test("Should return the number of completed", async () => {
  axios.get.mockImplementation(() => Promise.resolve(mockNumTasks));

  const { result, waitForNextUpdate } = renderHook(() =>
    useGetNumTasks("true")
  );
  await waitForNextUpdate();
  expect(result.current).toEqual(1);
});

test("Should return the number of incompleted=", async () => {
  axios.get.mockImplementation(() => Promise.resolve(mockNumTasks));

  const { result, waitForNextUpdate } = renderHook(() =>
    useGetNumTasks("false")
  );
  await waitForNextUpdate();
  expect(result.current).toEqual(2);
});
