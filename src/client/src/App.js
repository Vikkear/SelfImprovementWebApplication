import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import login from "./components/Login/login";
import Header from "./components/header";
import Tracker from "./components/Tracker/Tracker";
import Quests from "./components/Quests/Quests";
import Todo from "./components/Todo/Todo";
import PrivateRoute from "./PrivateRoute";
import "./App.css";
import "./components/style/bootstrap-grid.css";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={login} />
          <PrivateRoute exact path="/tracker" component={Tracker} />
          <PrivateRoute exact path="/quests" component={Quests} />
          <PrivateRoute exact path="/todo" component={Todo} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
