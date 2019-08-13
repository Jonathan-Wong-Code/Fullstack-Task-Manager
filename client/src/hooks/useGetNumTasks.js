import { useState, useEffect } from "react";
import axios from "axios";

function useGetNumTasks() {
  const [numTasks, setNumTasks] = useState();

  useEffect(() => {
    const fetchNumTasks = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/tasks/numTasks",
        {
          withCredentials: true
        }
      );
      setNumTasks(response.data.data.numTasks);
    };
    fetchNumTasks();
  }, []);

  return numTasks;
}

export default useGetNumTasks;
