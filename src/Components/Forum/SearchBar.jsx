import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import { getAllThreads } from "../../Resources/functions";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
export default function SearchBar() {
  const [allThreads, setAllThreads] = useState();
  const [input, setInput] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    setAllThreads(getAllThreads());
  }, []);
  //
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleClick = (val) => {
    return navigate(`/categories/${val.categoryID}/${val.threadID}`);
    // , {
    // test: { categoryID: val.categoryID, threadID: val.threadID },
    // });
    // ,
    // window.location.reload(false)
  };
  return (
    <>
      <form onChange={handleChange}>
        <input type="text" />
        <ul>
          {allThreads?.map((val) => {
            if (input === "") return null;
            else if (
              val?.threadName.toLowerCase().includes(input?.toLowerCase())
            )
              return (
                <li key={val.threadID} onClick={() => handleClick(val)}>
                  {val.threadName}
                </li>
              );
          })}
        </ul>
      </form>
      <button onClick={() => console.log(input)}>click</button>
    </>
  );
}
