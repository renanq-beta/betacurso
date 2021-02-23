import styled from 'styled-components';

export const ButtonContainer = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #E35151;
  color: #fff;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  font-size: .8rem;
  transition: all ease-in-out .3s;
  font-family: "Segoe UI", sans-serif;

  &:hover{
      background-color: #E35151;
  }

  &[disabled]{
      background: #999 !important;
  }
`;
