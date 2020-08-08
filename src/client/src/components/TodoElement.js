import React, { useState, useEffect } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import IconButton from "@material-ui/core/IconButton";
import "./style/todo.css";

const TodoElement = (props) => {
  const assignment = useState("");
  const [checked, setChecked] = useState(props.checked === "true");

  useEffect(() => {
    props.updateList(props.index, checked);
  }, [checked]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="wrapper">
      <div className="check">
        <Checkbox
          checked={checked}
          onChange={handleChange}
          color="secondary"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
      </div>
      <div className="check">{props.assignment}</div>

      <div className="iconButton">
        <IconButton
          aria-label="delete"
          onClick={() => props.removeItem(props.assignment)}
        >
          <DeleteOutlineIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default TodoElement;
