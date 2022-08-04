import React from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import LoginScreen from "./login/Login";
import RegiserScreen from "./login/Register";
import CreateScreen from "./member/CreateScreen";
import PageNotFound from "./PageNotFound";
import Main from "./index/Main";
// import Tree from "./tree/Tree";

import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Navigation />
      <section>
        <Switch>
          {/* <Route exact path="/:id/tree" pageTitle="Tree" component={Tree}>*/}
          <Route path={`/create`} component={CreateScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegiserScreen} />
          <Route path="/404" component={PageNotFound} />
          <Route path="/" component={Main} />
          <Route component={PageNotFound} />
        </Switch>
      </section>
    </div>
  );
}
