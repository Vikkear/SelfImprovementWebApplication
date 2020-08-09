import React, { useState, useEffect } from "react";
import "../style/quests.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const QuestElement = (props) => {
  const [categories, setCategories] = useState([]);
  const [goals, setGoals] = useState([]);
  const [open, setOpen] = useState(false);
  const [questFinished, setQuestFinished] = useState(false);
  const [currentScore, setCurrentScore] = useState([]);

  const openQuest = () => {
    if (!questFinished) setQuestFinished(questCheck());

    setOpen(true);
  };

  useEffect(() => {
    setCategories(props.categories);
    setGoals(props.goals);
    setCurrentScore(props.currentScore);
  }, []);

  const questCheck = () => {
    let isFinished = true;

    for (let i = 0; i < categories.length; i++) {
      if (currentScore[i] < goals[i]) {
        isFinished = false;
      }
    }

    console.log(isFinished);

    return isFinished;
  };

  const abandonQuest = () => {
    // Todo: Call for backend to remove quest
    setOpen(false);
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
      <div>
        <Dialog
          open={open}
          onClose={closeQuest}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {!questFinished ? (
              <div>
                <Button
                  onClick={abandonQuest}
                  color="primary"
                  style={{ color: "red" }}
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
                  style={{ color: "green" }}
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
