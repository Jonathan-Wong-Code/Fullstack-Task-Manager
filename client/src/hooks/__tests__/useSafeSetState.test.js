import "../useSafeSetState";
import { renderHook } from "@testing-library/react-hooks";
import useSafeSetState from "./../useSafeSetState";

jest.mock("./../useSafeSetState.js");
const setState = jest.fn();

useSafeSetState.mockImplementation(() => [{ state: "test state" }, setState]);

test("Should return state and safeSetState", () => {
  const { result } = renderHook(() => useSafeSetState());
  expect(result.current).toEqual([{ state: "test state" }, setState]);
});
