import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import loadable from "@loadable/component";
import { Helmet } from "react-helmet-async";
import { NotFoundPage } from "./pages/NotFoundPage";

const loadableConfig = {
  fallback: <div style={{ backgroundColor: "#eff3f5" }}></div>
};
const MainPage = loadable(() => import("./pages/MainPage"), loadableConfig);
const LoginPage = loadable(() => import("./pages/LoginPage"), loadableConfig);
const RegisterPage = loadable(
  () => import("./pages/RegisterPage"),
  loadableConfig
);
const ForgotPasswordPage = loadable(
  () => import("./pages/ForgotPasswordPage"),
  loadableConfig
);
const SettingsPage = loadable(() => import("./pages/SettingsPage"));
const ServicePage = loadable(() => import("./pages/service/ServicePage"));

// TODO: add SharePage

interface AppProps {}

const App: React.FC<AppProps> = props => {
  return (
    <BrowserRouter>
      <Helmet>
        <title>Markery</title>
      </Helmet>
      <Switch>
        <Route path='/' component={MainPage} exact />
        <Route path='/login' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/forgot-password' component={ForgotPasswordPage} />
        <Route path='/settings' component={SettingsPage} />
        <Route path='/service' component={ServicePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};

export { App };
