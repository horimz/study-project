import React from "react";
import { Helmet } from "react-helmet-async";
import { NotFoundTemplate } from "../components/notFound/NotFoundTemplate";
import { NotFoundContent } from "../components/notFound/NotFoundContent";

interface NotFoundPageProps {}

const NotFoundPage: React.FC<NotFoundPageProps> = props => {
  return (
    <NotFoundTemplate>
      <Helmet>
        <title>404 - Markery</title>
      </Helmet>
      <NotFoundContent />
    </NotFoundTemplate>
  );
};

export { NotFoundPage };
