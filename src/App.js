import React from "react";
import { Route, Switch } from "react-router-dom";
import ProfileScreen from "./profile/ProfileScreen";
import ListMembersScreen from "./list/ListMembers";
import EditScreen from "./user/EditScreen";
import Tree from "./tree/Tree";

import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <div className="container-fluid p0">
        <Switch>
          {/* <Route exact path="/:id/tree" pageTitle="Tree">
            <Tree />
          </Route>
          <Route exact path={`/:id/edit`}>
            <EditScreen />
          </Route> */}
          <Route path={`/:id`}>
            <ProfileScreen />
          </Route>
          <Route exact path="/" pageTitle="Users">
            <ListMembersScreen />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
