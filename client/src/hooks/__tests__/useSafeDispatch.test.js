import { renderHook } from "@testing-library/react-hooks";
import useSafeDispatch from "./../useSafeDispatch";
jest.mock("./../useSafeDispatch");

const safeSetState = jest.fn();

useSafeDispatch.mockImplementation(() => [
  { state: "test state" },
  safeSetState
]);

test("should return the state and setSafeSet", () => {
  const { result } = renderHook(() => useSafeDispatch());
  expect(result.current).toEqual([{ state: "test state" }, safeSetState]);
});
