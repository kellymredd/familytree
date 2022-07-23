import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginScreen from "./login/Login";
import ProfileScreen from "./profile/ProfileScreen";
import ListMembersScreen from "./list/ListMembers";
import CreateScreen from "./member/CreateScreen";
import EditScreen from "./member/EditScreen";
// import Tree from "./tree/Tree";

import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <div className="container-fluid p0">
        <Switch>
          {/* <Route exact path="/:id/tree" pageTitle="Tree">
            <Tree />
  </Route>*/}
          <Route path={`/:id/edit`}>
            <EditScreen />
          </Route>
          <Route path={`/create`}>
            <CreateScreen />
          </Route>
          <Route path="/login">
            <LoginScreen />
          </Route>
          <Route path={`/:id`}>
            <ProfileScreen />
          </Route>
          <Route path="/" pageTitle="Members">
            <ListMembersScreen />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
