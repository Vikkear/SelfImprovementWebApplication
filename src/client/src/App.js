import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import login from "./components/login";
import Header from "./components/header";
import Tracker from "./components/Tracker";
import Quests from "./components/Quests";
import Todo from "./components/Todo";
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
          <Route exact path="/tracker" component={Tracker} />
          <Route exact path="/quests" component={Quests} />
          <Route exact path="/todo" component={Todo} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
