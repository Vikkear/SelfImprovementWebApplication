import React from "react";

import QuestElement from "../components/Quests/QuestElement";

export default {
  title: "Quests",
  component: QuestElement,
};

const mockedCategories = ["Test1", "Test2"];
const mockedGoals = ["10", "15"];
const mockedScores = ["10", "14"];

export const questElement = () => (
  <QuestElement
    title="Quest #1"
    categories={mockedCategories}
    goals={mockedGoals}
    currentScore={mockedScores}
  />
);
