import { LOGIN_SUCCESS, LOGOUT, SIGNUP_SUCCESS } from "./../context/types";

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.user
      };
    case LOGOUT:
      return {
        ...state,
        user: action.user
      };

    default:
      return state;
  }
};

export default reducer;
