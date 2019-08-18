import { useEffect } from "react";
import axios from "axios";
import useSafeSetState from "./useSafeSetState";
function useGetNumTasks(completed) {
  const [state, safeSetState] = useSafeSetState();
  // const [numTasks, setNumTasks] = useState();

  useEffect(() => {
    const fetchNumTasks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/tasks/numTasks",
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
        console.log(error.response.data.message);
      }
    };
    fetchNumTasks();
  }, [completed]);

  return state;
}

export default useGetNumTasks;
