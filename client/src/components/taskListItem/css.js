import styled from "styled-components";
import { colors } from "../../themes/constants";
export const TaskCard = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #000;

  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

export const H3 = styled.h3`
  font-size: 2rem;
  color: ${colors.WHITE};

  background: ${colors.BLUE};
  padding: 1rem 1.5rem;
`;

export const Buttons = styled.div`
  display: flex;
`;
