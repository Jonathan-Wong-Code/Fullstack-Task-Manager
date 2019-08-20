import styled from "styled-components";

export const TaskGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40rem, 1fr));
  grid-gap: 2rem;
  list-style-type: none;
  padding: 5rem 0 5rem 0;
`;
