import React, { Context, createContext, useContext } from 'react';

interface IContext {
  token?: string;
  type?: string;
}

interface IPropsContext {
  token?: string;
  type?: string;
  children: React.ReactNode;
}

const UserContext: Context<IContext> = createContext({});

const useUserContext = () => useContext(UserContext);

const UserProvider: React.FC<IPropsContext> = ({ token, type, children }: IPropsContext) => (
  <UserContext.Provider value={{ token, type }}>
    {children}
  </UserContext.Provider>
);

export { useUserContext, UserProvider };
