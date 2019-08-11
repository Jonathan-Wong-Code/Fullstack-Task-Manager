import { useState, useEffect } from "react";
import { useTaskState } from "./../context/task-context";
import axios from "axios";

// Fetches task on page load
function useFetchTask(id) {
  const [fetchedTask, setFetchedTask] = useState();
  const { tasks } = useTaskState();

  useEffect(() => {
    const task = tasks.find(task => task._id === id);
    const getTask = async () => {
      const response = await axios({
        method: "GET",
        url: `http://localhost:3000/api/v1/tasks/${id}`,
        withCredentials: true
      });
      setFetchedTask(response.data.data.task);
    };
    if (task) {
      setFetchedTask(task);
    } else {
      getTask();
    }
  }, [tasks, id]);

  return fetchedTask;
}

export default useFetchTask;
