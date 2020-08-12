import React, { useState, useEffect } from "react";
import QuestElement from "./QuestElement";
import "../style/quests.css";
import axios from "axios";

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const Quests = () => {
  const [quests, setQuests] = useState([]);
  const [update, setUpdate] = useState(false);
  const [open, setOpen] = useState(false);

  // New quest
  const [newQuestTitle, setNewQuestTitle] = useState("");
  const [newQuestCategory, setNewQuestCategory] = useState("");
  const [newQuestGoal, setNewQuestGoal] = useState(0);
  const [newQuestFinishDate, setNewQuestFinishDate] = useState(new Date());

  useEffect(() => {
    getQuests();
  }, []);

  useEffect(() => {
    setUpdate(!update);
  }, [quests]);

  // Calls the backend and gets all quests encoded
  const getQuests = () => {
    axios
      .get("/getQuestsForUser", {
        params: { username: localStorage.getItem("username") },
      })
      .then((res) => {
        setQuests(res.data.data);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addQuest = () => {
    const data = {
      username: localStorage.getItem("username"),
      title: newQuestTitle,
      quest: JSON.stringify([
        {
          category: newQuestCategory,
          goal: newQuestGoal,
        },
      ]),
      start_date: new Date(),
      finish_date: newQuestFinishDate,
    };

    axios
      .post("/addQuest", data)
      .then((res) => {
        setOpen(false);
        setUpdate(!update);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1> Quests</h1>
      {quests
        ? quests.map((quest) => (
            <QuestElement
              title={quest.title}
              key={quest.title}
              quest={JSON.parse(quest.quest)}
              start_date={quest.start_date}
              finish_date={quest.finish_date}
            />
          ))
        : ""}
      <br />
      <div className="addIcon">
        <IconButton aria-label="add" onClick={() => handleClickOpen()}>
          <AddIcon />
        </IconButton>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Quest</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a new Quest to your quest log by filling in the following
            fields:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Quest Title"
            type="text"
            value={newQuestTitle}
            onChange={(e) => setNewQuestTitle(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="category"
            label="Category"
            type="text"
            value={newQuestCategory}
            onChange={(e) => setNewQuestCategory(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="goal"
            label="Goal"
            type="text"
            value={newQuestGoal}
            onChange={(e) => setNewQuestGoal(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            style={{ color: "red" }}
          >
            Close
          </Button>
          <Button onClick={addQuest} color="primary">
            Add Quest
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Quests;
