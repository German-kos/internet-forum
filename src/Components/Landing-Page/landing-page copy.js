import { React, useState } from "react";
import PersistentDrawerLeft from "./Drawer";
import Button from "@mui/material/Button";
import SignIn from "../sign-in-page/sign-in";

function LandingPage({ user, setUser,users}) {

  return <PersistentDrawerLeft user={user} setUser={setUser} users={users} />;
}
export default LandingPage;
