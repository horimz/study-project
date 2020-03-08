import React from "react";
import { Route, Switch } from "react-router";
import loadable from "@loadable/component";
import { ServiceTemplate } from "../../components/service/ServiceTemplate";
import { ServiceHeaderContainer } from "../../containers/service/ServiceHeaderContainer";
import { ServiceSideMenuContainer } from "../../containers/service/ServiceSideMenuContainer";
import { ServiceAssistantContainer } from "../../containers/service/ServiceAssistantContainer";

const ServiceHomePage = loadable(() => import("./ServiceHomePage"));
const ServiceFoldersPage = loadable(() => import("./ServiceFoldersPage"));
const ServiceUrlsPage = loadable(() => import("./ServiceUrlsPage"));

interface ServicePageProps {}

const ServicePage: React.FC<ServicePageProps> = props => {
  return (
    <ServiceTemplate>
      <ServiceHeaderContainer />
      <ServiceSideMenuContainer />
      <Switch>
        <Route path='/service' component={ServiceHomePage} exact />
        <Route path='/service/folders' component={ServiceFoldersPage} />
        <Route path='/service/urls' component={ServiceUrlsPage} />
      </Switch>
      <ServiceAssistantContainer />
    </ServiceTemplate>
  );
};

export { ServicePage as default };
