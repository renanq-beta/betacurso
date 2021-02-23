import React, { InputHTMLAttributes } from 'react';
import InputMask from 'react-input-mask';
import { CSSProperties } from 'styled-components';
import { FormFieldContainer } from './form-field.style';

interface IFormFieldProps extends InputHTMLAttributes<HTMLInputElement>{
  label?: string;
  type?: string;
  title?: string;
  error?: string|boolean|any;
  mask?: string;
  id?: string;
  style?: CSSProperties;
  placeholder?: string;
  maskChar?: string;
}

function FormField(props: IFormFieldProps) {
  const {
    label,
    type,
    title,
    error,
    mask,
    id,
    placeholder,
  } = props;
  return (
    <FormFieldContainer>
      <label htmlFor={id}>
        {label}
      </label>
      <div className={`form-field ${error ? 'error-field' : ''}`}>
        {
          mask && <InputMask maskChar="" mask={mask} type={type} {...props} placeholder={placeholder} title={title} />
        }
        {
          !mask && <input type={type} {...props} placeholder={placeholder} title={title} />
        }
      </div>
      <div className="error">
        {error && error}
      </div>
    </FormFieldContainer>
  );
}

export default FormField;
