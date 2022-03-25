import React from 'react';
import { Avatar } from '@mui/material';
import "../../App.css";

export default function Greeter({user}) {
  return (
      <div className='container'>
    <Avatar src={user === undefined ? "/files/pfp/default.jpg" : user.pfp} />
    <p>Welcome, {user === undefined ? "Guest." : `${user.fname} ${user.lname}.`} </p>
    </div>
  )
}
