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
      .get("http://localhost:8000/categories")
      .then(res => {
        setCategoryArr(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [updated]);

  useEffect(() => {
    console.log(showCategoryArr);
  }, [showCategory, showCategoryArr]);

  return (
    <div>
      <h1>View</h1>
      {categoryArr.map(category => (
        <ViewEntryElement
          categoryName={category.category}
          showCategory={setShowCategory}
          showCategoryArr={setShowCategoryArr}
        />
      ))}

      {showCategory ? <h1>{showCategory}</h1> : <p></p>}
      {showCategoryArr ? (
        showCategoryArr.map(category => <p>{category.category}</p>)
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default ViewEntry;
