import { CircularProgress } from "@material-ui/core";
import Footer from "components/Footer";
import HamburgerNav from "components/hamburgerNav";
import Header from "components/Header";
import LoadingSpinner from "components/loadingSpinner";
import NotFound from "components/NotFound";
import PrivateRoute from "components/PrivateRoute";
import AUTH from "constant/auth";
import { _LIST_LINK, listPrivateLink } from "constant/config";
import LoginPage from "features/Auth/pages/login";
import RegisterPage from "features/Auth/pages/register";
import ManageWork from "features/ManageWork";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch, useHistory, useLocation } from "react-router";
import "./App.scss";
import "./features/multiLanguage/i18n.js";

function App() {
  const HomePage = React.lazy(() => import("./features/HomePage"));
  const routerLink = _LIST_LINK;
  const history = useHistory();
  const location = useLocation();
  const user = useSelector((state) => state.auth.current);
  const isLogin =
    !!localStorage.getItem(AUTH.TOKEN_KEY) &&
    !!(Object.keys(user).length !== 0);
  if (isLogin && location.pathname === _LIST_LINK.index) {
    history.push(_LIST_LINK.manageWork);
  }
  const isDisplayFooter =
    location.pathname === _LIST_LINK.index ||
    location.pathname === _LIST_LINK.login ||
    location.pathname === _LIST_LINK.register
      ? true
      : false;
  return (
    <div className="App">
      <Suspense
        fallback={
          <div className="container_lazy">
            <CircularProgress color="secondary" />
          </div>
        }
      >
        <Header />
        <Switch>
          <Redirect from={routerLink.home} to={routerLink.index} exact />
          <Route path="/" component={HomePage} exact></Route>
          <Route path={routerLink.register} component={RegisterPage} exact />
          <Route path={routerLink.login} component={LoginPage} exact />
          <PrivateRoute path={routerLink.manageWork} component={ManageWork} />
          <Route component={NotFound} />
        </Switch>
        {isDisplayFooter && <Footer />}
        <LoadingSpinner />
      </Suspense>
      <HamburgerNav />
    </div>
  );
}

export default App;
