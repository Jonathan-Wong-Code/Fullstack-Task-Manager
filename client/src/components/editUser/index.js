import React, { useRef } from "react";
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

import { ImgContainer, Img } from "./../accountPage/css";
function EditUser() {
  const { user } = useUserState();
  const userDispatch = useUserDispatch();

  const file = useRef();

  const [
    { name, email, message, loading, photo },
    setSafeState
  ] = useSafeDispatch({
    name: user.name,
    email: user.email,
    photo: user.photo,
    loading: false,
    message: null
  });

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(photo);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("photo", photo);
    // const user = { name, email, photo };
    const message = await updateUser(userDispatch, formData, setSafeState);
    setSafeState({ message, name: "", email: "" });
  };
  return (
    <FormSection data-testid="edit-me-screen">
      <FormContainer>
        <FormHeader>Change your details</FormHeader>

        <Form action="" onSubmit={handleSubmit} data-testid="edit-me-form">
          <ImgContainer>
            <Img src={`/img/users/${user.photo}`} alt="Your profile" />
          </ImgContainer>
          <Label htmlFor="photo">Upload New Photo</Label>
          <Input
            type="file"
            accept="image/*"
            id="photo"
            name="photo"
            onChange={e => {
              console.log(e.target.files[0]);
              file.current = e.target.files[0];
              setSafeState({ photo: e.target.files[0] });
            }}
          />
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
