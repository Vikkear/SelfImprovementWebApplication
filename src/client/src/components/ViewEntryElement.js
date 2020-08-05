import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

const ViewEntryElement = (props) => {
  const submitEntry = () => {
    const data = {
      username: localStorage.getItem("username"),
      category: props.categoryName,
    };

    axios
      .post("/tracker", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        props.showCategoryArr(res.data.tracker);
        props.showCategory(props.categoryName);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Button variant="primary" onClick={submitEntry}>
        {props.categoryName}
      </Button>
    </div>
  );
};

export default ViewEntryElement;
