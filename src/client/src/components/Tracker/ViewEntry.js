import React, { useEffect, useState } from "react";
import ViewEntryElement from "./ViewEntryElement";
import axios from "axios";

const ViewEntry = () => {
  const [updated, setUpdated] = useState(false);
  const [categoryArr, setCategoryArr] = useState([]);
  const [showCategory, setShowCategory] = useState("");
  const [showCategoryArr, setShowCategoryArr] = useState([]);

  useEffect(() => {
    axios
      .post("/getAllCategoriesForUser", {
        username: localStorage.getItem("username"),
      })
      .then((res) => {
        setCategoryArr(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [updated]);

  useEffect(() => {
    console.log(showCategoryArr);
  }, [showCategory, showCategoryArr]);

  return (
    <div>
      <h1>View</h1>
      {categoryArr
        ? categoryArr.map((category) => (
            <ViewEntryElement
              categoryName={category}
              showCategory={setShowCategory}
              showCategoryArr={setShowCategoryArr}
              key={category}
            />
          ))
        : ""}

      {showCategory ? <h1>{showCategory}</h1> : <p></p>}
      {showCategoryArr ? (
        showCategoryArr.map((category) => (
          <div>
            <p>
              {"Date: "}
              {new Date(category.dateSubmitted).toLocaleDateString("sv")}
              {" Amount: "}
              {category.amount}
            </p>
          </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default ViewEntry;
