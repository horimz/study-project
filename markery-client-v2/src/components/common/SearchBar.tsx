import React, { useState, useCallback } from "react";
import styled, { css } from "styled-components";
import { palette, boxShadow, media } from "../../lib/styles";
import { FiSearch } from "react-icons/fi";

interface StyledInputProps {
  focus: boolean;
}

const StyledSearchBar = styled.div<StyledInputProps>`
  display: flex;
  position: relative;
  ${media.xsmall} {
    width: 100%;
  }
  svg {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 2rem;
    transform: translate(15px, 13px);
    color: ${palette.grey4};
  }
  input {
    display: block;
    line-height: 18px;
    font-size: 14px !important;
    font-style: normal;
    border: none;
    border: 1px solid ${palette.border};
    outline: none;
    width: 200px;
    border-radius: 6px;
    padding: 13px 16px 13px 4.5rem;
    color: ${palette.grey7};
    background-color: white;
    transition: all 0.2s linear 0s;
    ${media.custom(750)} {
      width: 100%;
      transition: border-color 0.2s linear 0s;
    }
    ${media.xsmall} {
      width: 100%;
    }
    ${props =>
      props.focus &&
      css`
        ${boxShadow.inputFocus}
        border-color: transparent;
        width: 380px;
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
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: React.ChangeEventHandler;
}

const SearchBar: React.FC<InputProps> = ({
  placeholder,
  name,
  value,
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
    <StyledSearchBar focus={focus}>
      <FiSearch />
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
    </StyledSearchBar>
  );
};

export { SearchBar };
