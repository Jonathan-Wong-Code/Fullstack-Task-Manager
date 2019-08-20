import styled from "styled-components";
import { colors } from "../../themes/constants";

export const TaskCard = styled.li`
  border: 1px solid #000;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
`;

export const H3 = styled.h3`
  font-size: 2rem;
  color: ${colors.WHITE};
  background: ${colors.BLUE};
  padding: 1rem 1.5rem;
  flex-shrink: 0;
`;

export const TaskDescription = styled.p`
  font-size: 1.8rem;
  font-weight: 400;
  flex-grow: 1;
  padding: 1rem 2rem;
`;

export const CardBottom = styled.div`
  border: 1px solid;
  padding: 1rem 2rem;
`;

export const Buttons = styled.div`
  display: flex;
  flex-shrink: 0;
`;
