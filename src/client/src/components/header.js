import React, { useEffect, useState } from "react";
import "./style/header.css";

const Header = () => {
  const [updated, setUpdated] = useState(false);

  const logoutPressed = () => {
    console.log("hej");
    localStorage.removeItem("loggedin");
    setUpdated(!updated);
  };

  useEffect(() => {}, [updated]);

  return (
    <ul>
      <li>
        {localStorage.loggedin ? (
          <a onClick={logoutPressed}>Logout</a>
        ) : (
          <a href="login">Login</a>
        )}
      </li>
      <li>
        <a class="active" href="/">
          Home
        </a>
      </li>
      <li>
        <a href="tracker">Tracker</a>
      </li>
      <li>
        <a href="quests">Quests</a>
      </li>
    </ul>
  );
};

export default Header;
