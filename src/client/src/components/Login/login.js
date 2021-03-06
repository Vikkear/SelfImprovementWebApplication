import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import "../style/login.css";
import "../../App.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loginPressed = (props) => {
    const data = { username: username, password: password };

    axios
      .post("/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.token) {
          localStorage.token = res.data.token;
          localStorage.loggedin = 1;
          localStorage.username = res.data.username;
          window.location.replace("/");
        } else {
          setErrorMessage("Username or password is incorrect");
        }
      })
      .catch((err) => {
        setErrorMessage("Username or password is incorrect");
      });
  };

  const registerPressed = (props) => {
    const data = { username: username, password: password };

    axios
      .post("/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.username) {
          localStorage.loggedin = 1;
          localStorage.username = res.data.username;
          // TODO: Fix so it works on an app
          window.location.replace("/");
        } else {
          setErrorMessage("Username or password is incorrect");
        }
      })
      .catch((err) => {
        setErrorMessage("Username or password is incorrect");
      });
  };

  return (
    <div className="loginpage">
      <h1>Login</h1>
      <form>
        <div className="fields">
          <label>Username: </label> <br />
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <br />
          <label>Password: </label> <br />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>{" "}
        </div>
        <br /> <br />
        <Button className="button" variant="primary" onClick={loginPressed}>
          Login
        </Button>{" "}
        <br />
        <Button className="button" variant="primary" onClick={registerPressed}>
          Register
        </Button>
      </form>
      <div className="errormessage">{errorMessage}</div>
    </div>
  );
};

export default Login;
