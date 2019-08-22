import { useEffect } from "react";
import { useTaskState } from "./../context/task-context";
import useSafeDispatch from "./useSafeDispatch";
import axios from "axios";

// Fetches task on page load
function useFetchTask(id) {
  const [{ fetchedTask, error, loading }, setSafeState] = useSafeDispatch({
    fetchedTask: null,
    loading: true,
    error: ""
  });

  const { tasks } = useTaskState();

  useEffect(() => {
    const task = tasks.find(task => task._id === id);
    const getTask = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/tasks/${id}`,
          {
            withCredentials: true
          }
        );
        setSafeState({ fetchedTask: response.data.data.task });
      } catch (error) {
        setSafeState({ error: error.response.data.message });
      } finally {
        setSafeState({ loading: false });
      }
    };

    if (task) {
      setSafeState({ fetchedTask: task, loading: false });
    } else {
      getTask();
    }
  }, [tasks, id, setSafeState]);

  return { fetchedTask, error, loading };
}

export default useFetchTask;
