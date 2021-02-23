import React, { useMemo, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  Brand,
  Container,
  ContentLeft,
  LeftContent,
  LoginImage,
  RightContent,
  TextLoginPage,
  ListCourses,
  Course,
  EmptyCourses,
  TopBar,
  LinkToButton,
  Content,
} from './style';

// Images
import BrandWhite from '../../assets/images/brand-white.png';
import Students from '../../assets/images/signup.svg';
import DocumentPage from '../../helpers/documentPage';
import { ICourse } from '../../interfaces/ICourses';
import useLocalStorage from '../../helpers/useStorage';

const DashboardPage: React.FC = () => {
  const [listCourses, setListCourses] = useState<Array<ICourse>>([]);
  const [, setToken] = useLocalStorage('token_credentials');
  const GET_COURSES = gql`
  {
    getCourses{
      total_count,
      edges{
        id
        name
      }
    }
  }`;

  const logout = (): void => {
    setToken(null);
  };

  const {
    data,
  } = useQuery(GET_COURSES, { fetchPolicy: 'network-only' });

  useMemo(() => {
    if (data && data.getCourses) {
      setListCourses(data.getCourses.edges);
    }
  }, [data]);

  return (
    <DocumentPage title="Curso Beta - Lista de cursos">
      <Container>
        <LeftContent>
          <ContentLeft>
            <TextLoginPage>
              <Brand>
                <img src={BrandWhite} alt="Brand - Curso Beta" />
              </Brand>
              <h1>
                Todos os cursos em um só lugar.
              </h1>
              <p>
                Todos os cursos disponíveis estão listado ao lado.
              </p>
            </TextLoginPage>
            <LoginImage>
              <img src={Students} alt="Estudantes" />
            </LoginImage>
          </ContentLeft>
        </LeftContent>
        <RightContent>
          <TopBar>
            <LinkToButton to="create">
              Criar novo curso
            </LinkToButton>
            <LinkToButton to="/login" onClick={logout}>
              Sair
            </LinkToButton>
          </TopBar>
          <Content>
            {!listCourses.length && <EmptyCourses>Não existem cursos cadastrados.</EmptyCourses>}
            <ListCourses>
              {listCourses.map(item => (
                <Course>
                  {item.name}
                </Course>
              ))}
            </ListCourses>
          </Content>
        </RightContent>
      </Container>
    </DocumentPage>
  );
};

export default DashboardPage;
