import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
`;

export const LeftContent = styled.div`
  width: 20%;
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
  width: 80%;
  color: #999999;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  width: calc(100% - 40px);
  padding: 20px;
`;

export const TopBar = styled.div`
  width: 100%;
  height: 60px;
  background: #f5f5f5;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: 1px 1px 4px rgba(0,0,0,.1);
  justify-content: flex-end;
`;

export const ListCourses = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const Course = styled.li`
  width: calc((100% / 5) - 30px);
  height: 150px;
  background: #eee;
  padding: 15px;
  
`;

export const EmptyCourses = styled.div`
  width: 100%;
  text-align: center;
`;

export const LinkToButton = styled(Link)`
  color: #fff;
  text-decoration: none;
  background: #E35151;
  font-size: .8rem;
  padding: 22px;
  transition: all .3s ease-in-out;

  &:hover{
    color: #E35151;
    background-color: #fff;
  }
`;

export const FormCreate = styled.div`
  width: 40%;
  margin: 0 auto;

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
