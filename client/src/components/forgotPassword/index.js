import React from "react";
import { sendResetToken } from "../../async-helpers/auth";
import useSafeDispatch from "./../../hooks/useSafeDispatch";
import {
  Form,
  Button,
  FormHeader,
  FormContainer,
  FormSection,
  Label,
  Input
} from "./../../themes/forms";

function ForgotPassword() {
  const [{ email, message, loading }, setSafeState] = useSafeDispatch({
    email: "",
    message: "",
    loading: false
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const message = await sendResetToken(email, setSafeState);
    setSafeState({ email: "", message });
  };

  return (
    <FormSection>
      <FormContainer>
        <FormHeader>Forgot your password?</FormHeader>
        <Form action="" onSubmit={handleSubmit} data-testid="forgot-pass-Form">
          <Label htmlFor="reset-email">Enter email:</Label>
          <Input
            type="email"
            id="reset-email"
            value={email}
            onChange={e => setSafeState({ email: e.target.value })}
          />
          {message && <p>{message}</p>}
          {loading && <p>Sending email...</p>}
          <Button type="submit">Submit</Button>
        </Form>
      </FormContainer>
    </FormSection>
  );
}

export default ForgotPassword;
