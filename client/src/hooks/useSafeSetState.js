import { useState, useRef, useEffect, useMemo } from "react";

function useSafeSetState(initialState) {
  const [state, setState] = useState(initialState);

  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const safeSetState = (...args) => {
    return mountedRef.current && setState(...args);
  };
  const value = useMemo(() => [state, safeSetState], [state]);
  return value;
}

export default useSafeSetState;
