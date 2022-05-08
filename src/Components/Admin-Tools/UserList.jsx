import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getLoggedUser } from "../../Resources/functions";
import { Avatar } from "@mui/material";
import "./AdminTools.css";
import { Button } from "@mui/material";
// import { Button } from "bootstrap";
import BanUser from "./BanUser";
import UnbanUser from "./UnbanUser";
//
function UserList({ user }) {
  const navigate = useNavigate();
  const [userList, setUserList] = useState();
  const [filteredList, setFilteredList] = useState();
  const [banList, setBanList] = useState();
  const [input, setInput] = useState();
  useEffect(async () => {
    const usersData = await axios.get("/files/users.json");
    const recieveData = usersData.data.map((item) => {
      delete item.password;
      delete item.email;
      return item;
    });
    setUserList(recieveData);
    setFilteredList(recieveData);
    setBanList(JSON.parse(localStorage.getItem("banData")));
  }, []);
  //
  const triggerStateUpdate = async () => {
    const usersData = await axios.get("/files/users.json");
    const recieveData = usersData.data.map((item) => {
      delete item.password;
      delete item.email;
      return item;
    });
    setUserList(recieveData);
    setFilteredList(recieveData);
  };
  const onInputChange = (e) => {
    console.log(e.target.value);
    setInput(e.target.value);
    setFilteredList(
      userList.filter((x) => {
        if (e.target.value === "" || e.target.value === undefined) return x;
        else if (
          x.username.toLowerCase().includes(e.target.value.toLowerCase())
        )
          return x;
      })
    );
  };
  //
  const ban = (user) => {
    const userIndex = banList.findIndex(
      (u) => parseInt(u.userID) === parseInt(user.userID)
    );
    const tempBanList = banList;
    tempBanList[userIndex].ban = true;
    localStorage.setItem("banData", JSON.stringify(tempBanList));
    setBanList(tempBanList);
    triggerStateUpdate();
  };
  const unban = (user) => {
    const userIndex = banList.findIndex(
      (u) => parseInt(u.userID) === parseInt(user.userID)
    );
    const tempBanList = banList;
    tempBanList[userIndex].ban = false;
    localStorage.setItem("banData", JSON.stringify(tempBanList));
    setBanList(tempBanList);
    triggerStateUpdate();
  };
  //
  return (
    <>
      {getLoggedUser().admin ? null : navigate("/")}
      <div style={{ border: "3px solid black", padding: "3px 3px 3px 3px" }}>
        <input defaultValue={""} type="text" onChange={onInputChange} />
        <div>
          {filteredList?.map((x, i) => {
            return (
              <div key={i} className="userCard">
                <div className="userCardNameAvatar">
                  <Avatar src={x.pfp} />
                  <div className="userCardName">
                    {x.username}
                    <div className="suspended">
                      {banList?.find(
                        (u) => parseInt(u.userID) === parseInt(x.userID)
                      ).ban
                        ? "Suspended"
                        : null}
                    </div>
                  </div>
                </div>
                <div>
                  {banList?.find(
                    (u) => parseInt(u.userID) === parseInt(x.userID)
                  ).ban ? (
                    // <Button variant="contained" onClick={() => unban(x)}>
                    //   Unban
                    // </Button>
                    <UnbanUser
                      banList={banList}
                      setBanList={setBanList}
                      triggerStateUpdate={triggerStateUpdate}
                      user={x}
                    />
                  ) : (
                    // <Button variant="contained" onClick={() => ban(x)}>
                    //   Ban
                    // </Button>
                    <BanUser
                      banList={banList}
                      setBanList={setBanList}
                      triggerStateUpdate={triggerStateUpdate}
                      user={x}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default UserList;
