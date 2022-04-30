import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getLoggedUser } from "../../Resources/functions";
import { Avatar } from "@mui/material";
import "./AdminTools.css";
import { Button } from "@mui/material";
// import { Button } from "bootstrap";
//
function UserList({ user }) {
  const navigate = useNavigate();
  const [userList, setUserList] = useState();
  const [filteredList, setFIlteredList] = useState();
  const [input, setInput] = useState();
  useEffect(async () => {
    const usersData = await axios.get("/files/users.json");
    const recieveData = usersData.data.map((item) => {
      delete item.password;
      delete item.email;
      return item;
    });
    setUserList(recieveData);
    setFIlteredList(recieveData);
  }, []);
  //
  const onInputChange = (e) => {
    console.log(e.target.value);
    setInput(e.target.value);
    setFIlteredList(
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
  const ban = async (user) => {
    // const temp = await axios.get("/files/users.json").then((res) => {
    //   const userIndex = res.data.findIndex(
    //     (val) => parseInt(user.userID) === val.userID
    //   );
    //   res.data[userIndex].ban = true;
    // });
    // console.log(temp);
    // //   .put("/files/users.json", res.data);
    const usersData = await axios.get("/files/users.json");
    const userIndex = usersData.data.findIndex(
      (val) => parseInt(user.userID) === parseInt(val.userID)
    );
    usersData.data[userIndex].ban = true;
    const temp = axios.put("/files/users.json", usersData.data);
  };
  //
  const unban = (user) => {
    const temp = axios.get("/files/users.json").then((res) => {
      const userIndex = res.data.findIndex(
        (val) => parseInt(user.userID) === val.userID
      );
      res.data[userIndex].ban = false;
    }).put;
  };
  //   };
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
                      {x.ban ? "Suspended" : null}
                    </div>
                  </div>
                </div>
                <div>
                  {x.ban ? (
                    <Button variant="contained" onClick={() => unban(x)}>
                      Unban
                    </Button>
                  ) : (
                    <Button variant="contained" onClick={() => ban(x)}>
                      Ban
                    </Button>
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
