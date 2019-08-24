import { useEffect } from "react";
import axios from "axios";
import useSafeSetState from "./useSafeSetState";

function useGetNumTasks(completed, query) {
  const [state, safeSetState] = useSafeSetState();

  useEffect(() => {
    const fetchNumTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/tasks/numTasks?query=${query}`,
          {
            withCredentials: true
          }
        );
        const { complete, incomplete } = response.data.data;
        switch (completed) {
          case "true":
            safeSetState(complete);
            break;
          case "false":
            safeSetState(incomplete);
            break;
          default:
            safeSetState(complete + incomplete);
        }
      } catch (error) {
        return error.response.data.message;
      }
    };
    fetchNumTasks();
  }, [completed, safeSetState, query]);

  return state;
}

export default useGetNumTasks;
