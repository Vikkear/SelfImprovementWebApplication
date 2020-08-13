import React, { useState, useEffect } from "react";
import "../style/quests.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";

const QuestElement = (props) => {
  const [categories, setCategories] = useState([]);
  const [goals, setGoals] = useState([]);
  const [currentScore, setCurrentScore] = useState([]);
  const [open, setOpen] = useState(false);
  const [questFinished, setQuestFinished] = useState(false);
  const [update, setUpdate] = useState(false);
  const [quest, setQuest] = useState([]);
  const userToken = localStorage.getItem("token");

  const openQuest = () => {
    if (!questFinished) setQuestFinished(questCheck());
    setOpen(true);
  };

  useEffect(() => {
    setQuest(props.quest);
    setUpdate(!update);
  }, []);

  useEffect(() => {
    decodeQuest();
  }, [quest]);

  useEffect(() => {
    getScores();
  }, [categories]);

  const questCheck = () => {
    let isFinished = true;

    for (let i = 0; i < categories.length; i++) {
      if (currentScore[i] < goals[i]) {
        isFinished = false;
      }
    }

    return isFinished;
  };

  const decodeQuest = () => {
    let tempCategories = [];
    let tempGoals = [];
    let tempCurrentScore = [];

    quest.forEach((goal) => {
      tempCategories.push(goal.category);
      tempGoals.push(goal.goal);
      tempCurrentScore.push(0);
    });

    setCategories(tempCategories);
    setGoals(tempGoals);
    setCurrentScore(tempCurrentScore);
  };

  const getScores = () => {
    let tempCurrentScore = [];

    categories.forEach((category) => {
      const data = {
        username: localStorage.getItem("username"),
        category: category,
        dateSubmitted: props.start_date,
      };

      axios
        .post("/getAmountOfTracksAfterDate", data, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((res) => {
          tempCurrentScore.push(res.data.amount);
        })
        .catch((err) => console.log(err));
    });

    setCurrentScore(tempCurrentScore);
  };

  const abandonQuest = () => {
    const data = {
      username: localStorage.getItem("username"),
      title: props.title,
    };

    axios
      .delete(
        "/removeQuest",
        { data: data },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then(() => {
        setOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const finishQuest = () => {
    // Todo: Call for backend to finish quest
    setOpen(false);
  };

  const closeQuest = () => {
    setOpen(false);
  };

  return (
    <div className="quest">
      <div className="title" onClick={openQuest}>
        {props.title}
      </div>
      <div className="popup">
        <Dialog
          open={open}
          onClose={closeQuest}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={"sm"}
          fullWidth={true}
        >
          <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
            {props.title}
          </DialogTitle>
          <DialogContent>
            {goals
              ? goals.map((goal, i) => (
                  <div key={i}>
                    <DialogContentText
                      id="alert-dialog-description"
                      key={i}
                      style={
                        currentScore[i] >= goal
                          ? { color: "green" }
                          : { color: "black" }
                      }
                    >
                      {`${categories[i]}: ${currentScore[i]}/${goal}`}
                    </DialogContentText>
                  </div>
                ))
              : ""}
          </DialogContent>
          <DialogActions>
            {!questFinished ? (
              <div>
                <Button
                  onClick={abandonQuest}
                  color="primary"
                  style={{ color: "red", float: "right" }}
                >
                  Abandon
                </Button>
                <Button onClick={closeQuest} color="primary" autoFocus>
                  Close
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  onClick={finishQuest}
                  color="primary"
                  style={{ color: "green", float: "right" }}
                >
                  Turn in quest
                </Button>
              </div>
            )}
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default QuestElement;
