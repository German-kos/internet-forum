import { React, useState, useEffect } from "react";
import axios, { Axios } from "axios";
import "./App.css";
import SiteRouter from "./Components/Site-Router/SiteRouter";
import Layout from "./Components/Landing-Page/Layout.jsx";
import { getLoggedUser, isBanned } from "./Resources/functions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setBanData } from "./Resources/functions";
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
    const usersData = await axios.get("/files/users.json");
    const recieveData = usersData.data.map((item) => {
      delete item.password;
      delete item.email;
      return item;
    });
    checkForUser();
    //
    setUsers(recieveData);
    // if(localStorage.getItem("users") === null)
    localStorage.setItem("usersList", JSON.stringify(recieveData));
    setBanData();
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
