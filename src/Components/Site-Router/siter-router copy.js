import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import LandingPage from "../Landing-Page/landing-page";
import SignIn from "../sign-in-page/sign-in";
import PublicProfileCard from "../Profile/PublicProfileCard";
import { Public } from "@mui/icons-material";
import PublicProfileOthers from "../Profile/PublicProfileOthers";
import { useEffect } from "react";
function SiteRouter({ user, setUser, users}) {

  
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<LandingPage user={user} setUser={setUser} users={users}/>}/>
          <Route path="/login" element={user === undefined ? <SignIn user={user} setUser={setUser}/> : <Navigate to="/"/>}/>
          <Route path={`/profile`} element={user === undefined ? <Navigate to="/login"/> : <PublicProfileCard user={user} setUser={setUser}/>}/>
          <Route path="/user" element={<Navigate to="/"/>}/>
          {/*profile paths*/}
          {/* {users.map((person, i) => {
            return(
            <Route key={i} path={`/${person.username}`} element={<PublicProfileOthers person={person}/>}/>

              )
            })} */}
            <Route path={`/user/:userID`} element={<PublicProfileOthers/>}/>

      </Routes>
    </BrowserRouter>
  );
}
export default SiteRouter;