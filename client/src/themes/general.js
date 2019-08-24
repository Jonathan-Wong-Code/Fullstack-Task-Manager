import styled from "styled-components";
import { colors } from "./constants";
import { Link } from "react-router-dom";
export const LinkButton = styled(Link)`
  font-size: 1.6rem;
  font-weight: 500;
  border-radius: 10px;
  background: ${colors.BLUE};
  color: ${colors.WHITE};
  padding: 0.75rem 1.5rem;
  width: 100%;
  margin-right: 1rem;
`;
