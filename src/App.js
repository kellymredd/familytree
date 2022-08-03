import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Navigation from "./components/Navigation";
import LoginScreen from "./login/Login";
import RegiserScreen from "./login/Register";
import ProfileScreen from "./profile/ProfileScreen";
import ListMembersScreen from "./list/ListMembers";
import CreateScreen from "./member/CreateScreen";
import EditScreen from "./member/EditScreen";
import PageNotFound from "./PageNotFound";
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
          <Route path={`/:id(\\d+)/edit`} component={EditScreen} />
          <Route path={`/:id(\\d+)`} component={ProfileScreen} />
          <Route
            exact
            path="/"
            pageTitle="Members"
            component={ListMembersScreen}
          />
          <Route component={PageNotFound} />
        </Switch>
      </section>
    </div>
  );
}
