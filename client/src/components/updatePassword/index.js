import React from "react";
import { updatePassword } from "../../async-helpers/auth";
import useSafeDispatch from "./../../hooks/useSafeDispatch";
import {
  FormSection,
  FormContainer,
  FormHeader,
  Form,
  Input,
  Button,
  Label
} from "../../themes/forms";
function UpdatePassword() {
  const [
    { password, updatedPassword, confirmUpdatedPassword, message, loading },
    setSafeState
  ] = useSafeDispatch({
    password: "",
    updatedPassword: "",
    confirmUpdatedPassword: "",
    message: "",
    loading: false
  });

  const handleSubmit = async e => {
    e.preventDefault();
    setSafeState({ message: "" });

    const message = await updatePassword(
      password,
      updatedPassword,
      confirmUpdatedPassword,
      setSafeState
    );

    setSafeState({
      message: message,
      password: "",
      confirmUpdatedPassword: "",
      updatedPassword: ""
    });
  };

  return (
    <FormSection>
      <FormContainer>
        <FormHeader>Update password</FormHeader>
        <Form action="" onSubmit={handleSubmit} data-testid="update-pass-form">
          <Label htmlFor="update-password">Enter Current Password</Label>
          <Input
            type="text"
            id="update-password"
            value={password}
            onChange={e => setSafeState({ password: e.target.value })}
          />

          <Label htmlFor="update-new-password">Enter New Password</Label>
          <Input
            type="text"
            id="update-new-password"
            value={updatedPassword}
            onChange={e => setSafeState({ updatedPassword: e.target.value })}
          />

          <Label htmlFor="update-confirm-updated-password">
            Confirm Updated Password
          </Label>
          <Input
            type="text"
            id="update-confirm-updated-password"
            value={confirmUpdatedPassword}
            onChange={e =>
              setSafeState({ confirmUpdatedPassword: e.target.value })
            }
          />
          {loading && <p>Updating...</p>}
          {message && <p data-testid="update-pass-message">{message}</p>}
          <Button type="submit">Submit</Button>
        </Form>
      </FormContainer>
    </FormSection>
  );
}

export default UpdatePassword;
