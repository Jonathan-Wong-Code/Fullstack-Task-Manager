import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTaskDispatch } from "../../context/task-context";
import { useState } from "react";
import { deleteTask, editTask } from "../../async-helpers/tasks";
import { TaskCard, Buttons, H3 } from "./css";

function TaskListItem({ task, index }) {
  const [completed, setCompleted] = useState(task.completed);
  const taskDispatch = useTaskDispatch();
  const checkbox = useRef();

  useEffect(() => {
    checkbox.current.checked = task.completed;
  });

  const handleCheckChange = async () => {
    setCompleted(checkbox.current.checked);
    await editTask(
      {
        title: task.title,
        description: task.description,
        completed: checkbox.current.checked,
        _id: task._id
      },
      taskDispatch
    );
  };
  return (
    <TaskCard data-testid={`task-item-${index}`}>
      <H3>{task.title}</H3>
      <div className="content">
        <p>{task.description}</p>
        <div>
          <label htmlFor="completed">completed?</label>
          <input
            type="checkbox"
            id="completed"
            checked={completed}
            ref={checkbox}
            value={completed}
            onChange={handleCheckChange}
          />
        </div>
        <Buttons>
          <Link to={`/edit/${task._id}`}>Edit Task</Link>
          <button onClick={() => deleteTask(task._id, taskDispatch)}>
            Delete Task
          </button>
        </Buttons>
      </div>
    </TaskCard>
  );
}

export default TaskListItem;
