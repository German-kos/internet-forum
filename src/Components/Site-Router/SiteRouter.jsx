import { Routes, Route, Link, BrowserRouter, Navigate } from "react-router-dom";
import SignIn from "../sign-in-page/sign-in";
import PublicProfileCard from "../Profile/PublicProfileCard";
import PublicProfileOthers from "../Profile/PublicProfileOthers";
import Home from "../Landing-Page/Home.jsx";
import Layout from "../Landing-Page/Layout";
import Forums from "../Forum/Forums";
import ThreadsList from "../Forum/ThreadsList";

function SiteRouter({ user, setUser, users }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout user={user} setUser={setUser} users={users} />}>
          <Route index element={<Forums />} />
          <Route path="/categories/:categoryID" element={<ThreadsList />} />
          <Route
            path="/profile"
            element={
              localStorage.getItem("currUser") === null ? (
                <Navigate to="/login" />
              ) : (
                <PublicProfileCard user={user} setUser={setUser} />
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
