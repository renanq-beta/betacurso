import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
`;

export const LeftContent = styled.div`
  width: 40%;
  background-color: #E35151;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const ContentLeft = styled.div`
  width: calc(100% - 60px);
  padding: 30px;
  display: flex;
  flex-direction: column;
`;

export const Brand = styled.div`
  width: 200px;
  height: 42px;
  margin: 40px 0;
`;

export const TextLoginPage = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  margin-left: 10%;
  font-family: 'Open Sans', sans-serif;
  color: #fff;

  h1{
    margin: 0;
    padding: 0;
    letter-spacing: -3px;
    font-weight: 600;
    font-size: 2.5rem;
  }

  p{
    font-weight: 400;
  }
`;

export const LoginImage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  img{
    width: 100%;
  }
`;

export const RightContent = styled.div`
  width: calc(50% - 40px);
  padding: 20px;
  color: #999999;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const LoginBox = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  &[hidden]{
    display: none;
  }

    h2{
      width: 350px; 
      color: #999;
      font-weight: 300;
    }

    input{
      margin: 0;
      padding: 15px;
      width: 100%;
      background-color: #FCFCFC;
      border: 1px solid #E2E2E2;
      font-family: Open Sans, sans-serif;
    }
    
`;

export const FormLogin = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;

  .field{
    margin: 15px 0;
  }

  .field-submit{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .access-link{
      font-size: .7rem;
      display: flex;
      flex-direction: column;
    }

    button{
      background-color: #E35151;
      color: #fff;
      padding: 15px;
      width: 30%;
      border: 0;
    }
  }
`;

export const LinkTo = styled(Link)`
  color: #999999;
  text-decoration: none;
  transition: all .3s ease-in-out;

  &:hover{
    color: #E35151;
  }
`;
