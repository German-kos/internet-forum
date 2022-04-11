import { Routes, Route, Link, BrowserRouter, Navigate } from "react-router-dom";
import SignIn from "../sign-in-page/sign-in";
import PublicProfileCard from "../Profile/PublicProfileCard";
import PublicProfileOthers from "../Profile/PublicProfileOthers";
import Home from "../Landing-Page/Home.jsx";
import Layout from "../Landing-Page/Layout";
import Forums from "../Forum/Forums";
import ThreadsList from "../Forum/ThreadsList";
import Threads from "../Forum/Threads";
import Loading from "../Loading";
import LayoutTest from "../Landing-Page/Layout-test";
import { useEffect, useState } from "react";
import { getLoggedUser } from "../../Resources/functions";

function SiteRouter({ user, setUser, users }) {
  const [currUser, setCurrUser] = useState();
  useEffect(() => {
    setCurrUser(getLoggedUser());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={<LayoutTest user={user} setUser={setUser} users={users} />}
        >
          <Route index element={<Forums />} />
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
              currUser === null ? (
                <Navigate to="/login" />
              ) : (
                <PublicProfileCard user={user} setUser={setUser} />
              )
            }
          />
          <Route
            path="/test"
            element={
              currUser === null ? (
                <Navigate to="login" />
              ) : (
                <PublicProfileCard user={user} />
              )
            }
          />
          <Route path="/user" element={<Navigate to="/" />} />
          <Route path={`/user/:userID`} element={<PublicProfileOthers />} />
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
