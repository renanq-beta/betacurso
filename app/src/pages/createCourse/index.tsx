import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import {
  Brand,
  Container,
  ContentLeft,
  LeftContent,
  LoginImage,
  RightContent,
  TextLoginPage,
  TopBar,
  LinkToButton,
  Content,
  FormCreate,
} from './style';

// Images
import BrandWhite from '../../assets/images/brand-white.png';
import Students from '../../assets/images/signup.svg';
import DocumentPage from '../../helpers/documentPage';
import { ICourse } from '../../interfaces/ICourses';
import FormField from '../../components/common/form-field/form-field';
import Button from '../../components/common/button/button';

const CreateCourse: React.FC = () => {
  const [form, setForm] = useState<ICourse | { [key: string]: string }>({});
  const [error, setError] = useState<{ [key: string]: string | boolean }>({});

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setForm((f) => ({ ...f, [name]: value }));
  };
  const handleBlur = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        if (value.length < 4) {
          throw setError({ ...error, [name]: 'É preciso ao menos 5 digitos' });
        }
        setError({ ...error, [name]: false });
        break;
      case 'description':
        if (!value.length) {
          throw setError({ ...error, [name]: 'Este campo é obrigatório' });
        }
        setError({ ...error, [name]: false });
        break;
      case 'video':
        if (value.length < 4) {
          throw setError({ ...error, [name]: 'É preciso ao menos 5 digitos' });
        }
        setError({ ...error, [name]: false });
        break;
      case 'duration':
        if (value.length < 4) {
          throw setError({ ...error, [name]: 'É preciso ao menos 5 digitos' });
        }
        setError({ ...error, [name]: false });
        break;
      default:
        setError(error);
        break;
    }
  };
  const CREATE_COURSE = gql`
    mutation CreateCourse($course: CourseInput){
      createCourse(course:$course){
        name
        description
        duration
      }
    }
  `;
  const [createCourse] = useMutation(CREATE_COURSE, { fetchPolicy: 'no-cache' });
  const create = async () => {
    const { data: creation, errors } = await createCourse({
      variables: {
        course: {
          ...form,
        },
      },
    });
    if (errors) {
      throw new Error('Erro ao criar um curso.');
    }
    if (creation) {
      window.location.pathname = '/';
    }
  };
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
          </TopBar>
          <Content>
            <FormCreate>
              <div className="field">
                <FormField
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Nome do curso"
                  onChange={handleChange}
                  error={error && error.name}
                  onBlur={handleBlur}
                />
              </div>
              <div className="field">
                <FormField
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Descrição do curso"
                  onChange={handleChange}
                  error={error && error.description}
                  onBlur={handleBlur}
                />
              </div>
              <div className="field">
                <FormField
                  type="url"
                  name="video"
                  id="video"
                  placeholder="URL do vídeo"
                  onChange={handleChange}
                  error={error && error.video}
                  onBlur={handleBlur}
                />
              </div>
              <div className="field">
                <FormField
                  type="text"
                  name="duration"
                  id="duration"
                  placeholder="Duração do vídeo"
                  mask="99:99"
                  onChange={handleChange}
                  error={error && error.duration}
                  onBlur={handleBlur}
                />
              </div>
              <Button onClick={create}>
                Criar curso
              </Button>
            </FormCreate>
          </Content>
        </RightContent>
      </Container>
    </DocumentPage>
  );
};

export default CreateCourse;
