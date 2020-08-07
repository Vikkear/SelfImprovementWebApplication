import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import TodoElement from "./TodoElement";
import "./style/todo.css";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const Todo = () => {
  const classes = useStyles();
  const [todoItems, setTodoItems] = useState([]);
  const [addItemMode, setAddItemMode] = useState(false);
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    setAddItemMode(!addItemMode);
  };

  const test = () => {
    console.log(newItem);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13 && addItemMode) {
      todoItems.push(newItem);
      setAddItemMode(false);
      setNewItem("");
    }
  };

  return (
    <div>
      <div>
        <h1> Todo List</h1>
      </div>
      <div className="todo">
        {todoItems.map((item) => (
          <TodoElement assignment={item} key={item} />
        ))}
        {addItemMode !== true ? (
          ""
        ) : (
          <input
            className="inputItem"
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e)}
          />
        )}
        <div className="btns">
          <div className="addBtn">
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              onClick={addItem}
            >
              Add Item
            </Button>
          </div>
          <div className="saveBtn">
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              onClick={test}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
