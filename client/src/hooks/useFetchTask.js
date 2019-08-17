import { useEffect, useReducer } from "react";
import { useTaskState } from "./../context/task-context";
import axios from "axios";
import reducer from "./../reducers/stateReducer";
// Fetches task on page load
function useFetchTask(id) {
  const [{ fetchedTask, error, loading }, setState] = useReducer(reducer, {
    fetchedTask: null,
    loading: false,
    error: ""
  });

  const { tasks } = useTaskState();

  useEffect(() => {
    const task = tasks.find(task => task._id === id);
    const getTask = async () => {
      setState({ loading: true });

      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/tasks/${id}`,
          {
            withCredentials: true
          }
        );
        setState({ fetchedTask: response.data.data.task });
      } catch (error) {
        setState({ error: error.response.data.message });
      } finally {
        setState({ loading: false });
      }
    };

    if (task) {
      setState({ fetchedTask: task });
    } else {
      getTask();
    }
  }, [tasks, id]);

  return { fetchedTask, error, loading };
}

export default useFetchTask;
