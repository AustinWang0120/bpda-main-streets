import React from "react";
import { Switch, Route } from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import SubPage from "./components/pages/SubPage";

const App = () => {

  return (
    <Switch>
      <Route path={'/:distName'}>
        <SubPage />
      </Route>
      <Route path={'/'}>
        <MainPage />
      </Route>
    </Switch>
  )
}

export default App