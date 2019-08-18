import { useReducer, useEffect, useRef, useMemo } from "react";
import reducer from "./../reducers/stateReducer";

function useSafeDispatch(initialState) {
  const [state, setState] = useReducer(reducer, initialState);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const setSafeState = (...args) => {
    return mountedRef.current && setState(...args);
  };
  const value = useMemo(() => [state, setSafeState], [state]);
  return value;
}

export default useSafeDispatch;
