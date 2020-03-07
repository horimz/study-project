import React from "react";
import styled from "styled-components";
import { Button } from "../common/Button";
import { Link } from "react-router-dom";
import { mixin } from "../../lib/styles";

const NotFoundContentBlock = styled.div`
  ${mixin.flexCenter}
  flex-direction: column;
`;

const NotFoundContentHeader = styled.h1`
  margin: 0;
  font-size: 12.5rem;
`;

const NotFoundContentText = styled.p`
  font-size: 2rem;
  margin-bottom: 3rem;
`;

interface NotFoundContentProps {}

export const NotFoundContent: React.FC<NotFoundContentProps> = props => {
  return (
    <NotFoundContentBlock>
      <NotFoundContentHeader>404</NotFoundContentHeader>
      <NotFoundContentText>Nothing here..</NotFoundContentText>
      <Link to='/'>
        <Button color='green' size='large'>
          Back home
        </Button>
      </Link>
    </NotFoundContentBlock>
  );
};
