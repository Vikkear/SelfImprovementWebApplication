import React, { useState, useEffect } from "react";
import "../style/quests.css";
import axios from "axios";

const Quests = () => {
  const [quests, setQuests] = useState([]);
  const [questTitles, setQuestTitles] = useState([]);
  const [currentProgress, setCurrentProgress] = useState([]);
  const [questGoals, setQuestGoals] = useState([]);

  useEffect(() => {}, []);

  // Calls the backend and gets all quests encoded
  const getQuests = () => {};

  // Function that is called after fetching the quests from the database
  const decodeQuests = () => {};

  // Function that is called before adding to database
  const encodeQuest = () => {};

  return (
    <div>
      <h1> Quests</h1>
    </div>
  );
};

export default Quests;
