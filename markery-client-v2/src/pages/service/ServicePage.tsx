import React, { useEffect } from 'react';
import { useAuth } from '../../lib/hooks';
import { Route, Switch, useHistory } from 'react-router-dom';
import loadable from '@loadable/component';
import { ServiceTemplate } from '../../components/service/ServiceTemplate';
import {
  ServiceContentTemplate,
  ServiceContentSegmentBlock
} from '../../components/service/ServiceContentTemplate';
import { ServiceHeaderContainer } from '../../containers/service/ServiceHeaderContainer';
import { ServiceSideMenuContainer } from '../../containers/service/ServiceSideMenuContainer';
import { ServiceAssistantContainer } from '../../containers/service/ServiceAssistantContainer';
import { ServiceContentHeaderContainer } from '../../containers/service/ServiceContentHeaderContainer';
import { ServiceContentModifier } from '../../containers/service/ServiceContentModifier';
import { Helmet } from 'react-helmet-async';

const ServiceHomePage = loadable(() => import('./ServiceHomePage'));
const ServiceFoldersPage = loadable(() => import('./ServiceFoldersPage'));
const ServiceUrlsPage = loadable(() => import('./ServiceUrlsPage'));
const ServiceFolderPage = loadable(() => import('./ServiceFolderPage'));

interface ServicePageProps {}

const ServicePage: React.FC<ServicePageProps> = props => {
  const history = useHistory();
  const { auth } = useAuth();

  useEffect(() => {
    if (!auth.user) {
      history.push('/');
    }
  }, [auth, history]);

  return (
    <ServiceTemplate>
      <Helmet>
        <title>Service - Markery</title>
      </Helmet>
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
            <Route path='/service/:folder' component={ServiceFolderPage} />
          </Switch>
        </ServiceContentSegmentBlock>
      </ServiceContentTemplate>
      <ServiceAssistantContainer />
      <ServiceContentModifier />
    </ServiceTemplate>
  );
};

export { ServicePage as default };
