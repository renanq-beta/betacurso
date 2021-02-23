import React, { ButtonHTMLAttributes, ReactElement } from 'react';
import { ButtonContainer } from './button.style';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactElement | string;
  disabled?: any | boolean;
}

const Button: React.FC<IButton> = (props: IButton) => {
  const { children } = props;
  return (
    <ButtonContainer {...props}>
      {children}
    </ButtonContainer>
  );
};

export default Button;
