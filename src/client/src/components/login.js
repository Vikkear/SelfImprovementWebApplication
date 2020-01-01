import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginPressed = props => {
    const data = { username: username, password: password };

    axios
      .post("http://localhost:8000/login", data, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        if (res.data.username) {
          localStorage.loggedin = 1;
          // TODO: Fix so it works on an app
          window.location.replace("http://localhost:3000/");
        } else {
          console.log("knas");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="loginpage">
      <h1>Login</h1>
      <form>
        <label>Username: </label>
        <input type="text" onChange={e => setUsername(e.target.value)}></input>
        <br />
        <label>Password: </label>
        <input
          type="password"
          onChange={e => setPassword(e.target.value)}
        ></input>{" "}
        <br />
        <Button variant="primary" onClick={loginPressed}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
