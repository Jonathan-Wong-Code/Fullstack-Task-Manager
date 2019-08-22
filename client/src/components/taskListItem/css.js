import styled from "styled-components";
import { colors, boxShadow } from "../../themes/constants";
import { Link } from "react-router-dom";

export const TaskCard = styled.li`
  border: 1px solid #000;
  border-radius: 10px;
  box-shadow: ${boxShadow};
  display: flex;
  flex-direction: column;
  min-height: 40rem;
  overflow: hidden;
`;

export const H3 = styled.h3`
  font-size: 2.4rem;
  color: ${colors.WHITE};
  background: ${colors.BLUE};
  padding: 2rem;
  flex-shrink: 0;
`;

export const TaskDescription = styled.p`
  font-size: 1.8rem;
  font-weight: 400;
  flex-grow: 1;
  padding: 1rem 2rem;
`;

export const CardBottom = styled.div`
  border-top: 1px solid;
  padding: 2rem;
`;

export const Todo = styled.span`
  font-weight: 700;
  font-size: 2rem;
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

export const Buttons = styled.div`
  display: flex;
  flex-shrink: 0;
  text-align: center;
  margin-top: 0.5rem;
`;

export const EditLink = styled(Link)`
  font-size: 1.6rem;
  font-weight: 500;
  border-radius: 10px;
  background: ${colors.BLUE};
  color: ${colors.WHITE};
  padding: 0.75rem 1.5rem;
  width: 100%;
  margin-right: 1rem;
`;

export const DeleteButton = styled.button`
  font-size: 1.6rem;
  font-weight: 500;
  border-radius: 10px;
  background: ${colors.BLUE};
  color: ${colors.WHITE};
  padding: 0.75rem 1.5rem;
  width: 100%;
  cursor: pointer;
`;
