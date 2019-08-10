import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import axios from "axios";
import { useTaskState } from "./../context/task-context";

export default function EditTask({ match }) {
  const [task, setTask] = useState();
  const { tasks } = useTaskState();

  useEffect(() => {
    const editedTask = tasks.find(task => task._id === match.params.id);
    const getTask = async () => {
      const response = await axios({
        method: "GET",
        url: `http://localhost:3000/api/v1/tasks/${match.params.id}`,
        withCredentials: true
      });
      setTask(response.data.data.task);
    };
    if (editedTask) {
      setTask(editedTask);
    } else {
      getTask();
    }
  }, [tasks, match.params.id]);

  if (!task) return <div />;
  return (
    <div>
      <h2>Edit Task</h2>
      <TaskForm type="edit" editedTask={task} />
    </div>
  );
}
