import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import "./style/tracker.css";

const AddEntry = () => {
  const [category, setCategory] = useState("");
  const [value, setValue] = useState(0);

  const submitEntry = () => {
    const data = {
      username: localStorage.username,
      category: category,
      value: value,
    };

    axios
      .post("/addEntry", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setCategory("");
        setValue(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Add</h1>
      <form>
        <div className="standardInput">
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />{" "}
          <br />
          <input
            type="text"
            placeholder="Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />{" "}
        </div>

        <br />
        <Button variant="primary" onClick={submitEntry}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddEntry;
