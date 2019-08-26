import React from "react";
import TaskForm from "../taskForm";
import useFetchTask from "./../../hooks/useFetchTask";
import { FormSection, FormHeader, FormContainer } from "../../themes/forms";
export default function EditTask({ match }) {
  const { fetchedTask, loading, error } = useFetchTask(match.params.id);
  if (loading || !fetchedTask) return <div> Loading Edit info </div>;
  return (
    <FormSection>
      <FormContainer>
        <FormHeader>Edit Task</FormHeader>
        <TaskForm type="edit" editedTask={fetchedTask} fetchError={error} />
      </FormContainer>
    </FormSection>
  );
}
