import { Routes, Route, Link, BrowserRouter, Navigate } from "react-router-dom";
import SignIn from "../sign-in-page/sign-in";
// import PublicProfileCard from "../Profile/PublicProfileCard";
import PersonalProfileCard from "../Profile/PersonalProfileCard";
import Layout from "../Landing-Page/Layout";
import Forums from "../Forum/Forums";
import ThreadsList from "../Forum/ThreadsList";
import Threads from "../Forum/Threads";
import Loading from "../../Resources/Loading";
import UserList from "../Admin-Tools/UserList";
import { getLoggedUser } from "../../Resources/functions";
import PageNotFound from "./PageNotFound";
import PublicProfileCard from "../Profile/PublicProfileCard";
import Messages from "../Private-Messages/Messages";
// import LayoutTest from "../Landing-Page/Layout";

function SiteRouter({ user, setUser, users }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout user={user} setUser={setUser} users={users} />}>
          <Route index element={<Forums user={user} />} />
          <Route
            path="/categories/:categoryID"
            element={<ThreadsList user={user} />}
          />
          <Route
            path="/categories/:categoryID/:threadID"
            element={<Threads user={user} />}
          />
          <Route
            path="/profile"
            element={
              user === null ? (
                <Navigate to="/login" />
              ) : (
                <PersonalProfileCard user={user} />
              )
            }
          />
          {/* <Route path="/aaa" element={<UserList />} /> */}
          <Route path="/user" element={<Navigate to="/" />} />
          <Route
            path={`/user/:userID`}
            element={<PublicProfileCard loggedUser={user} />}
          />
          <Route
            path="/pms"
            element={
              user !== null ? (
                <Messages user={user} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/userslist"
            element={
              user?.admin ? <UserList user={user} /> : <Navigate to="/" />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route
          path="/login"
          element={
            user === undefined ? (
              <SignIn user={user} setUser={setUser} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default SiteRouter;
