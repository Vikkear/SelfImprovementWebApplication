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

  return (
    <div className="home">
      <h1>Dashboard </h1>
      <div className="navigationBtn" onClick={tracker}>
        Tracker <br /> Tracks all of your entries
      </div>
      <div className="navigationBtn" onClick={quests}>
        Quests (WIP) <br /> Add/Show Quests
      </div>
      <div className="navigationBtn" onClick={todo}>
        Todo <br /> Todo list
      </div>
    </div>
  );
};

export default Home;
