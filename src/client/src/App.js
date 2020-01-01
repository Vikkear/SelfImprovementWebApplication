import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import home from "./components/home";
import login from "./components/login";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path="/login" component={login} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
