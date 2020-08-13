import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

const ViewEntryElement = (props) => {
  const userToken = localStorage.getItem("token");
  const submitEntry = () => {
    const data = {
      username: localStorage.getItem("username"),
      category: props.categoryName,
    };

    axios
      .post("/getAllTracksInCategory", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
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
