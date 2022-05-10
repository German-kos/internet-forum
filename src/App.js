import { React, useState, useEffect } from "react";
import axios, { Axios } from "axios";
import "./App.css";
import SiteRouter from "./Components/Site-Router/SiteRouter";
import Layout from "./Components/Landing-Page/Layout.jsx";
import { getLoggedUser, isBanned } from "./Resources/functions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setBanData } from "./Resources/functions";
import {
  categories,
  mockThreads,
  mockComments,
  mockPms,
} from "./Resources/data";
//
function App() {
  const [user, setUser] = useState();
  const [users, setUsers] = useState([]);
  const checkForUser = () => {
    if (JSON.parse(localStorage.getItem("currUser") !== null))
      setUser(JSON.parse(localStorage.getItem("currUser")));
    else setUser(undefined);
  };
  useEffect(async () => {
    if (
      localStorage.getItem("forums") === null ||
      localStorage.getItem("forums") === undefined
    ) {
      localStorage.setItem("forums", JSON.stringify(categories));
    }
    if (
      localStorage.getItem("threads") === null ||
      localStorage.getItem("threads") === undefined
    ) {
      localStorage.setItem("threads", JSON.stringify(mockThreads));
    }
    if (
      localStorage.getItem("comments") === null ||
      localStorage.getItem("comments") === undefined
    ) {
      localStorage.setItem("comments", JSON.stringify(mockComments));
    }
    if (
      localStorage.getItem("pms") === null ||
      localStorage.getItem("pms") === undefined
    ) {
      localStorage.setItem("pms", JSON.stringify(mockPms));
    }
    const usersData = await axios.get("/files/users.json");
    const recieveData = usersData.data.map((item) => {
      delete item.password;
      delete item.email;
      return item;
    });
    checkForUser();
    //
    setUsers(recieveData);
    localStorage.setItem("usersList", JSON.stringify(recieveData));
    setBanData();
    //
    //
  }, []);
  useEffect(async () => {
    // const tempLoggedUser = getLoggedUser()
    const tempUser = await axios
      .get("/files/users.json")
      .then((res) =>
        res.data.find(
          (x) => x.username.toLowerCase() === user?.username.toLowerCase()
        )
      );
    if (tempUser !== undefined && isBanned(tempUser?.userID)) {
      localStorage.removeItem("currUser");
      setUser(undefined);
    }
  }, [user]);

  return (
    <div className="appBackground">
      <SiteRouter user={user} setUser={setUser} users={users} />
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        limit={1}
      />
    </div>
  );
}

export default App;
