import React, {
  useContext,
  useReducer,
  createContext,
  useRef,
  useEffect
} from "react";
import { UPDATE_USER, CLEAR_USER, LOGIN_SUCCESS } from "../context/types";
const UserStateContext = createContext();
const UserDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return { ...state, user: action.user };
    case LOGIN_SUCCESS:
      return { user: action.user };
    case CLEAR_USER:
      return {
        user: null
      };
    default:
      return state;
  }
};

function UserProvider({ value, children }) {
  const [state, dispatch] = useReducer(reducer, {
    user: value
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  const context = useContext(UserStateContext);
  if (!context) {
    throw new Error("UserState provider must use UserStateContext");
  }
  return context;
}

function useUserDispatch() {
  const dispatch = useContext(UserDispatchContext);
  if (!dispatch) {
    throw new Error("UserDispatch provider must use UserDispatchContext");
  }
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      return (mountedRef.current = false);
    };
  }, []);

  const safeDispatch = (...args) => {
    return mountedRef.current && dispatch(...args);
  };

  return safeDispatch;
}

export { UserProvider, useUserState, useUserDispatch };
