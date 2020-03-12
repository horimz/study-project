import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../lib/hooks";
import { Helmet } from "react-helmet-async";
import { SettingsTemplate } from "../components/settings/SettingsTemplate";
import { SettingsAccount } from "../components/settings/SettingsAccount";

interface SettingsPageProps {}

const SettingsPage: React.FC<SettingsPageProps> = props => {
  const { auth } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (!auth.user) {
      history.push("/");
    }
  }, [auth, history]);

  return (
    <SettingsTemplate>
      <Helmet>
        <title>Settings - Markery</title>
      </Helmet>
      <SettingsAccount />
    </SettingsTemplate>
  );
};

export { SettingsPage as default };
