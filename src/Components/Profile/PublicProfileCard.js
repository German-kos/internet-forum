import { React, useEffect, useState } from "react";
import PersistentDrawerLeft from "../Landing-Page/Layout";

function PublicProfileCard({ user, setUser }) {
  useEffect(() => {
    console.log("from profile");
    console.log(user);
  });

  return (
    <div>
      <div>profile</div>
    </div>
  );
}
export default PublicProfileCard;
