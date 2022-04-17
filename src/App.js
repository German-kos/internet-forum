import { React, useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import SiteRouter from "./Components/Site-Router/SiteRouter";
import Layout from "./Components/Landing-Page/Layout.jsx";

function App() {
  const [user, setUser] = useState();
  const [users, setUsers] = useState([]);
  const checkForUser = () => {
    if (JSON.parse(localStorage.getItem("currUser") !== null))
      setUser(JSON.parse(localStorage.getItem("currUser")));
    else setUser(undefined);
  };
  useEffect(async () => {
    const usersData = await axios.get("/files/users.json");
    const recieveData = usersData.data.map((item) => {
      delete item.password;
      delete item.email;
      return item;
    });
    checkForUser();
    //
    // console.log(recieveData);
    setUsers(recieveData);
    // if(localStorage.getItem("users") === null)
    localStorage.setItem("usersList", JSON.stringify(recieveData));
  }, []);
  return (
    <div>
      <SiteRouter user={user} setUser={setUser} users={users} />
    </div>
  );
}

export default App;
