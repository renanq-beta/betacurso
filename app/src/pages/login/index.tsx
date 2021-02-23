import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import {
  Brand,
  Container,
  ContentLeft,
  LeftContent,
  LoginBox,
  LoginImage,
  RightContent,
  TextLoginPage,
  FormLogin,
  LinkTo,
} from './style';

// Images
import BrandWhite from '../../assets/images/brand-white.png';
import Students from '../../assets/images/students.svg';
import DocumentPage from '../../helpers/documentPage';
import { IUser } from '../../interfaces/IUser';
import useStorage from '../../helpers/useStorage';
import validation from '../../helpers/validators';
import FormField from '../../components/common/form-field/form-field';
import Button from '../../components/common/button/button';

const LoginPage: React.FC = () => {
  const [form, setForm] = useState<IUser>({});
  const [error, setError] = useState<{ [key: string]: any | boolean }>({});
  const [, setTokenCredentials] = useStorage('token_credentials');
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    console.log(form);
    setForm((f: any) => ({ ...f, [name]: value }));
  };
  const handleBlur = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'email':
        if (!validation.email(value)) {
          throw setError({ ...error, email: 'O e-mail não é válido.' });
        }
        setError({ ...error, email: false });
        break;
      case 'password':
        if (value.length < 4) {
          throw setError({ ...error, password: 'É preciso ao menos 5 digitos' });
        }
        setError({ ...error, password: false });
        break;
      default:
        setError(error);
        break;
    }
  };
  const AUTH = gql`
  mutation Authentication($auth:AuthenticationInput){
    authentication(credentials:$auth){
      token
      type
    }
  }
  `;
  const [authentication] = useMutation(AUTH, { fetchPolicy: 'no-cache' });
  const sigIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!form || !form.email || !form.password) {
        throw new Error('Não foram preenchidos os campos.');
      }
      const { data: credentials, errors } = await authentication({
        variables: {
          auth: {
            email: form.email,
            password: form.password,
          },
        },
      });
      if (errors) {
        throw new Error('Não foi possível autenticar.');
      }
      if (credentials && credentials.authentication) {
        setTimeout(() => {
          setTokenCredentials({
            token: credentials.authentication.token,
            type: credentials.authentication.type,
          });
          window.location.pathname = '/';
        }, 1000);
      }
    } catch (errorAll) {
      throw new Error(errorAll);
    }
  };
  return (
    <DocumentPage title="Curso Beta - Login">
      <Container>
        <LeftContent>
          <ContentLeft>
            <TextLoginPage>
              <Brand>
                <img src={BrandWhite} alt="Brand - Curso Beta" />
              </Brand>
              <h1>Bem vindo de volta.</h1>
              <p>
                Você pode acessar a sua área logada e acessar todos os recursos
                exclusivos para você.
                <br />
                <br />
                Fique a vontade.
              </p>
            </TextLoginPage>
            <LoginImage>
              <img src={Students} alt="Estudantes" />
            </LoginImage>
          </ContentLeft>
        </LeftContent>
        <RightContent>
          <LoginBox>
            <h2>Utilize suas credenciais para se autenticar.</h2>
            <FormLogin onSubmit={sigIn}>
              <div className="field">
                <FormField
                  type="email"
                  name="email"
                  id="email"
                  placeholder="E-mail"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={error && error.email}
                />
              </div>
              <div className="field">
                <FormField
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Senha"
                  onChange={handleChange}
                  error={error && error.password}
                />
              </div>
              <div className="field-submit">
                <Button disabled={
                  !form.email
                  || !form.password
                  || error.email
                  || error.password
                }
                >
                  Entrar
                </Button>
                <div className="access-link">
                  <LinkTo to="/lost-access">Recuperar acesso</LinkTo>
                  <div>
                    ou
                    <LinkTo to="/signup">&nbsp; Cadastre-se</LinkTo>
                  </div>
                </div>
              </div>
            </FormLogin>
          </LoginBox>
        </RightContent>
      </Container>
    </DocumentPage>
  );
};

export default LoginPage;
