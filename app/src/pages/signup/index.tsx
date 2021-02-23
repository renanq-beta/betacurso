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
import validation from '../../helpers/validators';
import FormField from '../../components/common/form-field/form-field';

const Signup: React.FC = () => {
  const [form, setForm] = useState<any>();
  const [user, setUser] = useState<IUser>();
  const [step, setStep] = useState<number>(0);
  const [error, setError] = useState({});
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setForm((f: any) => ({ ...f, [name]: value }));
  };
  const handleBlur = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        if (value.length < 5) {
          throw setError({ ...error, [name]: 'É necessário ao menos 5 carácteres' });
        }
        setError({ ...error, [name]: false });
        break;
      case 'email':
        if (!validation.email(value)) {
          throw setError({ ...error, [name]: 'O e-mail não é válido' });
        }
        setError({ ...error, [name]: false });
        break;
      case 'password':
        if (value.length < 4) {
          throw setError({ ...error, [name]: 'A senha precisa de ao menos 5 caractéres' });
        }
        setError({ ...error, [name]: false });
        break;
      case 'checkpassword':
        if (form.password !== value) {
          throw setError({ ...error, [name]: 'As senhas precisam ser idênticas' });
        }
        setError({ ...error, [name]: false });
        break;
      default:
        setError(error);
        break;
    }
  };
  const CREATE_USER = gql`
    mutation CreateUser($user:UserInput){
      createUser(user:$user){
        name
        email
      }
    }
  `;
  const [createAccount] = useMutation(CREATE_USER, { fetchPolicy: 'no-cache' });
  const signup = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const { data: created, errors } = await createAccount({
        variables: {
          user: {
            name: form.name,
            email: form.email,
            password: form.password,
          },
        },
      });
      if (errors) {
        throw new Error('Não foi possível criar um usuário');
      }
      if (created && created.createUser) {
        const { name, email }: IUser = created.createUser;
        setUser(() => ({ name, email }));
        setStep(1);
      }
    } catch (errors) {
      throw new Error(errors);
    }
  };

  return (
    <DocumentPage title="Curso Beta - Cadastre-se">
      <Container>
        <LeftContent>
          <ContentLeft>
            <TextLoginPage>
              <Brand>
                <img src={BrandWhite} alt="Brand - Curso Beta" />
              </Brand>
              <h1>Vamos juntos escrever uma história na sua história?</h1>
              <p>
                Ótimos cursos a sua espera.
              </p>
            </TextLoginPage>
            <LoginImage>
              <img src={Students} alt="Estudantes" />
            </LoginImage>
          </ContentLeft>
        </LeftContent>
        <RightContent>
          <LoginBox hidden={step !== 0}>
            <h2>Preencha os dados para criar uma conta</h2>
            <FormLogin onSubmit={signup}>
              <div className="field">
                <FormField
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Nome completo"
                  onChange={(e): void => handleChange(e)}
                  onBlur={handleBlur}
                />
              </div>
              <div className="field">
                <FormField
                  type="email"
                  name="email"
                  id="email"
                  placeholder="E-mail"
                  onChange={(e): void => handleChange(e)}
                  onBlur={handleBlur}
                />
              </div>
              <div className="field">
                <FormField
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Senha"
                  onChange={(e): void => handleChange(e)}
                  onBlur={handleBlur}
                />
              </div>
              <div className="field">
                <FormField
                  type="password"
                  name="passwordConfirm"
                  id="passwordConfirm"
                  placeholder="Confirme a senha"
                />
              </div>
              <div className="field-submit">
                <button type="submit">Criar conta</button>
                <div className="access-link">
                  <LinkTo to="/login">
                    Já possuo cadastro.
                  </LinkTo>
                </div>
              </div>
            </FormLogin>
          </LoginBox>
          <LoginBox hidden={step !== 1}>
            <h2>
              {user && user.name}
              , boas vindas ao Curso Beta.
              <br />
              Utilize suas credenciais para autenticar.
              <br />
              <LinkTo to="/login">
                Fazer login
              </LinkTo>
            </h2>
          </LoginBox>
        </RightContent>
      </Container>
    </DocumentPage>
  );
};

export default Signup;
