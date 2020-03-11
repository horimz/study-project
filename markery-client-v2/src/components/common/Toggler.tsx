import React from "react";
import styled, { css } from "styled-components";
import { palette } from "../../lib/styles";

type TogglerColor = "green" | "blue";

type TogglerSize = "small" | "medium" | "large";

const StyledLabel = styled.label<{ size: TogglerSize }>`
  position: relative;
  display: inline-block;
  ${props =>
    props.size === "small" &&
    css`
      width: 50px;
      height: 25px;
    `}
  ${props =>
    props.size === "medium" &&
    css`
      width: 60px;
      height: 34px;
    `}
  ${props =>
    props.size === "large" &&
    css`
      width: 80px;
      height: 45px;
    `}
`;

const StyledCheckbox = styled.input.attrs({ type: "checkbox" })<{
  color: TogglerColor;
  _size: TogglerSize;
}>`
  display: none;

  ${props =>
    props.color === "blue" &&
    css`
      &:checked + span {
        background-color: ${palette.blue5};
        opacity: 0.7;
      }

      &:focus + span {
        box-shadow: 0 0 1px ${palette.blue5};
        opacity: 0.7;
      }
    `}

  ${props =>
    props.color === "green" &&
    css`
      &:checked + span {
        background-color: ${palette.green5};
        opacity: 0.7;
      }

      &:focus + span {
        box-shadow: 0 0 1px ${palette.green5};
        opacity: 0.7;
      }
    `}

  ${props =>
    props._size === "small" &&
    css`
      &:checked + span::before {
        -webkit-transform: translateX(25px);
        -ms-transform: translateX(25px);
        transform: translateX(25px);
      }
    `}

  ${props =>
    props._size === "medium" &&
    css`
      &:checked + span::before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
      }
    `}

  ${props =>
    props._size === "large" &&
    css`
      &:checked + span::before {
        -webkit-transform: translateX(35px);
        -ms-transform: translateX(35px);
        transform: translateX(35px);
      }
    `}
`;

const StyledSlider = styled.span<{ size: TogglerSize }>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${palette.grey4};
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;

  ${props =>
    props.size === "small" &&
    css`
      &::before {
        position: absolute;
        content: "";
        height: 17px;
        width: 17px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
        border-radius: 50%;
      }
    `}

  ${props =>
    props.size === "medium" &&
    css`
      &::before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
        border-radius: 50%;
      }
    `}

  ${props =>
    props.size === "large" &&
    css`
      &::before {
        position: absolute;
        content: "";
        height: 37px;
        width: 37px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
        border-radius: 50%;
      }
    `}
`;

interface TogglerProps {
  color?: TogglerColor;
  size?: any;
}

const Toggler: React.FC<TogglerProps> = ({
  color = "blue",
  size = "medium"
}) => {
  return (
    <StyledLabel size={size}>
      <StyledCheckbox color={color} _size={size} />
      <StyledSlider size={size} />
    </StyledLabel>
  );
};

export { Toggler };
