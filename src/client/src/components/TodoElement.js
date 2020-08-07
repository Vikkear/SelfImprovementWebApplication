import React, { useEffect, useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import "./style/todo.css";

const TodoElement = (props) => {
  const assignment = useState("Placeholder");
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="wrapper">
      <Checkbox
        defaultChecked
        color="secondary"
        inputProps={{ "aria-label": "secondary checkbox" }}
      />
      {props.assignment}
    </div>
  );
};

export default TodoElement;