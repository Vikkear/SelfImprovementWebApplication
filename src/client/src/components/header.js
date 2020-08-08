import React, { useEffect, useState } from "react";
import "./style/header.css";

const Header = () => {
  const [updated, setUpdated] = useState(false);

  const logoutPressed = () => {
    localStorage.removeItem("loggedin");
    localStorage.removeItem("username");
    setUpdated(!updated);
    window.location.replace("/");
  };

  useEffect(() => {}, [updated]);

  return (
    <ul>
      {localStorage.loggedin ? (
        <div>
          <li>
            <a onClick={logoutPressed}>Logout</a>
          </li>
          <li>
            <a href="tracker">Tracker</a>
          </li>
          <li>
            <a href="quests">Quests</a>
          </li>
          <li>
            <a href="todo">Todo</a>
          </li>
        </div>
      ) : (
        <li>
          <a href="login">Login</a>
        </li>
      )}

      <li>
        <a className="active" href="/">
          Home
        </a>
      </li>
    </ul>
  );
};

export default Header;
