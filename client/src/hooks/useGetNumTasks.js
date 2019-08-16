import { useState, useEffect } from "react";
import axios from "axios";

function useGetNumTasks(completed) {
  const [numTasks, setNumTasks] = useState();
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
            setNumTasks(complete);
            break;
          case "false":
            setNumTasks(incomplete);
            break;
          default:
            setNumTasks(complete + incomplete);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchNumTasks();
  }, [completed]);

  return numTasks;
}

export default useGetNumTasks;
