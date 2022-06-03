import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { addViewsToThread, getAllThreads } from "../../Resources/functions";
import { useNavigate } from "react-router-dom";
import {
  ThreadUpdateContext,
  CommentsUpdateContext,
} from "../../Resources/Context-Providers/ThreadContextProvider";
import "./CSS-Files/SearchBar.css";
export default function SearchBar() {
  const [allThreads, setAllThreads] = useState();
  const [input, setInput] = useState();
  const [results, setResults] = useState();
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const commentsUpdate = useContext(CommentsUpdateContext);
  const threadUpdateContext = useContext(ThreadUpdateContext);
  useEffect(() => {
    setAllThreads(getAllThreads());
  }, []);
  //
  const handleChange = (e) => {
    setInput(e.target.value);
    let resultsTemp = [];
    resultsTemp = allThreads?.map((val) => {
      if (e.target.value === "") return null;
      else if (
        val?.threadName.toLowerCase().includes(e.target.value.toLowerCase())
      ) {
        resultsTemp.push(
          <li
            className="searchBarLI"
            key={val.threadID}
            onClick={() => handleClick(e, val)}
          >
            {val.threadName}, By {val.author}
          </li>
        );
      }
      setResults(resultsTemp);
    });
  };
  //
  const focusIn = () => {
    setFlag(true);
  };
  //
  const focusOut = () => {
    setTimeout(() => setFlag(false), 500);
  };
  //
  const handleClick = (e, val) => {
    e.target.value = "";
    setInput("");
    commentsUpdate(val.threadID);
    threadUpdateContext(val.threadID);
    addViewsToThread(val);
    return navigate(`/categories/${val.categoryID}/${val.threadID}`);
  };
  return (
    <div className="searchBar">
      <form onChange={handleChange}>
        <input
          style={{ width: "300px", borderRadius: "8px" }}
          type="text"
          placeholder="Look up a thread..."
          onBlur={focusOut}
          onFocus={focusIn}
        />
        <ul className="searchBarLIContainer">
          {input !== "" && flag ? results : null}
        </ul>
      </form>
    </div>
  );
}
