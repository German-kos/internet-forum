import {React, useState} from "react";
import PersistentDrawerLeft from "./drawer";
import Button from '@mui/material/Button';
import SignIn from "../sign-in-page/sign-in";

function LandingPage({ user,setUser }) {
    return(
        <PersistentDrawerLeft user={user} setUser={setUser}/>
    )
}
export default LandingPage;