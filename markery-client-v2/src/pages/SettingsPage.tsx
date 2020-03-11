import React from "react";
import { Helmet } from "react-helmet-async";
import { SettingsTemplate } from "../components/settings/SettingsTemplate";
import { SettingsAccount } from "../components/settings/SettingsAccount";

interface SettingsPageProps {}

const SettingsPage: React.FC<SettingsPageProps> = props => {
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
