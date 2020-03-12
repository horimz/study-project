import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../lib/hooks";
import { MainTemplate } from "../components/main/MainTemplate";

interface MainPageProps {}

// TODO: scroll to top when component renders
const MainPage: React.FC<MainPageProps> = props => {
  const { auth } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (auth.user) {
      history.push("/service");
    }
  }, [auth, history]);

  return <MainTemplate>Main</MainTemplate>;
};

export { MainPage as default };
