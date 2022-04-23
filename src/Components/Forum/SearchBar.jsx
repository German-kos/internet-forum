import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { addViewsToThread, getAllThreads } from "../../Resources/functions";
import { useNavigate } from "react-router-dom";
import {
  ThreadUpdateContext,
  CommentsUpdateContext,
} from "../../Resources/Context-Providers/ThreadContextProvider";
export default function SearchBar() {
  const [allThreads, setAllThreads] = useState();
  const [input, setInput] = useState();
  const [results, setResults] = useState();
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
          <li key={val.threadID} onClick={() => handleClick(e, val)}>
            {val.threadName}
          </li>
        );
      }
      setResults(resultsTemp);
    });
  };
  const handleClick = (e, val) => {
    e.target.value = "";
    setInput("");
    commentsUpdate(val.threadID);
    threadUpdateContext(val.threadID);
    addViewsToThread(val);
    return navigate(`/categories/${val.categoryID}/${val.threadID}`);
  };
  return (
    <>
      <form onChange={handleChange}>
        <input type="text" />
        <ul>{input !== "" ? results : null}</ul>
      </form>
    </>
  );
}
