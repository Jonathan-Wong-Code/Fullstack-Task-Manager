import styled from "styled-components";
import { colors, breakPoints, boxShadow } from "./../../themes/constants";
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid ${colors.BLACK};
  padding: 2rem 1rem;
  border-radius: 10px;
  box-shadow: ${boxShadow};

  @media (min-width: ${breakPoints.large}) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 2rem 5rem;
  }
`;

export const Select = styled.select`
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: #444;
  line-height: 1.3;
  padding: 1rem;
  max-width: 100%;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
  background: ${colors.WHITE};
  border-radius: 10px;
  appearance: none;
  text-align: center;

  @media (min-width: ${breakPoints.large}) {
    margin-right: 1rem;
    width: 200%;
  }
`;

export const Input = styled.input`
  display: block;
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 700;
  color: #444;
  line-height: 1.3;
  padding: 1rem;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
  border-radius: 0.5em;
  appearance: none;

  @media (min-width: ${breakPoints.large}) {
    margin-right: 1rem;
    width: 100%;
  }
`;

export const FormCell = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 3rem;
`;
