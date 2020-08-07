import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import TodoElement from "./TodoElement";
import "./style/todo.css";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Todo = () => {
  const classes = useStyles();

  return (
    <div>
      <div>
        <h1> Todo (Work in progress)</h1>
      </div>
      <div className="todo">
        <TodoElement assignment="test" />
        <div className="saveBtn">
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
