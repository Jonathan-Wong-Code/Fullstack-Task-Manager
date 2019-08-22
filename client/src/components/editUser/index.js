import React from "react";
import { useUserState } from "../../context/user-context";
import { useUserDispatch } from "../../context/user-context";
import useSafeDispatch from "../../hooks/useSafeDispatch";
import { updateUser } from "../../async-helpers/users";
import {
  FormSection,
  FormContainer,
  FormHeader,
  Form,
  Input,
  Button,
  Label
} from "../../themes/forms";
function EditUser() {
  const { user } = useUserState();
  const userDispatch = useUserDispatch();

  const [{ name, email, message, loading }, setSafeState] = useSafeDispatch({
    name: user.name,
    email: user.email,
    loading: false,
    message: null
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const user = { name, email };
    const message = await updateUser(userDispatch, user, setSafeState);
    setSafeState({ message, name: "", email: "" });
  };

  return (
    <FormSection data-testid="edit-me-screen">
      <FormContainer>
        <FormHeader>Change your details</FormHeader>
        <Form action="" onSubmit={handleSubmit} data-testid="edit-me-form">
          <Label htmlFor="user-name">Name:</Label>
          <Input
            type="text"
            id="user-name"
            name="user-name"
            value={name}
            onChange={e => setSafeState({ name: e.target.value })}
          />
          <Label htmlFor="user-email">Email:</Label>
          <Input
            type="text"
            id="user-email"
            name="user-email"
            value={email}
            onChange={e => setSafeState({ email: e.target.value })}
          />
          {message && <p data-testid="edit-me-message">{message}</p>}
          {loading && <p>Updating info</p>}
          <Button type="submit">Submit</Button>
        </Form>
      </FormContainer>
    </FormSection>
  );
}

export default EditUser;
