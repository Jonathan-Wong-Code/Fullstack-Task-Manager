import styled from "styled-components";

export const TaskGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  grid-gap: 2rem;

  list-style-type: none;

  padding: 5rem 0 5rem 0;
`;
