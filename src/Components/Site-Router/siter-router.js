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

function SiteRouter({ user, setUser }) {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<LandingPage user={user} setUser={setUser}/>}/>
          <Route path="/login" element={user === undefined ? <SignIn user={user} setUser={setUser}/> : <Navigate to="/"/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default SiteRouter;