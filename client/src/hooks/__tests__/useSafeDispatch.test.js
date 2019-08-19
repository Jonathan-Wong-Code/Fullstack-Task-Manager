import React, { useEffect } from "react";
import { renderContext } from "./../../testUtils/testUtils";
import useSafeDispatch from "./../useSafeDispatch";
import { wait, cleanup } from "@testing-library/react";
afterEach(cleanup);

function TestComponent() {
  const [{ user, email }, safeSetState] = useSafeDispatch({
    user: "",
    email: ""
  });

  useEffect(() => {
    setTimeout(() => {
      safeSetState({ user: "test-user", email: "test-email" });
    }, 2000);
  }, [safeSetState]);

  return (
    <>
      <p data-testid="user">{user}</p>
      <p data-testid="email">{email}</p>
    </>
  );
}

test("should return state and setSafeState", async () => {
  const { getByTestId } = renderContext(<TestComponent />, { route: "/" });
  await wait(() => {
    expect(getByTestId("user").textContent).toBe("test-user");
    expect(getByTestId("email").textContent).toBe("test-email");
  });
});
