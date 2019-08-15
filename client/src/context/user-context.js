import React, { useContext, useReducer, createContext } from "react";

const UserStateContext = createContext();
const UserDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

function UserProvider({ initialUser, children }) {
  const [state, dispatch] = useReducer(reducer, {
    user: initialUser
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
  const context = useContext(UserDispatchContext);
  if (!context) {
    throw new Error("UserDispatch provider must use UserDispatchContext");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch };
