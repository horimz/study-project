import React from "react";
import { Route, Switch } from "react-router";
import loadable from "@loadable/component";
import { ServiceTemplate } from "../../components/service/ServiceTemplate";
import {
  ServiceContentTemplate,
  ServiceContentSegmentBlock
} from "../../components/service/ServiceContentTemplate";
import { ServiceHeaderContainer } from "../../containers/service/ServiceHeaderContainer";
import { ServiceSideMenuContainer } from "../../containers/service/ServiceSideMenuContainer";
import { ServiceAssistantContainer } from "../../containers/service/ServiceAssistantContainer";
import { ServiceContentHeaderContainer } from "../../containers/service/ServiceContentHeaderContainer";
import { ServiceContentModifier } from "../../components/service/ServiceContentModifier";

const ServiceHomePage = loadable(() => import("./ServiceHomePage"));
const ServiceFoldersPage = loadable(() => import("./ServiceFoldersPage"));
const ServiceUrlsPage = loadable(() => import("./ServiceUrlsPage"));
const ServiceFolderPage = loadable(() => import("./ServiceFolderPage"));

interface ServicePageProps {}

const ServicePage: React.FC<ServicePageProps> = props => {
  return (
    <ServiceTemplate>
      <ServiceHeaderContainer />
      <ServiceSideMenuContainer />
      <ServiceContentTemplate>
        <ServiceContentHeaderContainer />
        <ServiceContentSegmentBlock>
          <Switch>
            <Route path='/service' component={ServiceHomePage} exact />
            <Route path='/service/urls' component={ServiceUrlsPage} exact />
            <Route
              path='/service/folders'
              component={ServiceFoldersPage}
              exact
            />
            <Route path='/service/:folderId' component={ServiceFolderPage} />
          </Switch>
        </ServiceContentSegmentBlock>
      </ServiceContentTemplate>
      <ServiceAssistantContainer />
      <ServiceContentModifier />
    </ServiceTemplate>
  );
};

export { ServicePage as default };
