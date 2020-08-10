import React from "react";
import "./style/home.css";

const Home = () => {
  const tracker = () => {
    window.location.replace("/tracker");
  };

  const quests = () => {
    window.location.replace("/quests");
  };

  const todo = () => {
    window.location.replace("/todo");
  };

  const login = () => {
    window.location.replace("/login");
  };

  const isLoggedIn = localStorage.getItem("username") ? true : false;

  return (
    <div className="home">
      {isLoggedIn ? (
        <div className="loggedIn">
          <h1>{localStorage.getItem("username")}'s Dashboard </h1>

          <div className="navigationBtn" onClick={tracker}>
            Tracker <br /> Tracks all of your entries
          </div>
          <div className="navigationBtn" onClick={quests}>
            Quests
            <br /> Add/Show Quests
          </div>
          <div className="navigationBtn" onClick={todo}>
            Todo <br /> Todo list
          </div>
        </div>
      ) : (
        <div className="notLoggedIn">
          <h1>Welcome!</h1>
          <div className="navigationBtn" onClick={login}>
            Login <br />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
