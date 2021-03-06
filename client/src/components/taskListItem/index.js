import React, { useRef, useEffect } from "react";
import { useTaskDispatch } from "../../context/task-context";
import { useState } from "react";
import { deleteTask, editTask } from "../../async-helpers/tasks";
import {
  TaskCard,
  Buttons,
  H3,
  Todo,
  TaskDescription,
  CardBottom,
  DeleteButton
} from "./css";

import {
  CheckboxContainer,
  CheckIcon,
  CheckboxCaption,
  CheckInput,
  CheckIconInner
} from './../../themes/forms'

import { LinkButton } from "./../../themes/general";

function TaskListItem({ task, index }) {
  const [completed, setCompleted] = useState(task.completed);
  const taskDispatch = useTaskDispatch();
  const checkbox = useRef();

  useEffect(() => {
    checkbox.current.checked = task.completed;
  }, [task.completed]);

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
      <TaskDescription>
        <Todo>Todo: </Todo>
        {task.description}
      </TaskDescription>
      <CardBottom>
        <CheckboxContainer>
          <CheckboxCaption>Completed:</CheckboxCaption>
          <CheckInput
            type="checkbox"
            id={`completed-${index}`}
            checked={completed}
            ref={checkbox}
            value={completed}
            onChange={handleCheckChange}
            className={`check-box-${index}`}
            completed={completed}
            data-testid="checkbox"
          />
          <CheckIcon
            htmlFor={`completed-${index}`}
            className={`check-box-outer`}
          >
            <CheckIconInner
              className={`check-box-inner`}
              completed={completed}
            />
          </CheckIcon>
        </CheckboxContainer>
        <Buttons>
          <LinkButton to={`/edit/${task._id}`}>Edit Task</LinkButton>
          <DeleteButton onClick={() => deleteTask(task._id, taskDispatch)}>
            Delete Task
          </DeleteButton>
        </Buttons>
      </CardBottom>
    </TaskCard>
  );
}

export default TaskListItem;
