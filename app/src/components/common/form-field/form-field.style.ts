import styled from 'styled-components';

export const FormFieldContainer = styled.div`
    width: 100%;
    label{
      font-family: 'Segoe UI', Arial, sans-serif;
      letter-spacing: -1px;
      font-size: 1rem;
      color: #999;
      margin-bottom: 5px;
      display: inline-block;
    }
    .form-field{
        input{
            width: calc(100% - 30px);
            font-size: .8rem;
            border-radius: 6px;
            border: 1px solid #e5e5e5;
            padding: 15px;
    
            &::placeholder{
                color: #999;
            }
        }

        &.error-field{
            input{
                color: #F23D4C;
                border: 1px solid #F23D4C;

                &::placeholder{
                  color: #F23D4C;
                }
            }
        }
    }

    .error{
        margin-bottom: 10px;
        margin-top: 5px;
        color: red;
        font-size: .8rem;
    }
`;
