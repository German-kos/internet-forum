import { React, useState } from "react";
import "./App.css";
import SiteRouter from "./Components/Site-Router/siter-router";

function App() {
  const [user, setUser] = useState(undefined);

  return (
    <div>
      <SiteRouter user={user} setUser={setUser}/>
    </div>
  )
}

export default App;