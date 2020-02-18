import Header from "./header";
import Footer from "./footer";
import Body from "./views/body/body";
import Cats from "./views/cats/cats";
import Account from "./views/account/account";
import { Auth0Provider, useAuth0 } from "./utils/auth0";

import {
  ThemeProvider,
  CSSReset,
  CircularProgress,
  theme,
  Box
} from "@chakra-ui/core";
import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

const onAuthRedirectCallback = (redirectResult?: RedirectLoginResult) => {
  console.log(
    "auth0 onRedirectCallback called with redirectState %o",
    redirectResult
  );
};

const LoadingWrapper: React.FC = () => {
  const { isInitializing } = useAuth0();

  if (isInitializing) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress isIndeterminate color="gray.300"></CircularProgress>
      </Box>
    );
  }

  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Header />

        <Switch>
          <Route exact path="/">
            <Body />
          </Route>
          <Route path="/cats">
            <Cats />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
        </Switch>
        <Footer />
      </ThemeProvider>
    </HashRouter>
  );
};

const App: React.FC = () => {
  return (
    <Auth0Provider
      domain={"dev-60gnibur.eu.auth0.com"}
      client_id={"GAqPPFW4EPBZ0n2tCS8KKJYeVoV9MScW"}
      onRedirectCallback={onAuthRedirectCallback}
    >
      <LoadingWrapper />
    </Auth0Provider>
  );
};

export default App;
