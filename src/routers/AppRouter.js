import React from "react";
import { Switch, Router, Route, Redirect } from "react-router-dom";
import history from "../helpers/History";

import Main from "../views/Main";

const AppRouter = () => (
  <Router history={history}>
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={Main} />
      </Switch>
    </React.Fragment>
  </Router>
);

export default AppRouter;
