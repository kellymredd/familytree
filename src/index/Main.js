import React from "react";
import { Switch, Route } from "react-router-dom";
import FamilyMenu from "../components/FamilyMenu";
import ProfileScreen from "../profile/ProfileScreen";
import HomesScreen from "./HomeScreen";
import EditScreen from "../member/EditScreen";

export default function Main() {
  return (
    <>
      <FamilyMenu />
      <Switch>
        <Route path={`/:id(\\d+)/edit`} component={EditScreen} />
        <Route path={`/:id(\\d+)`} component={ProfileScreen} />
        <Route component={HomesScreen} />
      </Switch>
    </>
  );
}
