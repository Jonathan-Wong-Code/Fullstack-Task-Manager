import { LOGIN_SUCCESS, LOGOUT, SIGNUP_SUCCESS } from "./../context/types";

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        user: action.user
      };
    case LOGOUT:
      return {
        user: action.user
      };

    default:
      return state;
  }
};

export default reducer;
