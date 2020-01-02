import React from "react";
import "./style/home.css";

const home = () => {
  const tracker = () => {
    window.location.replace("http://localhost:3000/tracker");
  };

  const quests = () => {
    window.location.replace("http://localhost:3000/quests");
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
    </div>
  );
};

export default home;
