import React from "react";
import styled, { css } from "styled-components";
import { palette, buttonColorMap, boxShadow } from "../../lib/styles";

type ButtonColor =
  | "lightGren"
  | "grey"
  | "darkGrey"
  | "green"
  | "lightBlue"
  | "blue"
  | "red"
  | "pink"
  | "greyToRed";

type ButtonSize = "small" | "medium" | "large";

interface StyledButtonProps {
  color: ButtonColor;
  size: ButtonSize;
  strech: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  outline: none;
  color: white;
  padding-top: 0;
  padding-bottom: 0;
  ${boxShadow.button}
  font-weight: 700;
  transition: all 0.2s linear 0s;
  line-height: 1;

  color: ${props => buttonColorMap[props.color].color};
  background: ${props => buttonColorMap[props.color].backgroundColor};

  &:hover,
  &:focus {
    background: ${props => buttonColorMap[props.color].hoverBackgroundColor};
  }

  ${props =>
    props.strech &&
    css`
      width: 100%;
    `}

  ${props =>
    props.size === "small" &&
    css`
      height: 2.5rem;
      padding-left: 1rem;
      padding-right: 1rem;
      font-size: 1.15rem;
    `}

  ${props =>
    props.size === "medium" &&
    css`
      height: 3.25rem;
      padding-left: 1.45rem;
      padding-right: 1.45rem;
      font-size: 1.4rem;
    `}

  ${props =>
    props.size === "large" &&
    css`
      height: 5rem;
      padding-left: 1.75rem;
      padding-right: 1.75rem;
      font-size: 1.75rem;
    `}

  &:disabled {
    cursor: not-allowed;
    background: ${palette.grey3};
    color: ${palette.grey5};

    &:hover {
      background: ${palette.grey3};
      color: ${palette.grey5};
    }
  }
`;

interface ButtonProps extends Omit<React.HTMLProps<HTMLButtonElement>, "size"> {
  color?: ButtonColor;
  size?: ButtonSize;
  strech?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  color = "lightGrey",
  size = "medium",
  strech = false,
  ...rest
}) => {
  const htmlProps = rest as any;

  return (
    <StyledButton
      color={color}
      size={size}
      strech={strech}
      {...htmlProps}
      onClick={event => {
        if (htmlProps.onClick) {
          htmlProps.onClick(event);
        }
        (event.target as HTMLButtonElement).blur();
      }}
    >
      {children}
    </StyledButton>
  );
};

export { Button };
