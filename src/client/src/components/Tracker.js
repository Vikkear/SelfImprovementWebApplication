import React, { useState } from "react";
import { Button } from "react-bootstrap";
import AddEntry from "./AddEntry";
import ViewEntry from "./ViewEntry";

const Tracker = () => {
  const [mode, setMode] = useState(1);

  const addEntry = () => {
    setMode(1);
  };

  const viewEntries = () => {
    setMode(0);
  };

  return (
    <div>
      <h1> Tracker </h1>
      <Button variant="primary" onClick={addEntry}>
        Add entry
      </Button>{" "}
      <br />
      <Button variant="primary" onClick={viewEntries}>
        View Entries
      </Button>
      {mode === 1 ? (
        <div>
          <AddEntry />
        </div>
      ) : (
        <div>
          <ViewEntry />
        </div>
      )}
    </div>
  );
};

export default Tracker;
