import React from "react";
import { useUserState } from "./../../context/user-context";
import {
  Section,
  InfoContainer,
  InfoButton,
  ButtonContainer,
  H2,
  ImgContainer,
  Img,
  Text,
  ContentContainer
} from "./css";

function AccountPage() {
  const { user } = useUserState();
  return (
    <Section data-testid="account-page-screen">
      <InfoContainer>
        <H2>Your account</H2>
        <ContentContainer>
          <ImgContainer>
            <Img src={`/img/users/${user.photo}`} alt="Your profile" />
          </ImgContainer>
          <Text data-testid="account-name">Name: {user.name}</Text>
          <Text data-testid="account-email">Email: {user.email}</Text>
          <ButtonContainer>
            <InfoButton to="/editMe">Edit details</InfoButton>
            <InfoButton to="/updatePassword">Edit password</InfoButton>
          </ButtonContainer>
        </ContentContainer>
      </InfoContainer>
    </Section>
  );
}

export default AccountPage;
