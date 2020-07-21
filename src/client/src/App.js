import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import home from "./components/home";
import login from "./components/login";
import Header from "./components/header";
import Tracker from "./components/Tracker";
import Quests from "./components/Quests";
import "./App.css";
import "./components/style/bootstrap-grid.css";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path="/login" component={login} />
          <Route exact path="/tracker" component={Tracker} />
          <Route exact path="/quests" component={Quests} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;