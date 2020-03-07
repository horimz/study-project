import React, { useState, useCallback } from "react";
import styled, { css } from "styled-components";
import { palette, boxShadow } from "../../lib/styles";

interface StyledInputProps {
  focus: boolean;
  clearBackground: boolean;
}

export const StyledInputBlock = styled.div<StyledInputProps>`
  margin-top: 1.25rem;
  width: 100%;
  label,
  input {
    display: block;
    line-height: 18px;
    font-size: 14px !important;
  }
  label {
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 8px;
    color: ${palette.label};
  }
  input {
    font-style: normal;
    border: none;
    border: 1px solid ${palette.border};
    outline: none;
    width: 100%;
    border-radius: 6px;
    padding: 13px 16px;
    color: ${palette.grey7};
    background-color: ${palette.inputInternalFill};
    transition: all 0.1s linear 0s;
    ${props =>
      props.focus &&
      css`
        ${boxShadow.inputFocus}
        border-color: transparent;
      `}
    ${props =>
      props.clearBackground &&
      css`
        background-color: white;
      `}
    &::placeholder {
      color: ${palette.grey4};
    }
    &:disabled {
      color: ${palette.grey6};
    }
  }
`;

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  clearBackground?: boolean;
  onChange?: React.ChangeEventHandler;
}

const Input: React.FC<InputProps> = ({
  label = "none",
  placeholder,
  name,
  value,
  clearBackground = false,
  onChange,
  id,
  ...rest
}) => {
  const [focus, setFocus] = useState(false);

  const onFocus = useCallback(() => {
    setFocus(true);
  }, []);
  const onBlur = useCallback(() => {
    setFocus(false);
  }, []);

  return (
    <StyledInputBlock focus={focus} clearBackground={clearBackground}>
      <label htmlFor={id}>{label}</label>
      <input
        name={name}
        id={id}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        {...rest}
      />
    </StyledInputBlock>
  );
};

export { Input };
