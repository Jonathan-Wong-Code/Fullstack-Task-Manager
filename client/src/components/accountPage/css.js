import styled from "styled-components";
import { LinkButton } from "./../../themes/general";
import { colors, boxShadow, breakPoints } from "./../../themes/constants";

export const Section = styled.section`
  padding: 5rem 1rem;
  display: flex;
  justify-content: center;
`;

export const H2 = styled.h2`
  color: ${colors.WHITE};
  background: ${colors.BLUE};
  width: 100%;
  font-size: 3rem;
  padding: 1rem 2rem;
  text-align: center;
`;

export const InfoContainer = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: ${boxShadow};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  width: 400px;

  @media (min-width: ${breakPoints.large}) {
    width: 600px;
  }
`;

export const ContentContainer = styled.div`
  padding: 2rem 4rem;
  width: 100%;
`;

export const ImgContainer = styled.div`
  height: 200px;
  width: 200px;
  margin-right: 0;
  text-align: center;
  margin: 1rem auto;
  @media (min-width: ${breakPoints.large}) {
    height: 300px;
    width: 300px;
  }
`;

export const Img = styled.img`
  width: 100%;
  height: auto;
  border-radius: 50%;
  object-fit: cover;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (min-width: ${breakPoints.medium}) {
    flex-direction: row;
  }
`;

export const InfoButton = styled(LinkButton)`
  text-align: center;
  margin: 0.5rem 0;
  width: 70%;
  @media (min-width: ${breakPoints.medium}) {
    width: 50%;

    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;

export const Text = styled.p`
  font-size: 2rem;
  font-weight: 500;
  margin: 0.5rem 0;
  text-align: center;
`;
