import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import TodoElement from "./TodoElement";
import "../style/todo.css";

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
  const [checkedItems, setCheckedItems] = useState([]);
  const [addItemMode, setAddItemMode] = useState(false);
  const [update, setUpdate] = useState(false);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    getTodoList();
  }, []);

  const addItem = () => {
    if (newItem !== "") {
      todoItems.push(newItem);
      setAddItemMode(false);
      setNewItem("");
    }
  };

  const removeItem = (item) => {
    setTodoItems(
      todoItems.filter((e) => {
        return e !== item;
      })
    );
  };

  const updateList = (i, checked) => {
    checkedItems[i] = `${checked}`;
  };

  const formatList = () => {
    let finalList = "{ ";

    todoItems.forEach((item, i) => {
      finalList += `"${item}": "${checkedItems[i]}",`;
    });

    finalList = finalList.slice(0, -1);
    finalList += " }";

    return finalList;
  };

  const decodeList = (list) => {
    const parsedList = JSON.parse(list);

    for (let [item, checked] of Object.entries(parsedList)) {
      todoItems.push(item);
      checkedItems.push(checked);
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13 && addItemMode) {
      addItem();
    }
  };

  const saveSmashed = () => {
    const data = {
      username: localStorage.getItem("username"),
      todo: formatList(),
    };

    axios.post("/updatetodo", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const getTodoList = () => {
    const data = { username: localStorage.getItem("username") };

    axios
      .post("/gettodo", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data) {
          decodeList(res.data.todo);
          setUpdate(!update);
        }
      });
  };

  return (
    <div>
      <div>
        <h1> Todo List</h1>
      </div>
      <div className="todo">
        {todoItems.map((item, i) => (
          <TodoElement
            assignment={item}
            checked={checkedItems[i]}
            key={i}
            index={i}
            removeItem={removeItem}
            updateList={updateList}
          />
        ))}
        {addItemMode !== true ? (
          ""
        ) : (
          <input
            autoFocus
            onBlur={addItem}
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
              onClick={() => setAddItemMode(!addItemMode)}
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
              onClick={saveSmashed}
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
