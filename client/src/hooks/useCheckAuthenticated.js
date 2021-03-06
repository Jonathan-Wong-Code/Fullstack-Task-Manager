import { useEffect } from "react";
import useSafeDispatch from "./useSafeDispatch";
import { useAuthDispatch } from "./../context/auth-context";
import { LOGIN_SUCCESS, LOGOUT } from "./../context/types";
import axios from "axios";

function useCheckAuthenticated() {
  const [{ loading, user }, setSafeState] = useSafeDispatch({
    loading: true,
    user: null
  });
  const authDispatch = useAuthDispatch();

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: "http://localhost:3000/api/v1/users/checkLoggedIn",
          withCredentials: true
        });

        setSafeState({ user: response.data.user });
        authDispatch({ type: LOGIN_SUCCESS, user: true });
      } catch (error) {
        authDispatch({ type: LOGOUT, user: false });
      } finally {
        setSafeState({ loading: false });
      }
    };
    checkLoggedIn();
  }, [authDispatch, setSafeState]);

  return { user, loading };
}

export default useCheckAuthenticated;
