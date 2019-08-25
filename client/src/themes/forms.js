import styled from "styled-components";
import { colors, boxShadow, breakPoints } from "./constants.js";

export const FormSection = styled.section`
  display: flex;
  padding: 0 2rem;
`;
export const FormContainer = styled.div`
  margin: 5rem auto;
  border: 1px solid black;
  width: 100%;
  max-width: 60rem;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: ${boxShadow};
`;

export const FormHeader = styled.h2`
  text-align: center;
  color: ${colors.WHITE};
  background: ${colors.BLUE};
  font-size 2.4rem;
  padding: 1rem 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

export const Label = styled.label`
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  @media (min-width: ${breakPoints.large}) {
    margin-right: 1rem;
  }
`;

export const Input = styled.input`
  display: block;
  font-size: 2rem;
  font-family: sans-serif;
  font-weight: 700;
  line-height: 1.3;
  padding: 1rem 2rem;
  border: 1px solid #aaa;
  border-radius: 10px;
  appearance: none;

  @media (min-width: ${breakPoints.large}) {
    margin-right: 1rem;
    width: 100%;
  }
`;

export const TextArea = styled.textarea`
  border-radius: 10px;
  border: 1px solid #aaa;
  font-size: 2rem;
  font-family: sans-serif;
  font-weight: 700;
  padding: 2rem;
  margin-bottom: 2rem;
`;

export const Button = styled.button`
  font-size: 2rem;
  font-weight: 500;
  border-radius: 10px;
  background: ${colors.BLUE};
  color: ${colors.WHITE};
  padding: 1rem 6rem;
  align-self: flex-start;
  cursor: pointer;
  text-align: center;
  margin: 2rem auto 0 auto;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const CheckboxCaption = styled.p`
  margin-right: 0.75rem;
  font-size: 2rem;
`;

export const CheckIcon = styled.label`
  width: 25px;
  height: 25px;
  border: 1.5px solid ${colors.BLUE};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
`;

export const CheckIconInner = styled.span`
  width: 15px;
  height: 15px;
  background: ${colors.BLUE}
  border-radius: 50%;
  margin: auto;
  display: none;
`;

export const CheckInput = styled.input`
  transform: scale(0);
  display: none;
  position: absolute;
  &:checked ~ label span {
    display: block;
  }
`;
