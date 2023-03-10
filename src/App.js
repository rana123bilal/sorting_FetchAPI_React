import "./styles.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { sortBy } from "lodash";

export default function App() {
  const [listData, setListData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("React");
  const [sort, setSort] = useState("NONE");

  const fetchedData = async () => {
    const data = await axios.get(
      `https://hn.algolia.com/api/v1/search?query=${searchTerm}`
    );
    setListData(data.data.hits);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const SORT = {
    NONE: (list) => list,
    TITLE: (list) => sortBy(list, "title"),
    AUTHOR: (list) => sortBy(list, "author"),
    COMMENTS: (list) => sortBy(list, "comments")
  };

  const handleClick = (event) => {
    event.preventDefault();
    fetchedData();
  };

  const filteredHandleClick = (sortKey) => {
    setSort(sortKey);
  };

  const sortFunction = SORT[sort];
  const sortedList = sortFunction(listData);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <input type="text" onChange={handleChange} />
      <button onClick={handleClick}>Submit</button>
      <br />
      <button onClick={() => filteredHandleClick("TITLE")}>Title</button>
      <button onClick={() => filteredHandleClick("AUTHOR")}>Author</button>
      <button onClick={() => filteredHandleClick("COMMENTS")}>
        Num Comments
      </button>

      {sortedList &&
        sortedList.map((item, id) => {
          return (
            <div key={id}>
              <span>{item.title}</span> - <span>{item.author}</span> -{" "}
              <span>{item.num_comments}</span>
            </div>
          );
        })}
    </div>
  );
}
