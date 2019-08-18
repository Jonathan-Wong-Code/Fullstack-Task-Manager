import { useState, useRef, useEffect } from "react";

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

  return [state, safeSetState];
}

export default useSafeSetState;
